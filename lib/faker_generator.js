import { faker } from "@faker-js/faker";
const statusList = ["available", "sold", "pending"];

function petGenerator() {
  return {
    id: faker.number.int({ min: 1000, max: 9999 }),
    category: {
      id: faker.number.int({ min: 100, max: 999 }),
      name: faker.animal.dog()
    },
    name: faker.person.firstName(),
    photoUrls: [faker.image.urlLoremFlickr({ category: 'dog' })],
    tags: [
      {
        id: faker.number.int({ min: 10, max: 99 }),
        name: "friendly"
      }
    ],
    status: faker.helpers.arrayElement(statusList)
  };
}

module.exports = {
  petGenerator
};