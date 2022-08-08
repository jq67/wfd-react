const db = require('../config/connection');
const User = require('../models/User');
const Meal = require('../models/Meal');
const Mealplan = require('../models/Mealplan');

const mealData = require('./mealData.json');
const mealplanData = require('./mealplan.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await User.remove({});
  await Meal.remove({});
  await Mealplan.remove({});

  const Users = await User.insertMany(userData);
  const Meals = await Meal.insertMany(mealData);
  const Plans = await Mealplan.insertMany(mealplanData);

  console.log('success!');
  process.exit(0);
});

