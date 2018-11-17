import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'


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
      personService  //importattu personservice hakee tiedot palvelimelta
        .getAll()
        .then(response => {
          this.setState({persons:response})
          // const pers= response.data
          // console.log(pers)
        })
      }

      toggleVisible = () => {
      this.setState({showOne: !this.state.showOne})
    }
    // tapahtumankäsittelijä on submit napin lähetykseen
    addPerson = (event) => {
      event.preventDefault()
  
      const personObject = {
        name: this.state.newName, 
        num: this.state.newNum,
        important: Math.random() > 0.5, 
      }
     // Lähetetään olio palvelimelle käyttämällä axiosin metodia post.
      personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNum: '' //tyhjätään lomakkeen kentät
        })
      })
    }
      
    deletePerson = (id) => {
      return () => {
          const person = this.state.persons.find(n => n.id === id)
    
      if(window.confirm("Poistetaanko " +person.name+ "?")) {
        personService
          .deleteOne(id)
          .then(changedPerson => {
              const persons= this.state.persons.filter(n => n.id !== id)
              this.setState({
                persons: persons
                })
          })
          .catch(error => {          
                    alert(`henkilö '${person.name}' on jo  poistettu palvelimelta`)
                      this.setState({persons: this.state.persons.filter(n => n.id !== id) })
                      })
      }
    }
   
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
      const personsToDelete =
      this.state.showOne ?
      this.state.persons:
      this.state.persons.filter(person => person.important === true)  
        return (
        <div>
          <h2>Puhelinluettelo</h2>
  
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
          
          {personsToDelete.map(person =>
          <Person
          key={person.id}
          person={person}
          deletePerson={this.deletePerson(person.id)}
          />         
        )}   
        </div>
      )
    }
  }
  export default App