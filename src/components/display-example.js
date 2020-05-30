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
                <div id="example"> 
                    <img src={this.state.picturePathFish} alt=""/>
                    <h3 className="nameTitle">Name</h3>
                    <p>Sell Price</p>
                    <p>Location</p>
                    <p>Size (Fish)</p>
                    <p>Time Active</p>
                </div>
            )
        }
        else if (this.props.type==="bug"){
            return (
                <div id="example">
                    <img src={this.state.picturePathBug} alt=""/>
                    <h3 className="nameTitle">Name</h3>
                    <p>Sell Price</p>
                    <p>Location</p>
                    <p>Time Active</p>
                </div>
            )
        }
    }
}

export default DisplayExample;
