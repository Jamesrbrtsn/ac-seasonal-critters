import React from 'react';
import SearchBar from '../helpers/SearchBar';
import searchList from '../../data/searchList';
import CritterTable from '../helpers/CritterTable';
import SelectedCard from '../helpers/SelectedCard';
import ResultList from '../helpers/ResultList';

class Search extends React.Component{

    state = { 
        directory: searchList,
        fish: this.props.fish,
        bugs: this.props.bugs,
        results: [],
        selected: null,
        match: true,
        critterTable: null,
    };

    onSearchSubmit = (term) =>{
        if(term.length===0){
            this.setState({
                match: true,
                results: []
            });
            return;
        }

        let temp = [...this.state.directory];
        let identifier = "";
        let filtered = [];
        let bugs = this.state.bugs;
        let fish = this.state.fish;
        let match = {};

        for(let str of temp){
            if(str.startsWith(term)){ 
                [identifier] = str.split(':').slice(1, 2);
                if(str[str.length-1] ==='b'){
                    match = bugs[identifier-1];
                    match.type = 'bug';
                    filtered.unshift(match);
                } 
                else{
                    match = fish[identifier-1];
                    match.type = 'fish';
                    filtered.unshift(match);
                }
            }
            else if(str.includes(term)===true){
                [identifier] = str.split(':').slice(1, 2);
                if(str[str.length-1] ==='b'){
                    match  = bugs[identifier-1];
                    match.type ='bug';
                    filtered.push(match);
                } 
                else{
                    match = fish[identifier-1];
                    match.type = 'fish';
                    filtered.push(match);
                }
            }
        } 

        (filtered.length > 0) ?
            this.setState({ match: true}):
            this.setState({ match: false});     

        this.setState({
            results: filtered
        });
    }

    fixId = (id) => {
        if(id===-1){return 79}
        else if(id===80){return 0}
        else{ return id}
    }

    changeSelection = (data, typePick='undeclared') => {
        if(data!==null){data.type = typePick}
        this.setState({ selected: data});
    }

    tableToggle = (type) =>{
        this.setState({critterTable: type});
    }

    displayTable = (type) => {
        if(type===null){ return <div></div> }
        else if(type==='bug'){
            return <CritterTable 
                list={this.state.bugs} 
                changeSelected={this.changeSelection}
                type='bug'/>
        }
        else if(type==='fish'){
            return <CritterTable 
                list={this.state.fish} 
                changeSelected={this.changeSelection}
                type= 'fish'/>
        }
    }

    displaySelected = () => {
        let obj = this.state.selected;
        if (obj===null){return <div></div>}
        else{
            let id = obj.id;
            const [previous, next] = (obj.type==='fish') 
                ? [this.state.fish[this.fixId(id-2)], this.state.fish[this.fixId(id)]] //[prev fish, next fish] 
                : [this.state.bugs[this.fixId(id-2)], this.state.bugs[this.fixId(id)]]; //[prev bug, next bug]

            console.log(this.state.selected);
            return <SelectedCard data={this.state.selected}
                previous={previous}
                next={next}
                changeSelected={this.changeSelection}/>
        }
    }

    render(){

        let match = (this.state.match===false) ?
            <div> No Critter found matching that name... </div> 
            :<div></div>;

        let selected = this.displaySelected();
        let critterTable = this.displayTable(this.state.critterTable);
        
        return (
            <div>
                {selected}

                <h2>Search by Critter Table</h2>
                    <button onClick={() => this.tableToggle('bug')}>Bug</button>
                    <button onClick={() => this.tableToggle('fish')}>Fish</button>
                    <button onClick={() => this.tableToggle(null)}>X</button>`
                {critterTable}

                <SearchBar search={this.onSearchSubmit}
                    placeholder="Name, id, type"
                    title="Search by Term"/>
                <ResultList 
                    results={this.state.results}
                    changeSelected={this.changeSelection} /> 
                {match}
            </div>
        );
    }
}

export default Search;