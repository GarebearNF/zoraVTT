export const ZORA = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
ZORA.abilities = {
  educ: 'ZORA.Ability.Educ.long',
  prof: 'ZORA.Ability.Prof.long',
  train: 'ZORA.Ability.Train.long',
  vita: 'ZORA.Ability.Vita.long',
};

ZORA.abilityAbbreviations = {
  educ: 'ZORA.Ability.Educ.abbr',
  prof: 'ZORA.Ability.Prof.abbr',
  train: 'ZORA.Ability.Train.abbr',
  vita: 'ZORA.Ability.Vita.abbr',
};

ZORA.equipTypeDropdownChoices = {
    "melee": "ZORA.Item.Type.Melee",
    "ranged": "ZORA.Item.Type.Ranged",
    "thrown": "ZORA.Item.Type.Thrown",
};

ZORA.natureDropdownChoices = {
	"air": "ZORA.Item.Nature.Air",
	"darkness": "ZORA.Item.Nature.Darkness",
	"earth": "ZORA.Item.Nature.Earth",
	"fire": "ZORA.Item.Nature.Fire",
	"ice": "ZORA.Item.Nature.Ice",
	"light": "ZORA.Item.Nature.Light",
	"lightning": "ZORA.Item.Nature.Lightning",
	"water": "ZORA.Item.Nature.Water",
};

ZORA.pathDropdownChoices = {
	"heal": "ZORA.Item.Path.Heal",
	"sabotage": "ZORA.Item.Path.Sabotage",
	"stealth": "ZORA.Item.Path.Stealth",
	"support": "ZORA.Item.Path.Support",
	"tank": "ZORA.Item.Path.Tank"
}