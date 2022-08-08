import React from 'react';
import '../pages/style.css'

function Aside() {
    return (
        <div className="col-sm-3 p-3" id="asideSctn">
            <h1 className="pb-3 px-3 merckScript"><a className="sidelinks" href="/">Home</a></h1>
            <h1 className="pb-3 px-3 merckScript"><a className="sidelinks" href="/profile">Profile</a></h1>
            <h1 className="pb-3 px-3 merckScript"><a className="sidelinks" href="/allplans">View all mealplans</a></h1>
            <h1 className="pb-3 px-3 merckScript"><a className="sidelinks" href="/allmeals">View all meals</a></h1>
        </div>
    )
}

export default Aside