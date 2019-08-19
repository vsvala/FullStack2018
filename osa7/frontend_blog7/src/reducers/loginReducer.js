import loginService from '../services/login'
import blogService from '../services/blogs'


const loginReducer = (store = null, action) => {
  console.log('ACTION:', action)

  switch (action.type) {

  case 'INIT_USER': {
    return {
      ...store,
      loggedUser: action.data
    }
  }
  case 'LOGGED':
    return action.response

  case 'LOGOUT':
    store = null
    return store

  default:
    return store
  }
}

//ACTION CREATORIT

// tarkistetaan löytyykö local storagesta tiedot kirjautuneesta käyttäjästä
//Jos löytyy, asetetaan ne sovelluksen storeen ja blogServicelle.
export const initLoggedUser = () => {
  return async (dispatch) => {
    let loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    if (loggedUser) {
      //let token = loggedUser.token
      // const response = await tokenCheckService.userCheck(token)
      // if (response.message === 'success') {
      await blogService.setToken(loggedUser.token)
      console.log(loggedUser,'userlöytyi localstoresta')
      dispatch({
        type: 'INIT_USER',
        data: loggedUser
      })
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const response = await loginService.login({
      username:username,
      password:password
    })
    if (response.error) {
      console.log('login went wrong')
      console.log(response,'login REDUCER response from back')
      dispatch({
        type: 'NOTIFY',
        message:'Username or password is missing!'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 2000)

    } else {
      blogService.setToken(response.token)
      dispatch({
        type: 'LOGGED',
        response
      })

      dispatch({
        type: 'NOTIFY',
        message:'Login successful!'
      })

      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 2000)

      // Jotta Token ei katoa sivua uudelleenladatessa talletetaan  kirjautumistiedot local storageen eli
      //selaimessa olevaan avain-arvo-eli key-value-periaatteella toimivaan tietokantaan.
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response)) // avain, arvo(JSolio muutettuna stringiksi)
      // console.log(user,user.token, 'uuuuuuuussssssssssssssssssseeerr')

    }
  }
}

//logout and and remove token
export const logout = () => {
  return async  (dispatch) => {
    alert('localstorage cleared!')
    window.localStorage.removeItem('loggedBlogappUser')
    await blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default loginReducer

