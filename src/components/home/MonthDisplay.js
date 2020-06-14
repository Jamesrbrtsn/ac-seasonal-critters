import React from 'react';
import OutputBlock from './OutputBlock';
import Critterpedia from './CritterpediaMonthDisplay';

class MonthDisplay extends React.Component{

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
    }

    componentDidMount(){
        let date = new Date();
        let ar = [false, false, false, false, false, false,
            false, false, false, false, false, false];
        let month = date.getMonth();
        ar[month] = true;
        this.setState({ months : ar });

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

        let arr = ar;
        for(let i = 0; i<arr.length; i++){
            this.fixMonthVisual(i,arr);
        }
        this.getValidCritters();
    };

    toggleMonth(index){
        let monthsUpdated = this.state.months;
        monthsUpdated[index-1] = !(this.state.months[index-1]);
        this.setState({months: monthsUpdated},()=>{
            this.fixMonthVisual((index-1),this.state.months)
            this.getValidCritters();
        });
    };

    toggleDisplay(input){
        if (input==='fish'){ 
            let fishCheck = this.state.display_fish;
            fishCheck = !fishCheck;  
            this.updateDisplayButton('fish');
            this.setState({
                display_fish : fishCheck,
            });
        }
        else if (input==='bugs') {
            let bugCheck = this.state.display_bugs;
            bugCheck = !bugCheck; 
            this.updateDisplayButton('bug');
            this.setState({
                display_bugs : bugCheck
            });
        }
    };

    toggleCritterpedia(){
        let current = this.state.critterpedia_view;
        this.setState({
            critterpedia_view: !current
        })
    }

    updateDisplayButton(type){
        console.log(type);
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

    
    render(){
        let output = (this.state.critterpedia_view) ?
            <Critterpedia 
                key={`state-${this.state.north}-${this.state.south}`}
                showBugs={this.state.display_bugs} 
                showFish={this.state.display_fish}
                buglist={this.state.bugs_data}
                fishlist={this.state.fish_data}
                validBugs={this.state.valid_bugs}
                validFish={this.state.valid_fish}
            />
            :
            <OutputBlock 
                showBugs={this.state.display_bugs} 
                showFish={this.state.display_fish}
                buglist={this.state.valid_bugs}
                fishlist={this.state.valid_fish}/>;

        return(
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
                <div id="sc-full-display">
                    {output}
                </div>
            </div>
        )
    };
}

export default MonthDisplay;