import React from 'react'
import Fish from './fish';

export class FishTable extends React.Component {

    render(){
        return (
            <div>
                <h2 id="sc-h2">Active Fish ({this.props.list.length})</h2>
                <div id="sc-fish-table">
                    {this.props.list.map(element =>
                        <Fish key={element["id"]} {...element}/>
                    )}
                </div>
            </div>
        )
    }
}

export default FishTable;