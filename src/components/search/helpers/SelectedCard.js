import React from 'react';
import BugCard from '../../home/Bug';
import FishCard from '../../home/Fish';

const SelectedCard = props => {

    let data = props.data;
    let previousId = data.id-2, nextId = data.id;
    if(previousId<0){previousId=79}
    else if(nextId>79){nextId=0}

    let card = (data.type==='fish') ?
        <FishCard {...data}/> :
        <BugCard {...data}/>;

    const monthDisplay = (type) => {
        let months = [];
        months = (type==='north') ? data.months[0] : data.months[1];
        let allYearFlag = false;
        if(months[0]===-3){allYearFlag=true}
        let display = 
        ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'].map((mth, ind)=>{
            return <div key={`div-month-display-${mth}`} 
                id="div-month-display"
                style={(months.includes(ind+1)===true||allYearFlag) ? 
                    {backgroundColor: 'rgb(255, 157, 157)',
                    textAlign: 'center',
                    border: '1px solid'} : 
                    {backgroundColor: 'rgb(255, 233, 233)',
                    textAlign: 'center',
                    border: '1px solid'}
                }
                >
                {mth}
            </div>
        });
        return display;
    }

    return(
        <div>
            <div id={`selected-${data.type}`}>
                <img alt={`preview of previous ${data.type}`}
                    style={{float: 'left',
                    display: 'inline-block',
                    position: 'center',
                    filter: 'grayscale(100%) brightness(0)',
                    width: '15%'}}
                    src={props.list[previousId].picturePath} />
                <img alt={`preview of next ${data.type}`}
                    style={{float: 'right',
                    display: 'inline-block',
                    position: 'center',
                    filter: 'grayscale(100%) brightness(0)',
                    width: '15%'}}
                    src={props.list[nextId].picturePath} />
                {card}
                <br></br>
                <button onClick={()=>props.changeSelectedById(data.id-1,data.type)}>
                    {`previous ${data.type}`}
                </button>
                <button onClick={()=>props.changeSelected(null)}>
                    Deselect
                </button>
                <button onClick={()=>props.changeSelectedById(data.id+1, data.type)}>
                    {`next ${data.type}`}
                </button>
                <br></br>
                <p> 
                    ID: {data.id}
                </p>
            </div>
            <div id="selected-month-view">
                <h3>Northern Hemisphere</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gridAutoFlow: 'row'
                }}>
                    {monthDisplay('north')}
                </div>
                <h3>Southern Hemisphere</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gridAutoFlow: 'row'
                }}>
                    {monthDisplay('south')}
                </div>
            </div>
        </div>
    );
}

export default SelectedCard;