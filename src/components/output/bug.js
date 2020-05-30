import React from 'react'

export default function Bug(props){

    let timeCheck = props.time;
    let timeFixed;
    if (timeCheck === "mm"){ timeFixed = "4am - 7pm"; }
    else if(timeCheck ==="a"){ timeFixed = "All day"; }
    else{ timeFixed=timeCheck }

    return (
        <div id="table-body-cell">
            <img src={props.picturePath} alt=""/>
            <h3 className="nameTitle">{props.name}</h3>
            <p>{props.price} Bells</p>
            <p>{props.location}</p>
            <p>{timeFixed}</p>
        </div>
    )
}