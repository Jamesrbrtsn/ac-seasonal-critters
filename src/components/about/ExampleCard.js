import React from 'react';

const ExampleCard = props => {

    const size = (props.type==='fish') ?
        <p id="sc-p">Size (Fish)</p> : <div></div>;

    return(
        <div id="sc-example">
            <img id="sc-img" src={props.picturePath} alt=""/>
            <h3 className="sc-nameTitle" id="sc-h3">Name</h3>
            <p id="sc-p">Sell Price</p>
            <p id="sc-p">Location</p>
            {size}
            <p id="sc-p">Time Active</p>
        </div>
    );
    
}

export default ExampleCard;
