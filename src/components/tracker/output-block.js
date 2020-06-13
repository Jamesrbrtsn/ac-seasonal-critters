import React from 'react'
import BugTable from './bugTable.js'
import FishTable from './fishTable.js'

export class OutputBlock extends React.Component {

    //let sB = true, sF=true;
    render() {
        if(this.props.showBugs===true && this.props.showFish===true){
            return <div>
                    <BugTable list={this.props.buglist}/>
                    <FishTable list={this.props.fishlist}/>
                </div>
        }
        else if (this.props.showFish === true && this.props.showBugs === false){
            return <div>
                    <FishTable list={this.props.fishlist}/>
                </div>
        }
        else if(this.props.showFish === false && this.props.showBugs === true){
            return <div>
                    <BugTable list={this.props.buglist}/>
                </div>
        }
        else{
            return <div id="sc-hidden-replacement">
                    <h2 id="sc-h2">No Critter Type Selected to Be Shown</h2>
                </div>
        }
    }
};

export default OutputBlock;