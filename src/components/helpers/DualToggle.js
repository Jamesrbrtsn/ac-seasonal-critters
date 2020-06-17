import React from 'react';

const DualToggle = props => {

    const [one, two] = props.variables;
    const message = props.message || "Neither type selected";

    const componentOne = props.componentOne;
    const componentTwo = props.componentTwo;

    const output = (one===false&&two===false) 
        ?   <div id="sc-hidden-replacement">
                <h2 id="sc-h2">{message}</h2>
            </div>
        : <div>
            {one&&componentOne}
            {two&&componentTwo}
          </div>;
 
    return (
        <div>
            {output}
        </div>
    );
}

export default DualToggle;