import React from 'react';
import DualToggle from '../helpers/DualToggle';
import MonthCritterTable from '../helpers/MonthCritterTable';
import CritterTable from '../helpers/CritterTable';
import FishTable from '../helpers/FishTable';
import BugTable from '../helpers/BugTable';
import SelectedCard from '../helpers/SelectedCard';

class Tracker extends React.Component{

    state = {
        north: false,
        south: false,
        months : [],
        fish_data : this.props.fish,
        bugs_data : this.props.bugs,
        display_bugs : true,
        display_fish : true,
        valid_fish: [],
        valid_bugs: [],
        buttonMonths : [
            "January", "Feburary", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        critterpedia_view: true,
        selected: null
    }

    componentDidMount(){
        let date = new Date();
        let arr = [false, false, false, false, false, false,
            false, false, false, false, false, false];
        let month = date.getMonth();
        arr[month] = true;
        this.setState({ months : arr });

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                (position.coords.latitude > 0) ? 
                    this.setState({ north: true}, ()=>{
                        this.buttonCheckHemi('north') 
                    })
                    : 
                    this.setState({ south: true}, ()=> {
                        this.buttonCheckHemi('south');
                    });
            }
        );

        for(let i = 0; i<arr.length; i++){
            this.fixMonthVisual(i,arr);
        }
        this.getValidCritters();
    };

    toggleMonth(index){ //wonky
        let months_updated = this.state.months;
        months_updated[index-1] = !(this.state.months[index-1]);
        this.setState({months: months_updated},()=>{
            this.fixMonthVisual((index-1),this.state.months)
            this.getValidCritters();
        });
    };

    toggleDisplay(input){
        if (input==='fish'){ 
            let fish_check = !this.state.display_fish;
            this.updateDisplayButton('fish');
            this.setState({ display_fish : fish_check});
        }
        else if (input==='bugs') {
            let bug_check = !this.state.display_bugs;
            this.updateDisplayButton('bug');
            this.setState({ display_bugs : bug_check});
        }
    };

    toggleCritterpedia(){
        let current = this.state.critterpedia_view;
        this.setState({
            critterpedia_view: !current
        });
    }

    updateDisplayButton(type){
        let button = document.querySelector(`.sc-${type}-display-button`);
        
        if (type==='bug'){type = "bugs"}
        let text = type.charAt(0).toUpperCase() + type.slice(1);

        if(this.state[`display_${type}`]===false){
            button.id = "sc-selected-button";
            button.innerHTML = `Hide ${text}`;
        }
        else{
            button.id = "sc";
            button.innerHTML = `Show ${text}`;
        }
    }

    fixMonthVisual(i,arr){
        let buttonClassString = ".sc-"+this.state.buttonMonths[i].toLowerCase()+"Button";
        let monthButton = document.querySelector(buttonClassString);
        if(arr[i]===true){  monthButton.id = "sc-selected-button";  }
        else{   monthButton.id = "sc";  }
    };

    checkValidCritter(i, type){
        let selection = "fish";
        (type==='bugs') ? selection='bugs' : selection='fish';

        let critter = this.state[`${selection}_data`][i];

        let critterMonths = critter["months"];
        let [south, north] = [this.state.south, this.state.north];

        if(critter["allYear"]===1){ return true; }

        let check_month = [];
        if ( south ===true && north===true ){
            let temp = [];
            temp = temp.concat(critterMonths[0],critterMonths[1]); //both month lists
            check_month = Array.from(new Set(temp));   //remove duplcates, return to array
        }
        else if( south === true){
            check_month = critterMonths[1]; //south month list
        }
        else if(south  === false && north ===true){
            check_month = critterMonths[0];  //north month list
        }
        else{ check_month = "Invalid"; return false; }

        for(let k = 0; k<check_month.length; k++){
            if(this.state.months[check_month[k]-1]===true){
                return true;
            }
        }
        return false;
    };


    getValidCritters(){
        let validBugs = [];
        let validFish = [];
        if(this.state.display_bugs===true){
            let bugsList = this.state.bugs_data;
            for(let i=0; i<bugsList.length; i++){
                if(this.checkValidCritter(i,'bugs')===true){ 
                    let temp = bugsList[i];
                    validBugs.push(temp);
                }
            }
        }
        if(this.state.display_fish===true){
            let fishList = this.state.fish_data;
            for(let i=0; i<fishList.length; i++){
                if(this.checkValidCritter(i,'fish')===true){ 
                    let temp = fishList[i];
                    validFish.push(temp);
                }   
            }
        }
        this.setState({
                valid_bugs: [...validBugs],
                valid_fish: [...validFish]
        });
    };


    selectHemisphere(index){
        let current;
        if(index === 1){ 
            current = this.state.north;
            this.setState({ north: !current}, () =>{
                this.buttonCheckHemi('north');
                }
            );
        }
        else if (index === 2){ 
            current = this.state.south;
            this.setState({ south: !current},() =>{
                this.buttonCheckHemi('south');
                }
            );
        }
    };

    buttonCheckHemi(type){
        let hemiButton = document.querySelector(`.sc-${type}`);
        if(this.state[type]===true){ 
            hemiButton.id = "sc-selected-button";
        }
        else{ hemiButton.id = "sc"; }
        this.getValidCritters();
    };

    changeSelection = data => {
        console.log('Change selection');
        console.log(data);
    }

    fixId = (id) => {
        if(id===-1){return 79}
        else if(id===80){return 0}
        else{ return id}
    }

    changeSelection = (data, typePick='undeclared') => {
        if(data!==null){data.type = typePick}
        this.setState({ selected: data});
    }
    
    displaySelected = () => {
        let obj = this.state.selected;
        if (obj===null){return <div></div>}
        else{
            let id = obj.id;
            const [previous, next] = (obj.type==='fish') 
                ? [this.state.fish_data[this.fixId(id-2)], this.state.fish_data[this.fixId(id)]] //[prev fish, next fish] 
                : [this.state.bugs_data[this.fixId(id-2)], this.state.bugs_data[this.fixId(id)]]; //[prev bug, next bug]

            console.log(this.state.selected);
            return <SelectedCard data={this.state.selected}
                previous={previous}
                next={next}
                changeSelected={this.changeSelection}/>
        }
    }



    render(){

        const selected = this.displaySelected();

        const output = (this.state.critterpedia_view===true) 
            ?   <DualToggle variables={[this.state.display_bugs, this.state.display_fish]}
                message="No critter type selected"
                componentOne={
                    <MonthCritterTable 
                    list={this.state.bugs_data} 
                    changeSelected={this.changeSelection}
                    valid={this.state.valid_bugs}
                    type='bug'
                    />
                }
                componentTwo={
                    <MonthCritterTable 
                    list={this.state.fish_data} 
                    changeSelected={this.changeSelection}
                    valid={this.state.valid_fish}
                    type='fish'
                    />
                }/>
            :   <DualToggle variables={[this.state.display_bugs, this.state.display_fish]}
                message="No critter type selected"
                componentOne={
                    <BugTable list={this.state.valid_bugs}/>
                }
                componentTwo={
                    <FishTable list={this.state.valid_fish}/>
                }/>;
            
        return (
        <div>
            <div>
                <div id="sc-navigation-block">
                    <h2 id="sc-option-text" className="sc-h2">Hemisphere</h2>
                    <div id="sc-hemisphere-input">
                        <button className="sc-north"
                        onClick={() => this.selectHemisphere(1)}>Northern Hemisphere</button>
                        <button className="sc-south" 
                        onClick={() => this.selectHemisphere(2)}>Southern Hemisphere</button>
                    </div>
                </div>
                <h2 id="sc-option-text" className="sc-h2">Month</h2>
                <div id="sc-months-input">
                    {this.state.buttonMonths.map((month)=>{
                        return(
                            <button 
                                key={month}
                                className={`sc-${month.toLowerCase()}Button`}
                                onClick={()=>this.toggleMonth(this.state.buttonMonths.indexOf(month)+1)}>
                                {month}
                            </button>
                        );
                    })}
                </div>
                
                <h2 id="sc-option-text" className="sc-h2">Display</h2>
                <div id="sc-left-input">
                    <div id="sc-display-input">
                        <button className="sc-fish-display-button" id="sc-selected-button" onClick={() => this.toggleDisplay('fish')}>Hide Fish</button>
                        <button className="sc-bug-display-button" id="sc-selected-button" onClick={() => this.toggleDisplay('bugs')}>Hide Bugs</button>
                    </div> 
                </div>
                <div id="sc-right-input">
                    <button id="sc-right-input" onClick={()=>this.toggleCritterpedia()}>
                        Toggle Details View
                    </button>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div>
            {selected}
            </div>
            <div>
            {output}
            </div>
        </div>
        )
    };
}

export default Tracker;