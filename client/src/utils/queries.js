import { gql } from '@apollo/client';

export const ME= gql`
    query me {
        me {
            _id
            username
            email
            mealPlans {
                _id
                name
                creator
                meals {
                    _id
                    name
                    recipe_url
                }
            }
        }
    }
`

export const ALL_PLANS = gql`
    query allplans {
        allplans {
            _id
            name
            creator
            meals {
                _id
                name
                recipe_url
            }
        }
    }
`

export const ALL_MEALS = gql`
    query allmeals {
        allmeals {
            _id
            name
            recipe_url
        }
    }
`

export const GET_RECIPE = gql`
  query getRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      name
      description
      image
      ingredients
      instructions
      time {
        prep
        cook
        active
        inactive
        total
      }
    }
  }
`

export const POPULAR_LIST = gql`
  query popularList {
    popularList {
        meals {
            _id
            name
            count
        }
        plans {
            _id
            name
            count
        }
    }
  }
`