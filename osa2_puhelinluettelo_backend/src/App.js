import React from 'react';
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'
import Notification2 from './components/Notification2'


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newName: '',
        newNum: '',
        filter: '',
        showOne:true,
        error: null,
        notification:null
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
                   newNum: '',
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
              // poistetaan olematon muistiinpano
            })
            setTimeout(() => {
              this.setState({error: null})
            }, 5000)
          })
}
}
else{
     // Lähetetään olio palvelimelle käyttämällä axiosin metodia post.
      personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNum: '', //tyhjätään lomakkeen kentät
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