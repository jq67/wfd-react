import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ALL_MEALS } from '../utils/queries';
import { CREATE_MEALPLAN } from '../utils/mutations';

import Auth from '../utils/auth';

import './style.css'

const Allmeals = () => {
    const { loading, data } = useQuery(ALL_MEALS)

    const [ createPlan, { error, plandata } ] = useMutation(CREATE_MEALPLAN);

    const [ createList, setCreateList ] = useState([]);

    const [ planName, setPlanName ] = useState('')

    const [ planCreator, setCreator ] = useState('')

    const nameChange = (event) => {
        setPlanName(event.target.value)
    }

    const creatorChange = (event) => {
        setCreator(event.target.value)
    }

    const makeList = (event) => {
        const meal = event.target.getAttribute('data-id')

        const newList = createList

        if (event.target.textContent === "Added" ) {
            let index = newList.indexOf(meal);
            if (index > -1) {
                newList.splice(index, 1)
            };
            console.log(newList)
            event.target.textContent = "Removed"
            return
        }

        newList.push(meal)

        setCreateList(newList)

        console.log(createList)
        event.target.textContent = "Added"
    }

    const submitPlan = async (event) => {
        event.preventDefault()

        const name = planName
        const creator = planCreator
        const meals = []

        createList.map((id) => {
            let item = { _id: id }
            meals.push(item)
            // return meals
        })

        try {
            const { data } = await createPlan({
                variables: { name: name, creator: creator, meals: meals }
            })

            if (!data) {
                throw new Error(error)
            }

            console.log(data)
            alert("Plan created!")
            window.location.replace('/profile')
        } catch (err) {
            console.error(err)
        }
    }

    const mealList = data?.allmeals || [];
    
    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    
    return (
        <div className="card w-75 mx-auto mt-3 bloo2" id="homeCard">
            <div className="container">
            <div className="row p-1">
                {Auth.loggedIn() ? (
                    <form className="my-2">
                    <div className="form-group">
                        <label htmlFor="planName">Name</label>
                        <input type="text" onChange={nameChange} className="form-control" id="planName" placeholder="My plan"></input>
                        <small id="emailHelp" className="form-text text-muted">Please name your new mealplan</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="planCreator">Creator</label>
                        <input type="text" onChange={creatorChange} className="form-control" id="planCreator" placeholder="Anonymous"></input>
                    </div>
                    <button type="button" onClick={submitPlan} className="btn btn-primary" id="createPlan">Create Plan</button>
                </form>
                ) : (
                    <div className="text-center my-2">
                        <h1>Must be logged in to create a new plan</h1>
                    </div>
                )}
                {mealList.map((meal) => {
                    let id = meal._id
                    let link = "/recipe/" + id

                    return (
                        <div key={meal._id} className="card col-sm shadow-lg" id="mealCard">
                    <div className="card-body d-flex flex-column">
                    <div className="text-center">
                        <h3 className="my-3 card-title">{meal.name}</h3>
                    </div>
                    <div className="align-self-end mt-auto mx-auto mb-0">
                        <p className="card-text"><a href={link}>Click to view recipe!</a></p>
                    </div>
                    <div className="align-self-end text-center mt-auto mx-auto">
                        <button type="button" onClick={makeList} className="btn btn-primary" data-id={meal._id} id="addBtn">Add to Mealplan</button>
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

export default Allmeals