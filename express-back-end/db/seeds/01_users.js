/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      name: 'Chikorita',
      email: 'chikorita@pokemon.com',
      password: 'password',
      avatar: 'https://archives.bulbagarden.net/media/upload/thumb/b/bf/152Chikorita.png/250px-152Chikorita.png',
      quote: 'Beleaf in yourself!'  
    },
    {
      id: 2,
      name: 'Bulbasaur',
      email: 'bulbasaur@pokemon.com',
      password: 'password',
      avatar: 'https://archives.bulbagarden.net/media/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png',
      quote: 'Weeds are flowers too, once you get to know them.'  
    },
    {
      id: 3,
      name: 'Bellossom',
      email: 'bellossom@@pokemon.com',
      password: 'password',
      avatar: 'https://archives.bulbagarden.net/media/upload/thumb/c/cd/182Bellossom.png/250px-182Bellossom.png',
      quote: 'By plucking her petals, you do not gather the beauty of the flower.'  
    },
  ]);
};

