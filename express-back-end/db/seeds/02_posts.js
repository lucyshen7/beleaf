/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
    user_id: 1,
    title: 'Have you botany plants? I did!',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54Me9UT0gQ_Zz_L7N7cHsuDe-TAviFxT0fBwTY95vQNtyedhyffl56FSI-H2mWP9bOro&usqp=CAU',
    description: `Hey guys! I've got a new baby plant. it's very tiny and cute I need a name suggestion, please.`,
    topic: 'general'
  },
    {
    user_id: 2,
    title: 'Oh no, how to save my orchid?',
    photo: 'https://www.mumsnet.com/uploads/talk/202003/large-33815-image1',
    description: `Long thyme no see..! Well, I probably got too excited about watering and didn't follow the reminders. My princess orchic doesn't seem to look happy anymore. Is there any hope?`,
    topic: 'question'
  },
    {
    user_id: 3,
    title: 'Keep our soilmates healthy!',
    photo: 'https://media.30seconds.com/tip/lg/How-to-Make-Banana-Peel-Fertilizer-at-Home-for-Your-Garden-19535-b837f9356e-1594843697.jpg',
    description: `Banana fertilizer hack. Cut up about five banana peels. Put them in a pot with about 4 cups of water and simmer for 15 minutes. Strain the liquid, add 8 more cups of water. Let it cool and you can water your plants with it!`,
    topic: 'plant hack'
  },
    {
    user_id: 3,
    title: 'Look at this beauty! Yay or Nay?',
    photo: 'https://static.standard.co.uk/2021/07/23/18/newFile.jpg?width=1200',
    description: `Ok, bloomers! I've been wanting to get this one for a very long time, but was not sure if I know how to take care of it. What do you guys think?`,
    topic: 'question'
  },
    {
    user_id: 4,
    title: `It's not hoarding if it's plants`,
    photo: 'https://www.ohmeohmyblog.com/wp-content/uploads/2020/08/plant-shelf-ideas-2.jpg',
    description: `Just wanted to share with you this cool idea for plant organizing. You can use this kind of shelf or the one that is 4x4, and put it vertically or horizontally.`,
    topic: 'plant hack'
  },
  ]);
};
