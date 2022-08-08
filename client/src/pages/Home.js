import React, { useState } from 'react';
// probably need usequery to get popular meals / plans
import { useQuery } from '@apollo/client';
import { POPULAR_LIST } from '../utils/queries';

const Homepage = () => {
    const { loading, data } = useQuery(POPULAR_LIST);

        // if data isn't here yet, say so
        if (loading) {
            return <h2>LOADING...</h2>;
        }

    const popList = data?.popularList || [];  

    return (
        <div className="card w-75 mx-auto mt-3 bloo2" id="homeCard">
            <h1 className="text-center merckScript my-4 display-1">What's for Dinner?</h1>
            <h1 className="text-center mt-2 mb-4">Register or Login to get started!</h1>
            <div className="pbor"></div>
            <div className="container">
                <div className="row">
                <div className="col-sm p-4">
                    <h2>Popular Meals</h2>
                    <ul className="list-group">
                        {popList.meals.map((meal) => {
                            let id = meal._id
                            let link = "/recipe/" + id
                            return (
                            <li key={meal._id} className="list-group-item d-flex justify-content-between align-items-start"><a href={link}>{meal.name}</a><span className="badge bg-primary rounded-pill">{meal.count}</span></li>
                            )
                        })}
                    </ul>
                </div>
                <div className="col-sm p-4">
                    <h2>Popular Mealplans</h2>
                    <ul className="list-group">
                        {popList.plans.map((plan) => {
                            return (
                                <li key={plan._id} className="list-group-item d-flex justify-content-between align-items-start">{plan.name}<span className="badge bg-primary rounded-pill">{plan.count}</span></li>
                            )
                        })}
                    </ul>
                </div>
                </div>  
            </div>
        </div>
    )
}

export default Homepage