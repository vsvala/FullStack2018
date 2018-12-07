import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
      event.preventDefault()
      const select = event.target.filter.value
      //dispatchataan  eli lähetetään actioni storelle
      //this.props.store.dispatch(
      this.props.showFiltered(select)

      event.target.filter.value = ''
    }
    // input-kentän arvo muuttujassa event.target.value

    render() {
      const style = {
        marginBottom: 10
      }
        
      return (   
        <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
      )
    }
}     

export default connect(
  null,
  { showFiltered }
)(Filter)

//export default AnecdoteForm

