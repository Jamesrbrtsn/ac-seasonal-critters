import React from 'react'

export default function Bug(props){

    let timeCheck = props.time;
    let timeFixed;
    if (timeCheck === "mm"){ timeFixed = "4am - 7pm"; }
    else if(timeCheck ==="a"){ timeFixed = "All day"; }
    else{ timeFixed=timeCheck }

    return (
        <div id="sc-table-body-cell">
            <img id="sc-img" src={props.picturePath} alt=""/>
            <h3 id="sc-h3" className="sc-nameTitle">{props.name}</h3>
            <p id="sc-p">{props.price} Bells</p>
            <p id="sc-p">{props.location}</p>
            <p id="sc-p">{timeFixed}</p>
        </div>
    )
}