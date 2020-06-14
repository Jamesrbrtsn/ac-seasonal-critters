import React from 'react'
import BugTable from './BugTable.js'
import FishTable from './FishTable.js'

export class OutputBlock extends React.Component {

    //let sB = true, sF=true;
    render() {
        if(this.props.showBugs===true && this.props.showFish===true){
            return <div>
                <div id="bottom-bottom"></div>
                    <BugTable list={this.props.buglist}/>
                    <div id="bottom-bottom"></div>
                    <FishTable list={this.props.fishlist}/>
                    <div id="bottom-bottom"></div>
                </div>
        }
        else if (this.props.showFish === true && this.props.showBugs === false){
            return <div>
                <div id="bottom-bottom"></div>
                    <FishTable list={this.props.fishlist}/>
                    <div id="bottom-bottom"></div>
                </div>
        }
        else if(this.props.showFish === false && this.props.showBugs === true){
            return <div>
                    <div id="bottom-bottom"></div>
                    <BugTable list={this.props.buglist}/>
                    <div id="bottom-bottom"></div>
                </div>
        }
        else{
            return <div id="sc-hidden-replacement">
                <div id="bottom-bottom"></div>
                    <h2 id="sc-h2">No Critter Type Selected to Be Shown</h2>
                    <div id="bottom-bottom"></div>
                </div>
        }
    }
};

export default OutputBlock;