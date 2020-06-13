import React from 'react';
import BugCard from '../../tracker/bug';
import FishCard from '../../tracker/fish';

const SelectedCard = props => {

    let data = props.data;
    console.log(data);

    let card = (data.type==='fish') ?
        <FishCard {...data}/> :
        <BugCard {...data}/>

    return(
        <div id={`selected-${data.type}`}>
            {card}
            <br></br>
            <button onClick={()=>props.changeSelectedById(data.id-1,data.type)}>
                {`previous ${data.type}`}
            </button>
            <button onClick={()=>props.changeSelected(null)}>
                Deselect
            </button>
            <button onClick={()=>props.changeSelectedById(data.id+1, data.type)}>
                {`next ${data.type}`}
            </button>
            <br></br>
            <p> ID: {data.id}
            </p>
        </div>
    );
}

export default SelectedCard;