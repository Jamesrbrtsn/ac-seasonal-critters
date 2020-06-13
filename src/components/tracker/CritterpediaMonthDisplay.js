import React from 'react'
import MonthCritterTable from './MonthCritterTable';
import SelectedCard from '../SearchCritters/helpers/SelectedCard';

class Critterpedia extends React.Component{

    state = { 
        selected: null,
    };

    changeSelectedById = (id, type) => {
        let data;
        if(id===0){id=80}
        else if(id===81){id=1}
        (type==='bug') ?
            data = this.props.buglist[id-1] :
            data = this.props.fishlist[id-1];
        data.type=type;
        this.setState({selected:data});
    }

    changeSelection = (data, type='undeclared') => {
        // console.log(type);
        if(data!==null){data.type = type;}
        // console.log("-.....");
        // console.log(data);
        this.setState({ selected: data});
    }

    render() {

        let output =  <div></div>;
        if(this.props.showBugs===true && this.props.showFish===true){
            output = <div>
                <MonthCritterTable 
                    list={this.props.buglist} 
                    changeSelected={this.changeSelection}
                    valid={this.props.validBugs}
                    type='bug'/>
                <MonthCritterTable 
                    list={this.props.fishlist} 
                    valid={this.props.validFish}
                    changeSelected={this.changeSelection}
                    type= 'fish'/>
            </div>
        }
        else if (this.props.showFish === true && this.props.showBugs === false){
            output = <div>
                <MonthCritterTable 
                    list={this.props.fishlist}
                    valid={this.props.validFish} 
                    changeSelected={this.changeSelection}
                    type= 'fish'/>
            </div>
        }
        else if(this.props.showFish === false && this.props.showBugs === true){
            output = <div>
                <MonthCritterTable 
                    list={this.props.buglist} 
                    valid={this.props.validBugs} 
                    changeSelected={this.changeSelection}
                    type='bug'/>
            </div>
        }
        else{
            output = <div id="sc-hidden-replacement">
                <h2 id="sc-h2">No Critter Type Selected to Be Shown</h2>
            </div>
        }
        

        let selected = (this.state.selected===null) ?
            <div></div> :
            <SelectedCard data={this.state.selected}
                changeSelected={this.changeSelection}
                changeSelectedById={this.changeSelectedById}
                />


        return(
            <div>
                {selected}
                {output}
            </div>
        )
    }
}

export default Critterpedia;