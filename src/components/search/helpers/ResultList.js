import React from 'react';
import ResultCard from './ResultCard';

class ResultList extends React.Component {

    //props
    //--fish data
    //--bug data
    //results

    selectResult = (data,type) => { //Use Solution #2
        // console.log("LIST");
        // console.log(type);
        this.props.changeSelected(data,type);
    }
    
    render(){
        const results = this.props.results.map((result) => {
            let [identifier, type] = result.split(':').slice(1, 4);
            let uId = [identifier, type].join('');

        const bugList = this.props.bugsData;
        const fishList = this.props.fishData;
    
            return ((result[result.length-1] ==='b') ? 
                <ResultCard key={uId} 
                    selectionFunction={this.selectResult}
                    data={bugList[identifier-1]} 
                    type='bug' />
                : 
                <ResultCard key={uId} 
                    selectionFunction={this.selectResult}
                    data={fishList[identifier-1]} 
                    type='fish'/>
            )
        });

        return (
            <div className="result-list">
                {results}
            </div>
        );
    };
  
};

export default ResultList;