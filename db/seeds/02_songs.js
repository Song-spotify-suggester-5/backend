exports.seed = async function(knex) {
  await knex("songs").insert([
    {
      title: "Accidents Will Happen",
      song_by: "Frank Sinatra",
      released_year: 1950,
      favorite: true
    },
    {
      title: "All or Nothing at All",
      song_by: "Frank Sinatra",
      released_year: 1939,
      favorite: true
    }
  ]);
};
