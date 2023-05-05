const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];
//bulkcreate takes in array of data
const seedCategories = async () => {
  try {
    await Category.bulkCreate(categoryData);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = seedCategories;
