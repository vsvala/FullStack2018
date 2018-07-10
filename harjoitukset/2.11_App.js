import React from 'react'
import Person from './components/Person'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      persons:[],
      filter: props.filter,
      newName: 'Uusi nimi..',
      newNumber: 'Uusi numero..',
      showOne: props.showOne

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
      num: this.state.newNumber,
      important: Math.random() > 0.5,
      id: this.state.persons.length + 1
  }

  const persons = this.state.persons.concat(personObject)
  this.setState({
    persons,
    newName: '',
    newNumber: ''
  })
  }

    handlePersonChange = (event) => {
       console.log(event.target.value)
       this.setState({ newName: event.target.value })
     }

     handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
      }

      handleFilterChange = (event) => {
         console.log(event.target.value)
         this.setState({ filter: event.target.value })
       }



  render() {
    const personsToShow =
       this.state.showOne ?
       this.state.persons.filter(person => person.name.toUpperCase().startsWith( this.state.filter.toUpperCase())) :
       this.state.persons.filter(person => person.name.toUpperCase().this.state.filter.toUpperCase())


    return (
      <div>
          <h2>Puhelinluettelo</h2>

          <div>
            rajaa näytettäviä:
            <input value={this.state.filter}
            onChange={this.handleFilterChange}/>
          </div>


          <form onSubmit={this.addPerson}>

          <div>
            <h2>Lisää uusi</h2>
            nimi:<input
            value ={this.state.newName}
            onChange={this.handlePersonChange}/>
          </div>

          <div>
          numero:
          <input value ={this.state.newNumber}
          onChange={this.handleNumberChange}/>
          </div>

          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h2>Numerot</h2>

        <p>haettu nimi:</p>
       <ul>
       {personsToShow.map(person => <Person key={person.name} person={person} />)}
       </ul>

      <p>kaikki:</p>
       <ul>
      {this.state.persons.map(person => <Person key={person.name} person={person} />)}
      </ul>


      </div>
    )
  }
}

export default App
