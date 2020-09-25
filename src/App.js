import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#194D33', '#006B76', '#FCCB00', '#D0021B'],
      bgColor: '#194D33',
      pageQuote: '',
      quoter: ''
    }
    this.changeBgColor = this.changeBgColor.bind(this);
  };
//heelo world
  componentDidMount() {
    axios.get('https://www.breakingbadapi.com/api/quote/random')
    .then(response => {
      let getQuote = response.data[0].quote;
      let getQuoter = response.data[0].author;
      getQuoter = "- " + getQuoter;

      this.setState(() => ({pageQuote: getQuote}));
      this.setState(() => ({quoter: getQuoter}));
    })
    .catch(error => {
      console.log(error)
    })

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.bgColor !== prevState.bgColor) {

      axios.get('https://www.breakingbadapi.com/api/quote/random')
      .then(response => {
        let getQuote = response.data[0].quote;
        let getQuoter = response.data[0].author;
        getQuoter = "- " + getQuoter;

        console.log(getQuoter);
        this.setState(() => ({pageQuote: getQuote, quoter: getQuoter}));
      })
      .catch(error => {
        console.log(error)
      })

     }
  }

  changeBgColor() {
    let colorLength = this.state.colors.length;
    let colorIndex = this.state.colors.indexOf(this.state.bgColor);

    if (colorIndex >= colorLength - 1) {
      this.setState((state) => ({bgColor: state.colors[0]}))
    }
    else {
      this.setState((state) => ({bgColor: state.colors[colorIndex + 1]}))
    }
  }

  render() {


    return (
      <div className = "backdrop"
        style = {{
          backgroundColor: this.state.bgColor
          
        
        }}

      >

        <div className = "card">
          <h1 style = {{color: this.state.bgColor}}>{this.state.pageQuote}</h1>

            <div className = "buttonQuote">
              <button onClick = {this.changeBgColor}>New Quote</button>
              <p style = {{color: this.state.bgColor}}>{this.state.quoter}</p>
            </div>
        </div>

      </div>
    );
  }

}

export default App;


// load the request so that I get 100 quotes, then store this in an array, so that hitting the button doesn't consume an API call which is expensive. 
// A reload should trigger this request, so do the call in componentDidMount, then once again for each component update. 
//component should be updated by the change in bgColor, a prop of the App component. 
