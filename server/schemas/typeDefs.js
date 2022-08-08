const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    mealPlans: [Mealplan]!
  }

  type Mealplan {
    _id: ID!
    name: String!
    creator: String!
    count: Int!
    meals: [Meal]
  }

  type Meal {
    _id: ID!
    name: String!
    recipe_url: String!
    count: Int!
  }

  type Recipe {
    name: String!
    description: String!
    image: String!
    ingredients: [String!]
    instructions: [String!]
    time: Time
  }

  type Time {
    prep: String
    cook: String
    active: String
    inactive: String
    total: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Popular {
    meals: [Meal]
    plans: [Mealplan]
  }

  input mealinput {
    _id: ID
  }

  input mealplaninput {
    _id: ID!
  }

  type Query {
    me: User
    allplans: [Mealplan]
    allmeals: [Meal]
    allusers: [User]
    getContext: [User]
    getRecipe(_id: ID!): Recipe
    popularList: Popular
  }

  type Mutation {
    createMealplan(name: String!, creator: String! meals: [mealinput]): User
    addMealplan(plan: ID! ): User
    loginUser(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    deletePlan(plan: ID!): User
  }
`;

module.exports = typeDefs;
