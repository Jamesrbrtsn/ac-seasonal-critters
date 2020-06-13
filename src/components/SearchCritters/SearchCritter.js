import React from 'react';
import ResultList from './helpers/ResultList'
import SearchBar from './helpers/SearchBar'
import searchList from '../../data/searchList';
import SelectedCard from './helpers/SelectedCard';
import fishData from '../../data/fish.json';
import bugsData from '../../data/bugs.json';

class SearchCritter extends React.Component{
    
    state = { 
        results: [],
        directory: [],
        selected: null,
        match: true
    };

    componentDidMount(){
        this.setState({directory: searchList});
    }

    onSearchSubmit = (term) =>{
        if(term.length===0){
            this.setState({
                match: true,
                results: []
            });
            return;
        }
        let temp = [...this.state.directory];
        let filtered = [];
        for(let str of temp){
            if(str.startsWith(term)){ filtered.unshift(str); }
            else if(str.includes(term)===true){
                filtered.push(str);
            }
        } 

        (filtered.length > 0) ?
            this.setState({ match: true}):
            this.setState({ match: false});

        this.setState({
            results: filtered
        });
        // console.log(filtered);
    }

    changeSelectedById = (id, type) => {
        let data;
        if(id===0){id=80}
        else if(id===81){id=1}
        (type==='bug') ?
            data = bugsData[id-1] :
            data = fishData[id-1];
        data.type=type;
        this.setState({selected:data});
    }

    changeSelection = (data, type='undeclared') => {
        // console.log(type);
        if(data!==null){data.type = type;}
        // console.log("-.....");
        // console.log(data);
        this.setState({ selected: data});
    }

    render(){

        let match = (this.state.match===false) ?
            <div> No Critter found matching that name... </div> 
            :<div></div>

        let selected = (this.state.selected===null) ?
            <div></div> :
            <SelectedCard data={this.state.selected}
                changeSelected={this.changeSelection}
                changeSelectedById={this.changeSelectedById}
                />

        return(
            <div>
                {selected}
                <SearchBar search={this.onSearchSubmit}/>
                {match}
                <ResultList 
                    fishData = {fishData}
                    bugsData = {bugsData}
                    results={this.state.results}
                    changeSelected={this.changeSelection} /> 
            </div>
        )
    }
}

export default SearchCritter;