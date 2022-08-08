import React from 'react'
import Recipe from './Recipe'
import { useParams } from 'react-router-dom'

// allows us to pass id prop to recipe page
const Recipewrapper = () => {
    const { _id } = useParams();

    return <Recipe _id={ _id }></Recipe>
}

export default Recipewrapper