/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/zora_1_1/templates/actor/parts/actor-equipment.hbs',
    'systems/zora_1_1/templates/actor/parts/actor-fons.hbs',
    'systems/zora_1_1/templates/actor/parts/actor-abilities.hbs',
    'systems/zora_1_1/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/zora_1_1/templates/item/parts/item-effects.hbs',
	//Chat partials
	'systems/zora_1_1/templates/chat/chat-ability.hbs'
  ]);
};
