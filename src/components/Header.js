import React from 'react'

class Header extends React.Component{

    state = {displayInfo: false};

    toggleDisplay = () => {
        this.setState({displayInfo: !this.state.displayInfo},
            console.log(this.state.displayInfo));
    }

    render(){

        const toggleButton = <button className="sc-header-toggle-btn"
            onClick={this.toggleDisplay}>
            {this.state.displayInfo===false ? 'Info':'Hide'}
        </button>

        const header = (this.state.displayInfo===false) ?
            <div></div> :
            <div className="sc-top-info">
                <h3 id="sc-h3">
                    A tracking tool for Animal Crossing New Horizons that displays
                    the avaliable fish and bug spawns depending on the time and date 
                    of your game. Not associated with Nintendo, a fanmade tool. 
                </h3>
                <h3 id="sc-h3">
                    Images and information provided by the <a href="https://animalcrossing.fandom.com/wiki/Animal_Crossing_Wiki">Animal Crossing Wiki</a> 
                </h3>
                <h4 id="sc-h4">
                    Created by <a href="https://github.com/Jamesrbrtsn">@Jamesrbrtsn</a>   Built with the <a href="https://reactjs.org/">React.js</a> framework
                </h4>
            </div>

        return (
            <div>
                <h1 id="sc-app-title">Seasonal Critters</h1>
                {header}
                <br></br>
                <div id="bottom-bottom">
                    {toggleButton}
                </div>
            </div>
        );
    }
}

export default Header;