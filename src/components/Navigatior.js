import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import About from './about/About';
import Search from './search/Search';
import Tracker from './tracker/Tracker';

import Bugs from '../data/bugs.json';
import Fish from '../data/fish.json';


const Navigator = () => {
    return (
        <Router>
            <nav id="sc-navigation-bar">
                <ul>
                    <li>
                        <Link to='/'>
                            Tracker
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
            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/search">
                    <Search
                        fish={Fish}
                        bugs={Bugs}/>
                </Route>
                <Route path="/">
                    <Tracker
                        fish={Fish}
                        bugs={Bugs}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Navigator;