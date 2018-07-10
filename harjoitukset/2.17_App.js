import React from 'react'
import Person from './components/Person'
import personService from './services/persons'
import Personf from './components/Personf'
import showOne from './components/showOne'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Notification2 from './components/Notification2'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      persons:[],
      personsf:props.persons,
      filt: props.filter,
      newName: 'Uusi nimi..',
      newNumber: 'Uusi numero..',
      showOne: props.showOne,
      showAll:'true',
      error: null,
      notification:null


    }
  }

  componentDidMount() {
personService
    .getAll()
    .then(response => {
      this.setState({persons:response})
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
      important: true,

  }

  if (this.state.persons.find(n => n.name === this.state.newName)){

    if(window.confirm(this.state.newName +" on jo luettelossa, korvataanko vanha numero uudella?")) {

    const samePerson= this.state.persons.find(person => person.name=== this.state.newName);

    console.log(samePerson.id)
      personService
        .update(samePerson.id, personObject)
        .then(newNumber=> {
            const persons= this.state.persons.filter(n => n.id !== samePerson.id)

          this.setState({
            persons: persons.concat(newNumber),
            newName: '',
            newNumber: '',
          notification: `Henkilön '${personObject.name}' uudennumeron:  '${personObject.num}' päivitys onnistui!`
          })
          setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
        })
      }
  }
else{
personService
  .create(personObject)
  .then(newName => {
    this.setState({
      persons: this.state.persons.concat(newName),
      newName: '',
      newNumber: '',
      notification: `lisättiin '${personObject.name}'`
      })
      setTimeout(() => {
        this.setState({notification: null})
      }, 5000)
  })
}
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
            persons: persons,
            notification: `henkilön '${person.name}' poisto palvelimelta onnistui`
            })
            setTimeout(() => {
              this.setState({notification: null})
            }, 5000)
      })
      .catch(error => {
        this.setState({
                    error: `henkilö '${person.name}' on jo valitettavasti poistettu palvelimelta`,
                    persons: this.state.persons.filter(n => n.id !== id)
                  })
                  setTimeout(() => {
                    this.setState({error: null})
                  }, 5000)
                })
            }
  }
}

updateNumber = (id) => {
  return () => {
      const person = this.state.persons.find(n => n.id === id)

      const changedPerson = { ...person, important: !person.important }

if(window.confirm(person.name+ "on jo luettelossa, korvataanko vanha numero uudella?")) {
    personService
      .update(person.id, changedPerson)
      .then(changedPerson => {
          const persons= this.state.persons.filter(n => n.id !== id)
          this.setState({
            persons: persons
        })
      })
      .catch(error => {
    alert(`muistiinpano '${person.name}' on jo valitettavasti poistettu palvelimelta`)
    this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
})
  }
}
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
         this.setState({ filt: event.target.value })
       }



  render() {
    const personsToDelete =
          this.state.showAll ?
          this.state.persons :
          this.state.persons.filter(person => person.important === true)

    return (
      <div>
          <h2>Puhelinluettelo</h2>

          <div>
            rajaa näytettäviä:
            <input value={this.state.filt}
            onChange={this.handleFilterChange}/>
          </div>


          <form onSubmit={this.addPerson}>
          <div>
            <h2>Lisää uusi / muuta olemassaolevaa numeroa</h2>
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
    <Notification message={this.state.error}/>
    <Notification2 message={this.state.notification}/>

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
