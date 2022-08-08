import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../utils/queries';


const Recipe = (props) => {
    const { loading, data } = useQuery(GET_RECIPE, {
        variables: { _id: props._id }
    });

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    const recipe = data?.getRecipe || [];

    return (
        <div className="container w-100 h-100">
            <div className="card w-75 my-3 mx-auto h-auto shadow-lg" id="recipeCard">
                <div className="card-body">
                    <h1 className="text-center m-2 bloo2">{recipe.name}</h1>
                    <div className="pbor"></div>
                    <div>
                        <p className="py-3 bloo2">{recipe.description}</p>
                        <img id="recipeimg" src={recipe.image} alt="{{recipe.description}}" className="image-fluid"></img>
                    </div>
                    <div>
                        <h1 className="merckScript my-4 mx-3">Ingredients</h1>
                        <div className="pbor"></div>
                        <ul>
                        {recipe.ingredients.map((item) => {
                            return (
                                <li className="bloo2 py-3">{item}</li>    
                            )
                        })}
                        </ul>
                    </div>
                    <div>
                        <h1 className="merckScript my-4 mx-3">Preparation</h1>
                        <div className="pbor"></div>
                        {recipe.instructions.map((instruction) => {
                            return (
                                <p className="bloo2 py-3">{instruction}</p>    
                            )
                        })}                        
                    </div>
                    <div>
                        <h2 className="merckScript my-4 mx-3">Other info</h2>
                        <div className="pbor"></div>
                        <p className="bloo2 py-3">Prep: {recipe.time.prep}</p>
                        <p className="bloo2 py-3">Cook: {recipe.time.cook}</p>
                        <p className="bloo2 py-3">Servings: {recipe.servings}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipe