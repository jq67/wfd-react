const { Schema, model } = require('mongoose');

const mealSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      unique: false,
    },
    recipe_url: {
      type: String,
      // required: true,
      unique: false,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // }
);

const Meal = model('Meal', mealSchema);

module.exports = Meal;
