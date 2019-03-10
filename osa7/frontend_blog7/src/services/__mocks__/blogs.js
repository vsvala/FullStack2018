{ /* eslint-disable */ } 
 let token = null
 { /* eslint-disable */ } 
const blogs = [
  {
    id:'5bfdc79e0140972cb2845315',
    title: 'Lahetetty VS Code REST clientilla ',
    author: 'nollas',
    url: 'www.nollas.fi',
    likes: 1,
    user: {
      _id: '5b50afb50ed98e48c8ae3934',
      username: 'Ka',
      name: 'Kustaa',
    }
  },
  {
    id: '5bff076eb84c8d25b5c904ce',
    title: 'eka title',
    author: 'kirjoittaja1',
    url: 'www.eka.fi',
    likes: 2,
    user: {
      _id: '5b5071892de0bd27418d130f',
      username: 'Kalle',
      name: 'Kalle Kustaa',
    }
  },
  {
    id: '5bff079d327e8825eeeb0f11',
    title: 'Toka title',
    author: 'tokankirjoittaja',
    url: 'www.toka.fi',
    likes: 1,
    user: {
      _id: '5b5071892de0bd27418d130f',
      username: 'Kalle',
      name: 'Kalle Kustaa',
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}



export default { getAll, blogs }