const { Schema, model } = require('mongoose');

const mealplanSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
      unique: false,
    },
    creator: {
      type: String,
      // required: true,
      unique: false,
    },
    count: {
      type: Number,
      default: 0,
    },
        // set savedBooks to be an array of data that adheres to the bookSchema
    meals: [ {type: Schema.Types.ObjectId, ref: "Meal"}],
  },
  // set this to use virtual below
  // {
  //   toJSON: {
  //     virtuals: true,
  //   },
  // }
);


const Mealplan = model('Mealplan', mealplanSchema);

module.exports = Mealplan;