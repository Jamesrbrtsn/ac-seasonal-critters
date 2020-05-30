import React from 'react'

export default function IntroBlock(props){
    return (
        <div>
            <h1>Seasonal Critters</h1>
            <div className="top-info">
                <h3>
                    A tracking tool for Animal Crossing New Horizons that displays
                    the avaliable fish and bug spawns depending on the time and date 
                    of your game. Not associated with Nintendo, a fanmade tool. 
                </h3>
                <h3>
                    Images and information provided by the <a href="https://animalcrossing.fandom.com/wiki/Animal_Crossing_Wiki">Animal Crossing Wiki</a> 
                </h3>
                <h4>
                    Created by <a href="https://github.com/Jamesrbrtsn">@Jamesrbrtsn</a>   Built with the <a href="https://reactjs.org/">React.js</a> framework
                </h4>
            </div>
        </div>
    ) 
}