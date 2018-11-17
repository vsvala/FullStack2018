import React from 'react';
import ReactDOM from 'react-dom';

  const Person = ({ person }) => {
    return (
      <li>{person.name}</li>
    )
  }
  
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName, 
      id: this.state.persons.length + 1
    }

    // luo uuden taulukon, joka sisältää myös lisättävän alkion
    const persons = this.state.persons.concat(personObject)
    // komponentin tila päivitetään uusilla nimillä ja tyhjentämällä syötekomponentin arvoa kontrolloiva kenttä:
    this.setState({
    persons,
    newName: ''
    })
    }

    // Tapahtumankäsittelijää kutsutaan aina kun syötekomponentissa tapahtuu jotain. 
  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
            value ={this.state.newName}
            onChange={this.handlePersonChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.id} person={person} />)}
        </ul>

      </div>
    )
  }
}

// ReactDOM.render(
//     <App persons={persons} />,
//     document.getElementById('root')
//   )
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )