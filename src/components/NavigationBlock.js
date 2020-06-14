import React from 'react';
import fishJSON from '../data/fish.json';
import bugsJSON from '../data/bugs.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MonthDisplay from './home/MonthDisplay';
import SearchCritters from './search/SearchCritter';
import Information from './information/Information';

export class NavigationBlock extends React.Component {


    render(){
        return (
            <Router>
                <div>
                    <nav>
                        <ul id="sc-navigation-bar">
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
                            <li style={{float: 'right'}}>
                                <Link to='/about'>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <br></br>
                    <Switch>
                        <Route path="/search">
                            <SearchCritters
                                fish={fishJSON}
                                bugs={bugsJSON}
                            />
                        </Route>
                        <Route path="/about">
                            <Information />
                        </Route>
                        <Route path="/">
                            <MonthDisplay 
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