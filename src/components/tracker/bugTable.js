import React from 'react'
import Bug from './bug'

export class BugsTable extends React.Component {

    render(){
        return (
            <div>
                <h2 id="sc-h2">Active Bugs ({this.props.list.length})</h2>
                <div id="sc-bug-table">
                    {this.props.list.map(element =>
                        <Bug key={element["id"]} {...element}/>
                    )}
                </div>
            </div>
        )
    }
}

export default BugsTable;