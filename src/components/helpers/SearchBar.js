import React from 'react';

class SearchBar extends React.Component {

    state = { term: '' };

    onFormSubmit = event => { 
        event.preventDefault();
        this.props.search(this.state.term.toLowerCase());
    }

    render() {

        const placeholder = (this.props.placeholder!==undefined) ?
            this.props.placeholder : "";
        const title = (this.props.title!==undefined) ?
            this.props.title : "Search";

        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="ui field">
                        <label>{title}</label>
                        <input
                            type="text"
                            value={this.state.term}
                            placeholder={placeholder}
                            onChange={(e) => this.setState({ term: e.target.value })}
                        />
                    </div>
                </form>
            </div>
        );
    };
}

export default SearchBar;