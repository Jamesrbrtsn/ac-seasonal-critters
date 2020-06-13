import React from 'react';

class SearchBar extends React.Component {

    state = { term: '' };

    onFormSubmit = event => { //Use Solution #2
        event.preventDefault();
        this.props.search(this.state.term.toLowerCase());
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="ui field">
                        <label>Critter Search</label>
                        <input
                            type="text"
                            value={this.state.term}
                            placeholder="Search"
                            onChange={(e) => this.setState({ term: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    };
}

export default SearchBar;