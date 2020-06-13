import React from 'react';
import DisplayExample from './display-example'

class Information extends React.Component{

    //card examples
    //fish sizes
    //tips
    
    render(){
        return(
            <div>
                <h2 className="sc-h2">About</h2>
                <div>
                    <p>
                        Fish Sizes
                    </p>
                    <p>
                        Hemisphere Check
                    </p>
                    <p>
                        Automatic Month Load on Load
                    </p>
                    <p>
                        Automatic Month Load on Load
                    </p>
                </div>
                <div id="sc-right-input">
                    <h2 id="sc-option-text" className="sc-h2">Card Layout</h2>
                    <div id="sc-ex-grid">
                        <DisplayExample type ="fish"/>
                        <DisplayExample type ="bug"/> 
                    </div> 
                    <br></br> 
                </div>
            </div>
        )
    }
}

export default Information;