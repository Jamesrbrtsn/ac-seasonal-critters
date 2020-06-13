import React from 'react'
import CritterTable from './CritterTable';

class Critterpedia extends React.Component{

    render() {
        if(this.props.showBugs===true && this.props.showFish===true){
            return <div>
                    <CritterTable list={this.props.buglist} type='bug'/>
                    <CritterTable list={this.props.fishlist} type= 'fish'/>
                </div>
        }
        else if (this.props.showFish === true && this.props.showBugs === false){
            return <div>
                    <CritterTable list={this.props.fishlist}/>
                </div>
        }
        else if(this.props.showFish === false && this.props.showBugs === true){
            return <div>
                    <CritterTable list={this.props.buglist}/>
                </div>
        }
        else{
            return <div id="sc-hidden-replacement">
                    <h2 id="sc-h2">No Critter Type Selected to Be Shown</h2>
                </div>
        }
    }
}

export default Critterpedia;