import React from 'react';
import ResultCard from './ResultCard';

class ResultList extends React.Component {

    render(){
        const resultCards = this.props.results.map((result) => {
            return <ResultCard key={`${result.id}:${result.name.toLowerCase().replace(" ","")}`} 
                    selectionFunction={this.props.changeSelected}
                    data={result} />
        });

        return (
            <div className="result-list">
                {resultCards}
            </div>
        );
    };
  
};

export default ResultList;