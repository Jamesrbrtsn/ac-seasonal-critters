import React from 'react'

function MonthCritterTable(props){


    //changeSelected={this.changeSelection}
    //changeSelectedById={this.changeSelectedById}
    function changeSelection(data, type){
        props.changeSelected(data, type);
    }   
    
    const firstLetter =  props.type.substr(0,1);
    let type = (firstLetter==='b') ? 'bug': 'fish';
    const title = (firstLetter.toUpperCase()).concat(props.type.substr(1));
    const critterList = props.list;
    const valids = props.valid.map((obj)=>{
        return ((obj.id));
    });
    console.log(valids);

    const unselectedStyling = {
        textAlign: 'center',
        display: 'inline-block',
    }

    const selectedStyling = {
        textAlign: 'center',
        display: 'inline-block',
        backgroundColor: 'rgb(255, 157, 157)',
    }

    const buttons = [...Array(80).keys()].map((num) => {
        return(
            <button 
                onClick={()=>changeSelection(critterList[num],type)}
                style={(valids.includes(critterList[num].id)) ?
                    selectedStyling : unselectedStyling }
                id={`critter-btn-${num}-${firstLetter}`}
                key={`${num}${firstLetter}`}>
                <img alt={`icon for ${critterList[num].name}`}
                    src={critterList[ num].picturePath}
                    style={{
                        width: '100%',
                        alignContent: 'center'
                    }}
                >
                </img>
            </button>
        );
    });
    
    return (

        <div>
            <h2>{title} MonthCritterTable </h2>
            <div style={{
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
                    gridAutoFlow: 'column'
                }}
            >
                {buttons}
            </div>
        </div>
    )
}

export default MonthCritterTable;