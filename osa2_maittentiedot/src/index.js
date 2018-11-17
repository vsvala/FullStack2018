import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import ShowCountries from './components/ShowCountries'


const Country = ({ country }) => {
  return (
    <li>{country.name} {country.capital}</li>
  )}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
    }
  }
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
        console.log(this.state.countries[0])
      })
    }
  
  
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
      return (
      <div>

        <div>
            Find countries: <input 
            value={this.state.filter}
            onChange={this.handleFilterChange}/>
          
        </div>

        
        <h2>Maat</h2>
        
       {/* <ul>
       {countriesToShow.map(country => <Country key={country.name} coyntry={country} />)}
       </ul>   */}
       <ShowCountries 
       countries={this.state.countries}
       filter={this.state.filter}
        />

      </div>
    )
  }
}

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )