import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter= (props) => {
  const handleChange = (event) => {
    props.filterChange(event.target.value)
  }
  // render() {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} />
    </div>
  )
}


export default connect(null, { filterChange })(Filter)


// class Filter extends React.Component {
//     filterClicked  = (value) => {
//       this.props.filterChange(value)      //dispatchataan  eli lähetetään actioni storelle
//       //this.props.store.dispatch(
//       //this.props.showFiltered(select)
//     }
//     checked = (label) => {
//       return label === this.props.filter
//     }
//     // event.target.filter.value = ''  }
//     // input-kentän arvo muuttujassa event.target.value

//     render() {

//       return (
//         <div>
//         kaikki
//           <input
//             type='radio'
//             name='filter'
//             onChange={this.filterClicked('ALL')}
//             checked={this.checked('ALL')}
//           />
//         tärkeät
//           <input
//             type='radio'
//             name='filter'
//             onChange={this.filterClicked('IMPORTANT')}
//             checked={this.checked('IMPORTANT')}
//           />
//         eitärkeät
//           <input
//             type='radio'
//             name='filter'
//             onChange={this.filterClicked('NONIMPORTANT')}
//             checked={this.checked('NONIMPORTANT')}
//           />
//         filter <input onChange={this.handleChange}/>
//         </div>
//       )
//     }
// }

// export default connect(
//   (state) => ({ filter: state.filter }),
//   { filterChange }
// )(Filter)

// //export default AnecdoteForm

