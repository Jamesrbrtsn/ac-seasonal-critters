import React from 'react'

export class DisplayExample extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            picturePathFish : "https://vignette.wikia.nocookie.net/animalcrossing/images/a/a0/NH-Icon-saddledbichir.png",
            picturePathBug : "https://vignette.wikia.nocookie.net/animalcrossing/images/5/5b/NH-Icon-goliathbeetle.png"
        };
    }
    render(){
        if(this.props.type==="fish"){
            return (
                <div>
                    <div id="sc-example"> 
                        <img id="sc-img" src={this.state.picturePathFish} alt=""/>
                        <h3 className="sc-nameTitle" id="sc-h3">Name</h3>
                        <p id="sc-p">Sell Price</p>
                        <p id="sc-p">Location</p>
                        <p id="sc-p">Size (Fish)</p>
                        <p id="sc-p">Time Active</p>
                    </div>
                </div>
            )
        }
        else if (this.props.type==="bug"){
            return (
                <div>
                    <div id="sc-example">
                        <img id="sc-img" src={this.state.picturePathBug} alt=""/>
                        <h3 className="sc-nameTitle" id="sc-h3">Name</h3>
                        <p id="sc-p">Sell Price</p>
                        <p id="sc-p">Location</p>
                        <p id="sc-p">Time Active</p>
                    </div>
                </div>
            )
        }
    }
}

export default DisplayExample;
