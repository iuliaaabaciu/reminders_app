const config = require('./config');
const knex = require("knex")(config);

exports.listUsers = () => 
  knex.select("id", "firstName", "lastName", "email")
  .from("users");    

exports.register = async (firstName, lastName, email, password) => {
  return knex("users").insert({ 
    firstName: firstName, 
    lastName: lastName, 
    email: email,
    password: password, 
  });
}

exports.login = async (email) => {
  const users = await knex('users')
    .where("email", email);

  return users.length === 0 ? undefined : users[0];
}