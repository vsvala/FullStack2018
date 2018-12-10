import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Notification from './components/Notification'
import { NavLink } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'


const menuStyle = {
  FontColor: 'green',
  fontStyle: 'italic',
  fontSize: 16,

  background: 'black',
  padding: 20
}
const navLinkStyle = {
  color: 'white',
  fontStyle: 'italic',
  fontSize: 18,
  padding: 10,
  textDecoration: 'none',
}

const Menu = () => (
  <div style ={menuStyle}>
    <NavLink style={navLinkStyle} activeStyle={{textDecoration: 'none', color: 'pink'}} exact to="/" >
    anecdotes</NavLink> &nbsp;
    <NavLink style={navLinkStyle}  activeStyle={{textDecoration: 'none', color: 'pink'}} exact to="/about">about</NavLink> &nbsp;
    <NavLink style={navLinkStyle}  activeStyle={{textDecoration: 'none', color: 'pink'}} exact to="/new">create new</NavLink>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>  
  
    <Table striped>
     <tbody>
      {anecdotes.map(anecdote => 
     <tr key={anecdote.id} >
     <td>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </td>
      </tr>
      )}  </tbody>
    </Table> 
  
  </div>
)

const Anecdote = ({ anecdote: { content, votes, info, author } }) => 
(
  <div>
    <h2>{ content} by {author}</h2>
    <p>has {votes} votes</p> 
    <p>for more info see  {info}</p>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
<div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
 
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
         <FormGroup>
          <div>
          <ControlLabel> content </ControlLabel>
          <FormControl input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
          <ControlLabel> author</ControlLabel>
          <FormControl input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
          <ControlLabel>  url for more info</ControlLabel>
          <FormControl input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>  
    )

  }
}


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote),
    notification: `a new anecdote '${anecdote.content}'created`})
    
      setTimeout(() => {
        this.setState({notification: null})
      }, 10000)

    //history.push('/')
  }

 anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    return (
    
        <div className="container">
        <h1>Software anecdotes</h1>
        <Notification message={this.state.notification}/>
        <Router>
        <div>
           <Menu />
            
           <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes}/>}/> 
           <Route path="/about" render={() => <About />} />
           <Route path="/new" render={({history}) => <CreateNew  history={history} addNew={this.addNew}/>} />
           <Route exact path="/anecdotes/:id" render={({match}) =>
           <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
           />     
      </div> 
      </Router>
      <br></br>
      <Footer />

    </div> 
    ); 
  }
}

export default App;
