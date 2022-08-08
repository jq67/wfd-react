import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ALL_PLANS } from '../utils/queries';
import { ADD_MEALPLAN } from '../utils/mutations';

import Auth from '../utils/auth';

import './style.css'

const Allplans = () => {
    const { loading, data } = useQuery(ALL_PLANS)

    const [ addPlan, {error, plandata } ] = useMutation(ADD_MEALPLAN)

    const planList = data?.allplans || [];

    const pushPlan = async (event) => {
        event.preventDefault();

        if (event.target.textContent === "Added to profile!") {
            return
        }

        const _id = event.target.getAttribute("data-id")

        try {
            const { data } = await addPlan({
                variables: { plan: _id }
            })

            if (!data) {
                throw new Error(error);
            }

            event.target.textContent = "Added to profile!"
        } catch (err) {
            alert(err)
            console.error(err)
        }
    }

    return (
        <div className="w-75 mx-auto mt-3 bloo2" id="homeCard">
            <div className="container">
            <div className="row p-1">
                {planList.map((plan) => {
                    return (
                        <div className="card col-sm shadow-lg" key={plan._id} id="mealCard">
                        <div className="container">
                        <div className="row">
                            <div className="w-75 text-center">
                                <h1 className="my-3">{plan.name}</h1>
                            </div>
                            {Auth.loggedIn() ? (
                            <div className="col-sm text-center my-auto">
                            <button type="button" key={plan._id} onClick={pushPlan} data-id={plan._id} className="btn btn-primary addBtn">Add to Profile</button>
                            </div>
                            ) : (
                            <div className="col-sm text-center my-auto">
                                <a href="/login"><button type="button" key={plan._id} data-id={plan._id} className="btn btn-primary addBtn">Add to Profile</button></a>
                            </div>
                            )}
                            <ul>
                                {plan.meals.map((meal) => {
                                    let id = meal._id
                                    let link = "/recipe/" + id
                                    return (
                                        <li className="lists my-1" key={meal._id}><a href={link}>{meal.name}</a></li>
                                    )
                                })}
                            </ul>
                        </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Allplans