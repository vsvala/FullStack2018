import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali:0,
      huono:0,
    }
  }
  klikHyva = () => {
  this.setState({
    hyva: this.state.hyva + 1
  })
}
klikNeutraali = () => {
  this.setState({
    neutraali: this.state.neutraali + 1
  })
}
klikHuono = () => {
  this.setState({
    huono: this.state.huono + 1
  })
}

  render(){

    const teksti = {
      otsikko1: 'Anna Palautetta',
      otsikko2: 'Statistiikka',
    }

    const ka = {
      kpl: this.state.hyva+this.state.neutraali+this.state.huono,
      yht:  this.state.hyva-this.state.huono,
    }

    return (
      <div>

       <h1>{teksti.otsikko1}</h1>
         <div>
            <button onClick={this.klikHyva}>hyva</button>
            <button onClick={this.klikNeutraali}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>
         </div>


       <h1>{teksti.otsikko2}</h1>
        <div>
         <p>hyvä {this.state.hyva}</p>
         <p>neutraali {this.state.neutraali}</p>
         <p>huono {this.state.huono}</p>
         <p>keskiarvo {Math.round(ka.yht/ka.kpl*100)/100}</p>
         <p>positiivisia {Math.round(this.state.hyva/ka.kpl*100)/100}</p>
        </div>
     </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
