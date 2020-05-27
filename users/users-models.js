const db = require("../db/db-config");

module.exports = {
  find,
  add,
  findByUserId,
  findBy,
  remove,
  update
};

function find() {
  return db("users");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findByUserId(id);
  } catch (err) {
    console.log("users : models: add", add);
    throw err;
  }
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}
function findByUserId(id) {
  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

async function update(id, change) {
  try {
    await db("users")
      .where({ id })
      .update(change);
    return findBy({ id });
  } catch (err) {
    console.log(err);
    throw err;
  }
}
