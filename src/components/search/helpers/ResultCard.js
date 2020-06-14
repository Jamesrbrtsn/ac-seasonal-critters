import React from 'react';

const ResultCard = props => {

    let data = props.data;

    return(
        <div onClick={()=>props.selectionFunction(data, props.type)}
            id={`${props.type}-card`}>
            <h3>
                {data.name}
            </h3>
            <img alt={`icon for the ${data.name} critter`}
                src={`${data.picturePath}`} />
        </div>
    );
}

export default ResultCard;