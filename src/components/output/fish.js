import React from 'react'

export default function Fish(props){
    let timeCheck = props.time;
    let timeFixed;
    if (timeCheck === "m"){ timeFixed = "9am - 4pm"; }
    else if(timeCheck ==="a"){ timeFixed = "All day"; }
    else if(timeCheck ==="n"){ timeFixed = "4pm - 9am"; }
    else{ timeFixed=(timeCheck.split(":"))[1]; }

    return (
        <div id="table-body-cell">
            <img src={props.picturePath} alt=""/>
            <h3 className="nameTitle">{props.name}</h3>
            <p>{props.price} Bells</p>
            <p>{props.location}</p>
            <p>Size: {props.size}</p>
            <p>{timeFixed}</p>
        </div>
    )
}