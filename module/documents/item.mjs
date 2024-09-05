/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class ZoraItem extends Item {
  
  chatTemplate = {
	  "ability": "systems/zora_1_1/templates/chat/chat-ability.hbs"
  };
  
  
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
	
	const  itemData = this;
	const  data = itemData.system;
	let itemCount = 0;
	
	/**Replicate description rich text description for tooltips*/
	const  richtext = String(data.description.richtext);
	data.description.plaintext = richtext.replace(/<[^>]*>/g, '');
	
	if (itemData.type === "fon") {
		/**Replicate power rich text description for tooltips*/
		const  prichtext = String(data.powers.richtext);
		data.powers.plaintext = prichtext.replace(/<[^>]*>/g, '');
		
		if (this.actor) {
			const actorData = this.actor;
			const aData = actorData.system;
			const nature = String(this.name);
			
			actorData.items.forEach(item =>{
				if (item.type === "fon") {
					itemCount++;
				};
			});
			
			if (itemCount = 1) {
				aData.attributes.nature = nature.toLowerCase();
			};
		};
	};
	
	if (itemData.type === 'equipment' || itemData.type === 'ability') {
		if (this.actor) {
			if (data.secondarystat.value !== "" && data.primarystat.value !== "") {
				/**Assign combined actor stats to item.*/
				const actorData = this.actor;
				const aData = actorData.system;
				const prefMod = String(data.primarystat.value);
				const pmodCall = "aData.abilities."+prefMod+".value";
				const pmodCallValue = eval(pmodCall);
				const secMod = String(data.secondarystat.value);
				const smodCall = "aData.abilities."+secMod+".value";
				const smodCallValue = eval(smodCall);
				const modCallCombined = smodCallValue+pmodCallValue
				/**data.rollmod = Number(aData.abilities.train.value);*/
				data.rollmod = modCallCombined;
			} else if (data.secondarystat.value === "" && data.primarystat.value !== "") {
				/**Assign actor stats to item.*/
				const actorData = this.actor;
				const aData = actorData.system;
				const prefMod = String(data.primarystat.value);
				const modCall = "aData.abilities."+prefMod+".value";
				const modCallValue = eval(modCall);
				/**data.rollmod = Number(aData.abilities.train.value);*/
				data.rollmod = modCallValue;
			} else {
				data.rollmod = ""
			};
			
			if (itemData.type === 'ability') {
				if (data.dice.value !== "" && data.dice.value !== "0" && data.primarystat.value === "") {
					const actorData = this.actor;
					const aData = actorData.system;
					data.dice.output = data.dice.value+"d8";
					data.formula = data.dice.output;
				} else if (data.dice.value !== '' && data.dice.value.includes('@attributes.level')) {
					const actorData = this.actor;
					const aData = actorData.system;
					const levelCall = "aData.attributes.level.value";
					const levelValue = eval(levelCall);
					data.dice.output = eval(data.dice.value.replace("@attributes.level",levelValue))+"d8";
					data.formula = data.dice.output+"+"+data.rollmod;
				} else if ((data.dice.value === "" || data.dice.value === "0") && data.primarystat.value === "") {
					data.formula = ""
				} else if ((data.dice.value === "" || data.dice.value === "0") && data.primarystat.value !== "") {
					data.formula = "+"+data.rollmod
				} else if (data.dice.value !== '' && !data.dice.value.includes('@attributes.level')) {
					const actorData = this.actor;
					const aData = actorData.system;
					data.dice.output = data.dice.value+"d8";
					data.formula = data.dice.output+"+"+data.rollmod;
				}
			};
			
			/* if (itemData.type === 'ability') {
				const nature = data.nature.toString;
				const natureCharCount = nature.length;
				const natureCalc = natureCharCount-1;
				/* const natureCapital = nature.substring(0,1); */
				/* const natureRest = nature.substring(1); */
				/* data.natureselect = nature; */
			/* }; */
		};
		
		/**const type = data.type.value;
		const typeref = "CONFIG.ZORA.equipTypeDropdownChoices."+type
			plaintext = game.i18n.localize(CONFIG.ZORA.equipTypeDropdownChoices.k);
		
		system.typeText = plaintext;*/
	};
  }

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Starts off by populating the roll data with `this.system`
    const rollData = { ...super.getRollData() };

    // Quit early if there's no parent actor
    if (!this.actor) return rollData;

    // If present, add the actor's roll data
    rollData.actor = this.actor.getRollData();

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      const templateData = {
      actor: this.actor,
      item: this,
	  effects: this.effects,
      labels: this.labels,
	  };
	  
	  const html = await renderTemplate("systems/zora_1_1/templates/chat/chat-ability.hbs", templateData);
	  ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: html,
        content: ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();
	  const templateData = {
      actor: this.actor,
      item: this,
	  effects: this.effects,
      labels: this.labels,
	  };
	  
	  const html = await renderTemplate("systems/zora_1_1/templates/chat/chat-ability.hbs", templateData);

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      //const result = await roll.evaluate();
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: html,
		content: ''
      });
      return roll;
    }
  }
}
