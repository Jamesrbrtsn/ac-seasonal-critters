import React from 'react';
import OutputBlock from './output/output-block';
import fishJSON from '../data/fish.json';
import bugsJSON from '../data/bugs.json';
import { DisplayExample } from './display-example';

export class InputBlock extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            northHemisphere: true,
            southHemisphere: false,
            months : [false, false, false, false, false, false,
                false, false, false, false, false, false],
            showBugs: true,
            showFish: true,
            fish: fishJSON,
            bugs: bugsJSON,
            validFish: [],
            validBugs: []
        };
    }

    checkValidBug(i){
        if(this.state.bugs[i]["allYear"]===1){ return true; }
        let check_month = [];
        if ( this.state.southHemisphere ===true && this.state.northHemisphere===true ){
            let temp = []
            temp = temp.concat(this.state.bugs[i]["months"][0],this.state.bugs[i]["months"][1]);
            check_month = Array.from(new Set(temp));   //remove duplcates, return to array
        }
        else if(this.state.southHemisphere === true && this.state.northHemisphere===false){
            check_month = this.state.bugs[i]["months"][1];
        }
        else if(this.state.northHemisphere === true && this.state.southHemisphere===false){
            check_month = this.state.bugs[i]["months"][0];
        }
        else{ check_month = "Invalid"; return false; }
        for(let k = 0; k<check_month.length; k++){
            if(this.state.months[check_month[k]-1]===true){
                return true;
            }
        }
        return false;
    }

    checkValidFish(i){
        if(this.state.fish[i]["allYear"]===1){
            return true;
        }
        let check_month = [];
        if ( this.state.southHemisphere ===true && this.state.northHemisphere===true ){
            let temp = []
            temp = temp.concat(this.state.fish[i]["months"][0],this.state.fish[i]["months"][1]);
            check_month = Array.from(new Set(temp));   //remove duplcates, return to array
        }
        else if(this.state.southHemisphere === true && this.state.northHemisphere===false){
            check_month = this.state.fish[i]["months"][1];
        }
        else if(this.state.northHemisphere === true && this.state.southHemisphere===false){
            check_month = this.state.fish[i]["months"][0];
        }
        else{
            check_month = "Invalid";
            return false;
        }
        for(let k = 0; k<check_month.length; k++){
            if(this.state.months[check_month[k]-1]===true){
                return true;
            }
        }
        return false;
    }

    applyValidBugs(){
        this.setState(
            { validBugs: [] }, 
            ()=>{
                for(let i=0; i<this.state.bugs.length; i++){
                    if(this.checkValidBug(i)===true){ 
                        let temp = this.state.bugs[i];
                        let arr = this.state.validBugs;
                        arr.push(temp);
                        this.setState({ validBugs : arr}); }
                }
            }
        );
    }

    applyValidFish(){
        this.setState(
        {validFish: [] }, () => {
                for(let i=0; i<this.state.fish.length; i++){
                    if(this.checkValidFish(i)===true){
                        let temp = this.state.fish[i];
                        let arr = this.state.validFish;
                        arr.push(temp);
                        this.setState({ validFish : arr}); }
                }
            }
        );
    }

    componentDidMount(){
        let date = new Date();
        let ar = [false, false, false, false, false, false,
            false, false, false, false, false, false];
        let month = date.getMonth();
        ar[month] = true;
        this.setState({months:ar}, this.fixMonthVisual(month,ar));
        this.applyValidFish();
        this.applyValidBugs();
    }

    buttonCheckNorth(){
        if(this.state.northHemisphere===false){
            document.querySelector(".north").id = "selected-button";
        }
        else{
            document.querySelector(".north").id = " ";
        }
    }

    buttonCheckSouth(){
        if(this.state.southHemisphere===false){
            document.querySelector(".south").id = "selected-button";
        }
        else{
            document.querySelector(".south").id = " ";
        }
    }

    buttonCheckBugDisplay(){
        let bugButton =  document.querySelector(".bug-display-button");
        if(this.state.showBugs===false){
            bugButton.id = "selected-button";
            bugButton.innerHTML = "Hide Bugs";
        }
        else{
            bugButton.id = " ";
            bugButton.innerHTML = "Show Bugs";
        }
    }

    buttonCheckFishDisplay(){
        let fishButton =  document.querySelector(".fish-display-button");
        if(this.state.showFish===false){
            fishButton.id = "selected-button";
            fishButton.innerHTML = "Hide Fish";
        }
        else{
            fishButton.id = " ";
            fishButton.innerHTML = "Show Fish";
        }
    }
    
    fixMonthVisual(i,arr){
        let monthStrings = [
            "january", "feburary", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];
        if(arr[i]===true){
            document.querySelector("."+monthStrings[i]+"Button").id = "selected-button";
        }
        else{
            document.querySelector("."+monthStrings[i]+"Button").id = "";
        }
    }

    selectHemisphere(index){
        if(index === 1){ 
            this.setState({northHemisphere : !this.state.northHemisphere}, this.buttonCheckNorth());
        }
        else if (index === 2){ 
            this.setState({southHemisphere : !this.state.southHemisphere}, this.buttonCheckSouth());
        }
        this.applyValidFish();
        this.applyValidBugs();
    }

    toggleMonth(index){
        let monthsUpdated = this.state.months;
        monthsUpdated[index-1] = !(this.state.months[index-1]);
        this.setState({months: monthsUpdated})
        this.fixMonthVisual(index-1,this.state.months);
        this.applyValidFish();
        this.applyValidBugs();
    }

    toggleFishDisplay(){
        this.setState({showFish : !this.state.showFish}, this.buttonCheckFishDisplay());
    }

    toggleBugDisplay(){
        this.setState({showBugs : !this.state.showBugs}, this.buttonCheckBugDisplay());
    }

    render(){
        return (
            <div>
                <div id="container">
                    <hr></hr>
                    <div id="left-input">
                        <h2 id="option-text">Hemisphere</h2>
                        <div id="hemisphere-input">
                            <button className="north" id="selected-button"
                            onClick={() => this.selectHemisphere(1)}>Northern Hemisphere</button>
                            <button className="south" 
                            onClick={() => this.selectHemisphere(2)}>Southern Hemisphere</button>
                        </div>
                        <h2 id="option-text">Month</h2>
                        <div id="months-input">
                            <button className="januaryButton"
                            onClick={() => this.toggleMonth(1)}>January</button>
                            <button className="feburaryButton"
                            onClick={() => this.toggleMonth(2)}>Feburary</button>
                            <button className="marchButton"
                            onClick={() => this.toggleMonth(3)}>March</button>
                            <button className="aprilButton"
                            onClick={() => this.toggleMonth(4)}>April</button>
                            <button className="mayButton"
                            onClick={() => this.toggleMonth(5)}>May</button>
                            <button className="juneButton"
                            onClick={() => this.toggleMonth(6)}>June</button>
                            <button className="julyButton"
                            onClick={() => this.toggleMonth(7)}>July</button>
                            <button className="augustButton"
                            onClick={() => this.toggleMonth(8)}>August</button>
                            <button className="septemberButton"
                            onClick={() => this.toggleMonth(9)}>September</button>
                            <button className="octoberButton"
                            onClick={() => this.toggleMonth(10)}>October</button>
                            <button className="novemberButton"
                            onClick={() => this.toggleMonth(11)}>November</button>
                            <button className="decemeberButton"
                            onClick={() => this.toggleMonth(12)}>December</button>
                        </div>
                    </div>
                    <div id="right-input">
                        <h2 id="option-text">Information Layout</h2>
                        <div id="ex-grid">
                            <DisplayExample type ="fish"/>
                            <DisplayExample type ="bug"/> 
                        </div> 
                        <br></br> 
                    </div>
                    <div id="left-input">
                        <h2 id="option-text">Display</h2>
                        <div id="display-input">
                            <button className="fish-display-button" id="selected-button" onClick={() => this.toggleFishDisplay()}>Hide Fish</button>
                            <button className="bug-display-button"  id="selected-button" onClick={() => this.toggleBugDisplay()}>Hide Bugs</button>
                        </div> 
                    </div>
                </div>
                <div id="full-display">
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <OutputBlock 
                        showBugs={this.state.showBugs} 
                        showFish={this.state.showFish}
                        buglist={this.state.validBugs}
                        fishlist={this.state.validFish}
                        />
                    <br></br>
                    <br></br>
                </div>
            </div>
        )
    }
}

export default InputBlock;