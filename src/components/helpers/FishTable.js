import React from 'react'
import Fish from './Fish';

const FishTable = props => {

    return (
        <div>
            <h2 id="sc-h2">Active Fish ({props.list.length})</h2>
            <div id="sc-fish-table">
                {props.list.map(element =>
                    <Fish key={element["id"]} {...element}/>
                )}
            </div>
        </div>
    );
}

export default FishTable;