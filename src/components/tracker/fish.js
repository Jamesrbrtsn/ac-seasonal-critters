import React from 'react'

export default function Fish(props){
    let timeCheck = props.time;
    let timeFixed = "";
    if (timeCheck === "m"){ timeFixed = "9am - 4pm"; }
    else if(timeCheck ==="a"){ timeFixed = "All day"; }
    else if(timeCheck ==="n"){ timeFixed = "4pm - 9am"; }
    else{ timeFixed=(timeCheck.split(":"))[1]; }

    return (
        <div id="sc-table-body-cell">
            <img id ="sc-img" src={props.picturePath} alt=""/>
            <h3 id="sc-h3" className="sc-nameTitle">{props.name}</h3>
            <p id="sc-p">{props.price} Bells</p>
            <p id="sc-p">{props.location}</p>
            <p id="sc-p">Size: {props.size}</p>
            <p id="sc-p">{timeFixed}</p>
        </div>
    )
}