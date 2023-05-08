const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const generateContacts = (count) => {
    const contacts = [];
    for (let i = 0; i < count; i++) {
      const bd = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
      contacts.push({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('07#########'),
        avatar: faker.image.avatar(),
        birthday: bd,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    return contacts;
  };

  // Deletes ALL existing entries
  await knex('contacts').del();
  await knex('contacts').insert(generateContacts(20));
};
