import React from 'react';
import fishJSON from '../data/fish.json';
import bugsJSON from '../data/bugs.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MonthDisplay from './tracker/MonthDisplay';
import SearchCritters from './SearchCritters/SearchCritter';
import Information from './information/Information';

export class NavigationBlock extends React.Component {

    state = {
        north: false,
        south: false,
        months: []
    }

    componentDidMount(){

        let date = new Date();
        let ar = [false, false, false, false, false, false,
            false, false, false, false, false, false];
        let month = date.getMonth();
        ar[month] = true;
        this.setState({ months : ar });
        console.log("mounted");
        console.log(this.state);


        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("mounting");
                (position.coords.latitude > 0) ? 
                    this.setState({ north: true}, ()=>{
                        this.buttonCheckHemi('north') 
                    })
                    : 
                    this.setState({ south: true}, ()=> {
                        this.buttonCheckHemi('south') 
                    })
            }
        );
    }

    selectHemisphere(index){
        if(index === 1){ 
            this.setState({ north: !this.state.north}, 
                () => {
                    this.buttonCheckHemi('north');
                    console.log(this.state);
                }
            );
        }
        else if (index === 2){ 
            this.setState({ south: !this.state.south},
                () => {
                    this.buttonCheckHemi('south');
                    console.log(this.state);
                }
            );
        }
    }

    buttonCheckHemi(type){
        let hemiButton = document.querySelector(`.sc-${type}`);
        if(this.state[type]===true){ 
            hemiButton.id = "sc-selected-button";
        }
        else{ hemiButton.id = "sc"; }
    }

    render(){
        return (
            <Router>
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
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>
                                    Month Tracker
                                </Link>
                            </li>
                            <li>
                                <Link to='/search'>
                                    Critter Search
                                </Link>
                            </li>
                            <li>
                                <Link to='/about'>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/search">
                            <SearchCritters
                                north ={this.state.north}
                                south ={this.state.south}
                                fish={fishJSON}
                                bugs={bugsJSON}
                            />
                        </Route>
                        <Route path="/about">
                            <Information />
                        </Route>
                        <Route path="/">
                            <MonthDisplay 
                                key = {`monthDisplay-hemis-${this.state.north}-${this.state.south}`}
                                north ={this.state.north}
                                south ={this.state.south}
                                months = {this.state.months}
                                fish={fishJSON}
                                bugs={bugsJSON}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default NavigationBlock;