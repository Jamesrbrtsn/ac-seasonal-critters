import React from 'react';
import Bug from './Bug';

const BugsTable = props => {

        return (
            <div>
                <h2 id="sc-h2">Active Bugs ({props.list.length})</h2>
                <div id="sc-bug-table">
                    {props.list.map(element =>
                        <Bug key={element["id"]} {...element}/>
                    )}
                </div>
            </div>
        );
}

export default BugsTable;