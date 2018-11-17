import React from 'react';
import ReactDOM from 'react-dom';
import Person from './components/Person'
import Filter from './components/Filter'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filter: '',
      showOne:true
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
    }
  
  toggleVisible = () => {
    this.setState({showOne: !this.state.showOne})
  }

  addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: this.state.newName, 
      num: this.state.newNum,
      important: Math.random() > 0.5,
      id: this.state.persons.length + 1 
    }
    let found = this.state.persons.find(person => person.name === this.state.newName)
    if (!found) {
     const persons = this.state.persons.concat(personObject)
    // luo uuden taulukon, joka sisältää myös lisättävän alkion
    
    // komponentin tila päivitetään uusilla nimillä ja tyhjentämällä syötekomponentin arvoa kontrolloiva kenttä:
    this.setState({
    persons,
    newName: '',
    newNum: ''
    })
    }
    else {alert("samanniminen henkilö on jo puhelinluettelossa!!");}
    }
    // Tapahtumankäsittelijää kutsutaan aina kun syötekomponentissa tapahtuu jotain. 
  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNum: event.target.value })
  }
  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {
    const personsToShow =
    this.state.showOne ?
    this.state.persons.filter(person => person.name.toUpperCase().startsWith( this.state.filter.toUpperCase())) :
    this.state.persons.filter(person => person.name.toUpperCase().startsWith(this.state.filter.toUpperCase()))

      return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter 
          filter={this.state.filter} 
          handleFilterChange={this.handleFilterChange}
          />

        <form onSubmit={this.addPerson}>
          <div>
          <h2>Lisää uusi</h2>
            nimi: <input 
            value ={this.state.newName}
            onChange={this.handlePersonChange}/>
          </div>
          <div>
            numero: <input 
            value ={this.state.newNum}
            onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        
       <ul>
       {personsToShow.map(person => <Person key={person.name} person={person} />)}
       </ul>


      </div>
    )
  }
}

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )