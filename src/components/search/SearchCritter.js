import React from 'react';
import ResultList from './helpers/ResultList'
import SearchBar from './helpers/SearchBar'
import searchList from '../../data/searchList';
import SelectedCard from './helpers/SelectedCard';
import fishData from '../../data/fish.json';
import bugsData from '../../data/bugs.json';
import CritterTable from '../home/CritterTable';

class SearchCritter extends React.Component{
    
    state = { 
        results: [],
        directory: [],
        selected: null,
        match: true,
        critterTable: null
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

    changeSelection = (data, typePick='undeclared') => {
        // console.log(type);
        if(data!==null){data.type = typePick}
        // console.log("-.....");
        // console.log(data);
        this.setState({ selected: data});
    }

    tableToggle = (type) =>{
        this.setState({critterTable: type}, console.log(this.state.critterTable));
    }

    render(){

        let critterTable = (this.state.critterTable==='bug') ?
            <CritterTable 
            list={bugsData} 
            changeSelected={this.changeSelection}
            type='bug'/> : (this.state.critterTable==='fish') ?
                <CritterTable 
                    list={fishData} 
                    changeSelected={this.changeSelection}
                    type= 'fish'/> : <div></div>;

        let match = (this.state.match===false) ?
            <div> No Critter found matching that name... </div> 
            :<div></div>

        let typeOfSelected = 'null';
        if(this.state.selected!==null){
            typeOfSelected = this.state.selected.type;
        }   
        
        const selectionList = (typeOfSelected==='bug') ?
            bugsData : (typeOfSelected==='fish') ?
                fishData : [];

        let selected = (this.state.selected===null) ?
            <div></div> :
            <div>
                <SelectedCard data={this.state.selected}
                    changeSelected={this.changeSelection}
                    changeSelectedById={this.changeSelectedById}
                    list={selectionList}/>
            </div>

        return(
            <div>
                {selected}
                <h2>Search by Critter Table</h2>
                    <button onClick={() => this.tableToggle('bug')}>Bug</button>
                    <button onClick={() => this.tableToggle('fish')}>Fish</button>
                    <button onClick={() => this.tableToggle(null)}>X</button>`
                {critterTable}
                <h2>Search by Keyword, Id, or Type</h2>
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