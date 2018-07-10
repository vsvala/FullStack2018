import React from 'react'
import Person from './components/Person'
import personService from './services/persons'
import showOne from './components/showOne'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Notification2 from './components/Notification2'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      persons:[],
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
      num: this.state.newNumber
  }

  if (this.includesPerson()){
   const person = this.findPerson();

    if(window.confirm(person.name +" on jo luettelossa, korvataanko vanha numero uudellaa?")) {
      personService
                     .update(person.id, personObject)
                     .then(response => {
                         this.setState({
                             persons: this.state.persons.map(p => p.id !== person.id ? p : personObject),
                             newName: '',
                             newNumber: '',
                             notification: `Henkilön '${personObject.name}' uudennumeron:  '${personObject.num}' päivitys onnistui!`
          })

          setTimeout(() => {
            this.setState({notification: null})
          }, 5000)
        })
        .catch(error => {
          this.setState({
                      error: `henkilö '${personObject.name}' on jo valitettavasti poistettu palvelimelta`,
                      persons: this.state.persons.filter(n => n.id !==person.id)
                    })
                    setTimeout(() => {
                      this.setState({error: null})
                    }, 5000)
                  })
  }
    }
else{
personService
  .create(personObject)
  .then(response => {
    this.setState({
      persons: this.state.persons.concat(response),
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

includesPerson = () => {

      const personel = this.state.persons.map(person => person.name.toLowerCase());

      if (personel.includes(this.state.newName.toLowerCase())) {
          return true;
      } else {
          return false;
      }
  }

  findPerson = () => {
      let p = this.state.persons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())

      if (p) {
          return p;
      } else {
          return false;
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
                    error: `henkilö '${person.name}' on jo  poistettu palvelimelta`,
                    persons: this.state.persons.filter(n => n.id !== id)
                  })
                  setTimeout(() => {
                    this.setState({error: null})
                  }, 5000)
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
