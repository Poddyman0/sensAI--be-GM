exports.seed = async function (knex) {
  const { usersData, classesData, lessonsData, assignmentsData, users_lessonsData, users_assignmentsData, classes_usersData } = require('../data/development-data/index.js');

  // Insert the data into the respective tables
  try {
    // Delete existing records to start fresh
    await knex('users_assignments').del();
    await knex('assignments').del();
    await knex('users_lessons').del();
    await knex('lessons').del();
    await knex('classes_users').del();
    await knex('classes').del();
    await knex('users').del();

    // Insert the new data
    await knex('users').insert(usersData);
    await knex('classes').insert(classesData);
    await knex('lessons').insert(lessonsData);
    await knex('assignments').insert(assignmentsData);
    await knex('users_lessons').insert(users_lessonsData);
    await knex('users_assignments').insert(users_assignmentsData);
    await knex('classes_users').insert(classes_usersData);

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
