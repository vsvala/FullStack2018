import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali:0,
      huono:0,
      kaikki:[]
    }
  }
  klikHyva = () => {
  this.setState({
    hyva: this.state.hyva + 1,
    kaikki:this.state.kaikki.concat('h')
  })
}
klikNeutraali = () => {
  this.setState({
    neutraali: this.state.neutraali + 1,
    kaikki:this.state.kaikki.concat('n')
  })
}
klikHuono = () => {
  this.setState({
    huono: this.state.huono + 1,
    kaikki:this.state.kaikki.concat('m')
  })
}

  render(){

    const historia=() => this.state.kaikki.join('')

    const Button = {
      otsikko1: 'Anna Palautetta',
      otsikko2: 'Statistiikka',
    }

    const statistics = {
      kpl: this.state.hyva+this.state.neutraali+this.state.huono,
      yht:  this.state.hyva-this.state.huono,
    }


    const statistic = {
      kpl: this.state.hyva+this.state.neutraali+this.state.huono,
      yht:  this.state.hyva-this.state.huono,
    }

    return (
      <div>

       <h1>Anna palautetta</h1>
         <div>
            <button onClick={this.klikHyva}>hyva</button>
            <button onClick={this.klikNeutraali}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>
         </div>


       <h1>Statistiikka</h1>
        <div>
         <p>hyvä {this.state.hyva}</p>
         <p>neutraali {this.state.neutraali}</p>
         <p>huono {this.state.huono}</p>

         <p>keskiarvo {Math.round(statistic.yht/statistic.kpl*100)/100}</p>
         <p>positiivisia {Math.round(this.state.hyva/statistic.kpl*100)/100}</p>
        <div>{historia().length}</div>
        </div>
     </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
