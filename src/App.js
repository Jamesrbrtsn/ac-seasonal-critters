import React from 'react';
import './App.css';
import NavigationBlock from './components/NavigationBlock';
import Header from './components/Header';


class App extends React.Component{

  state={
    header:true,
    buttonText: 'hide'
  }

  toggleHeader = () => {
    let value = this.state.header;
    let text = (this.state.buttonText==='hide') ?
      'show' : 'hide';
    this.setState({header: !value, buttonText: text});

  }
  
  render(){

    let header = (this.state.header===true) ?
      <Header />: <div></div>

    return (
      <div id="seasonal-critters">
        <h1 id="sc-h1">Seasonal Critters</h1>
        <button 
          id="intro-toggle" 
          onClick={()=>this.toggleHeader()}
          style={{
            position:'absolute',
            top:'3em',
            right:'5em'
          }}
        >{this.state.buttonText}</button>
        {header}
        <br></br>
        <NavigationBlock/>
      </div>
    );
  }
}

export default App;
