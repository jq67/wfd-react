import React, { useState } from 'react';
import { ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { DELETE_MEALPLAN } from '../utils/mutations';


const Profile = () => {
    const { loading, data } = useQuery(ME)

    const userData = data?.me || [];
    console.log(userData)

    const [ deletePlan, { error, planData } ] = useMutation(DELETE_MEALPLAN);

    const deleteMealplan = async (event) => {
        event.preventDefault();

        const _id = event.target.getAttribute("data-id")

        try {
            const { data } = await deletePlan({
                variables: { plan: _id }
            })

            if (!data) {
                throw new Error(error)
            }

            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }

    

        // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (!userData.mealPlans.length) {
        return (
            <div className="card w-75 mx-auto mt-3 bloo2" id="homeCard">
            <h1>Meal Plans</h1>
            <div className="pbor"></div>
            <div>
                <h1>No mealplans yet!</h1>
            </div>
            </div>
        )
    }

    return (
        <div className="card w-75 mx-auto mt-3 bloo2" id="homeCard">
            <h1>Meal Plans</h1>
            <div className="pbor"></div>
            {userData.mealPlans.map((mealplan) => {
                return (
                    <div key={mealplan._id} className="card m-1">
                    <div className="card-header text-center">
                        <h2>{mealplan.name}<span className="float-end mx-2"><button type="button" onClick={deleteMealplan} className="btn btn-primary delbtn" data-id={mealplan._id}>delete</button></span></h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Created by: {mealplan.creator}</p>
                        <ul className="card-text">
                            {mealplan.meals.map((meal) => {
                                let id = meal._id
                                let link = "/recipe/" + id
                                return (
                                    <li key={meal._id} className="lists my-1"><a href={link}>{meal.name}</a></li>    
                                )
                            })}
                        </ul>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default Profile