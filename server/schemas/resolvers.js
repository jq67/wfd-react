const { User, Meal, Mealplan } = require('../models');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const recipeScraper = require('recipe-scraper');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = User.findOne({ _id: context.user._id });
        console.log(context.user._id)

        const data = user.populate({
        path: "mealPlans",
        populate: {
          path: "meals",
        }
      });

        return data
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // get recipe url from meal and use recipe scraper npm package to get recipe object
    getRecipe: async (parent, { _id }, context) => {
      const meal = await Meal.findOne({
        _id: _id
      })

      const recipe = await recipeScraper(meal.recipe_url)

      return recipe
    },

    allplans: async (parent, args, context) => {
      return Mealplan.find().populate("meals")
    },

    allmeals: async (parent, args, context) => {
      return Meal.find()
    },

    allusers: async (parent, args, context) => {
      return User.find().populate("mealPlans")
    },

    popularList: async(parent, args, context) => {
      const meals = await Meal.find().sort({count: -1}).limit(5)

      const plans = await Mealplan.find().sort({count: -1}).limit(5)

      return { meals, plans }
    }
  },
  Mutation: {
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      // const correctPw = await user.isCorrectPassword(password);

      if (password !== user.password) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },    

    // context user id for creating a new plan and adding it to user
    createMealplan: async (parent, { name, creator, meals }, context) => {
      if (context.user) {
        const mealplan = await Mealplan.create({ name, creator, meals })
        
        const user =  await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { mealPlans: mealplan } },
          { new: true }
        )
        
        // update plan count
        const mplan = await Mealplan.findOneAndUpdate(
          { _id: mealplan._id },
          { $inc: { count: 1 }},
          { new: true }
        )
        
        // update meal count
        for (let i = 0; i < meals.length; i++) {
          const item = await Meal.findOneAndUpdate(
            { _id: meals[i]._id },
            { $inc: { count: 1} },
            { new: true },
          )
        }

        return user
      }

      throw new AuthenticationError('You need to be logged in!');

    },

    // use context to get user id
    addMealplan: async (parent, { plan }, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id })

        // check if plan is already on users list
        for (let i = 0; i < data.mealPlans.length; i++) {
          if (data.mealPlans[i]._id == plan) {
            throw new UserInputError('Plan already exists on your profile!')
          }
        }

        const user =  await User.findOneAndUpdate(  
          { _id: context.user._id },
          { $push: { mealPlans: plan } },
          { new: true }
        )
        
        const mplan = await Mealplan.findOneAndUpdate(
          { _id: plan },
          { $inc: { count: 1 }},
          { new: true }
        )

        return user
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    
    deletePlan: async (parent, { plan }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { mealPlans: plan } },
          { new: true },
        )

        return user
      }

      throw new AuthenticationError('You need to be logged in!')
    }
  }
};

module.exports = resolvers;
