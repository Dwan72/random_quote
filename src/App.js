import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['#194D33', '#006B76', '#FCCB00', '#D0021B'],
      bgColor: '#194D33',
      pageQuote: ''
    }
    this.changeBgColor = this.changeBgColor.bind(this);
  };
//heelo world
  componentDidMount() {
    axios.get('https://www.breakingbadapi.com/api/quote/random')
    .then(response => {
      let getQuote = response.data[0].quote;
      console.log(getQuote);
      this.setState(() => ({pageQuote: getQuote}));
    })
    .catch(error => {
      console.log(error)
    })

  }
  componentDidUpdate(prevProps) {
    if (this.props.bgColor !== prevProps.bgColor) {

      axios.get('https://www.breakingbadapi.com/api/quote/random')
      .then(response => {
        let getQuote = response.data[0].quote;
        console.log(getQuote);
        this.setState(() => ({pageQuote: getQuote}));
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
        style = {{backgroundColor: this.state.bgColor}}
      >
        <h1>Hello World</h1>
        <button onClick = {this.changeBgColor}>change color!</button>
        <p>{this.state.pageQuote}</p>
      </div>
    );
  }

}

export default App;


// load the request so that I get 100 quotes, then store this in an array, so that hitting the button doesn't consume an API call which is expensive. 
// A reload should trigger this request, so do the call in componentDidMount, then once again for each component update. 
//component should be updated by the change in bgColor, a prop of the App component. 
