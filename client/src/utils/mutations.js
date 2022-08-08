import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        password
      }
    }
  }
`

export const CREATE_MEALPLAN = gql`
  mutation createMealplan($name: String!, $creator: String!, $meals: [mealinput]) {
    createMealplan(name: $name, creator: $creator, meals: $meals) {
      username
      email
    }
  }
`

export const ADD_MEALPLAN = gql`
  mutation addMealplan($plan: ID!) {
    addMealplan(plan: $plan) {
      username
      email
    }
  }
`

export const DELETE_MEALPLAN = gql`
  mutation deletePlan($plan: ID!) {
    deletePlan(plan: $plan) {
      username
      email
    }
  }
`