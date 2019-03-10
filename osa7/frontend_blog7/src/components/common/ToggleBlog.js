import React from 'react'
import PropTypes from 'prop-types'

class ToggleBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }


    toggleVisibility = () => {
      this.setState({ visible: !this.state.visible })
    }

    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }


      return (
        <div>
          <div style={hideWhenVisible}>
            <a className="hideBlog"onClick={this.toggleVisibility}>{this.props.buttonLabel}</a>
          </div>
          <div style={showWhenVisible} className="hideContent">
            {/* koodi viittaa komponentin lapsiin, eli avaavan ja sulkevan tagin sisällä määriteltyihin React-elementteihin. */}
            {/* <button onClick={this.toggleVisibility}>hide</button> */}
            <a onClick={this.toggleVisibility}>{this.props.buttonLabel} </a>
            {this.props.children}

          </div>
        </div>
      )
    }
}
ToggleBlog.propTypes = {
  buttonLabel: PropTypes.object.isRequired
}
export default ToggleBlog

