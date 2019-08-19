import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

//components
import Home from './components/Home'
import BlogList from './components/blog/BlogList'
import UserList from './components/user/UserList'
import SingleBlog from './components/blog/SingleBlog'
import SingleUser from './components/user/SingleUser'
import Notification from './components/common/Notification'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/login/RegisterForm'

//Actions
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout, initLoggedUser } from './reducers/loginReducer'
import { notify } from './reducers/notificationReducer'



const menuStyle = {
  FontColor: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  background: 'black',
  padding: 20
}


class App extends React.Component {

  // lifecycle-metodi, jota React-kutsuu heti komponentin ensimmäisen renderöinnin jälkeen
  componentDidMount() {
    this.props.initializeBlogs() //get all blog
    this.props.initializeUsers() //get all users
    this.props.initLoggedUser()
  }

  loginMessage = (user) => {
    this.props.notify(`welcome ${user}`, 5) // }
  }

  render() {
    // POISTA TÄMÄ
    // if (!this.props.blogs.length) {
    //   return null
    // }
    // console.log('this.props', this.props)

    //Etsii yksittäisenblogin storesta klikatun blogin id:n perusteella
    const blogById = (id) => {// console.log(id, 'iiiiiiiiiiiiiiiiiiiiiiiiiiiidddddddddddddddddddddddddddddd') // console.log(this.props.blogs, 'propscourses')
      return (
        this.props.blogs.find(blog => blog.id === (id))
      )
    }
    const userById = (id) => {
      return (
        this.props.users.find(user => user.id === (id))
      )
    }


    return (
      <div>
        <Router>
          <div>
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">*/}

            <Navbar inverse collapseOnSelect>

              <div style={menuStyle}>
                <Navbar.Collapse>
              
                    <Navbar.Brand > <h2>Blog application</h2></Navbar.Brand>
                    <Nav className="menuContainer">
                      {/* <Menu /> */}

                      <NavItem href="#">
                        <Link to="/">home</Link> &nbsp;

                        <Link to="/blogs">blogs</Link> &nbsp;

                        {/*vain test niminen käyttäjä pääsee tarkastelemaan käyttäjälistausta..() name tilalla rooli user.role ===admin) */}
                        {this.props.user && this.props.user.name === 'test'
                          ? <Link to="/users">users</Link>
                          : ''}


                        {this.props.user
                          ? <em></em>
                          : <Link to="/register">register</Link>} &nbsp;


                        {/* jos kirjautunut näyttää logout linkin muutoin login linkin */}
                        {this.props.user
                          ? <em>{this.props.user.name} logged in <input onClick={this.props.logout} type="button" value="logout" /> &nbsp; {console.log('thispropslname', this.props.user.username)}</em>
                          : <Link to="/login">login {console.log('uuuuuuuu', this.props.user)}</Link>}
                      </NavItem>


                      {/* <p>{props.user.name} logged in <button type="button" onClick={logout}>logout</button> </p> */}
                    </Nav>
                
                </Navbar.Collapse>
              </div>
            </Navbar>


            <div className="container">

              {/* <h1>Blog application</h1> */}
              <Notification />

              {/* Works like a typical switch statement; it checks for matches and runs the first thing matching the requested path */}
              <Switch>

                <Route exact path="/" render={() => <Home />} />
                {/* <Route  exact path="/blogs" render={() => <Bloglist />} /> poisto vaatii loggautuneen*/}
                <Route exact path="/blogs" render={() =>
                  this.props.user
                    ? <BlogList />
                    : <Redirect to="/login" />} />


                <Route exact path='/blogs/:id' render={({ history, match }) =>
                  <SingleBlog history={history} blog={blogById(match.params.id)} />} />


                <Route exact path="/users" render={() =>
                  this.props.user && this.props.user.name === 'test'
                    ? <UserList />
                    : <Redirect to="/login" />} />

                <Route path="/register" render={({ history }) => <RegisterForm history={history} />} />


                <Route exact path='/users/:id' render={({ history, match }) =>
                  this.props.user && this.props.user.name === 'test'
                    ? <SingleUser history={history} klickedUser={userById(match.params.id)} />
                    : <Redirect to="/login" />} />


                {/* <Route path="/logout" render={() =>
                this.props.user
                  ? this.props.logout()
                  : <Redirect to="/login" />} /> */}

                <Route path="/login" render={({ history }) =>
                  <LoginForm history={history} />} />
                {/*    <Route exact path="/login" render={() => <LoginForm />} />
          // Kirjautumisen yhteydessä funktiossa onSubmit kutsutaan history-olion metodia push. Käytetty komento history.push('/') saa aikaan sen,
          //     että selaimen osoiteriville tulee osoitteeksi / ja sovellus renderöi osoitetta vastaavan komponentin Home.
          huomautus..vatii login to see more...
          */}
              </Switch>
            </div> </div>
        </Router>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'allstate')
  return {
    blogs: state.blogs,
    user: state.loggedUser,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { initializeBlogs, initializeUsers, logout, initLoggedUser, notify }
)(App)