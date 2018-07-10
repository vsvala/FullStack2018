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

    const Historia=() => this.state.kaikki.join('')

    const Button = {
      //??
    }

    const Statistics = {
    stat: [
      {
        nimi: 'hyvä',
        hyva: this.state.hyva
      },
      {
        nimi: 'neutraali',
        neutraali: this.state.neutraali
      },
      {
        nimi: 'huono',
        huono: this.state.huono
      }
    ]
  }

    const Statistic = {
      ka:Math.round((this.state.hyva-this.state.huono)/Historia().length*100)/100,
      pos:Math.round(this.state.hyva/Historia().length*100)/100
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
         <p>{Statistics.stat[0].nimi} {Statistics.stat[0].hyva}</p>
         <p>{Statistics.stat[1].nimi} {Statistics.stat[1].neutraali}</p>
         <p>huono {Statistics.stat[2].nimi}{Statistics.stat[2].huono}</p>

         <p>keskiarvo {Statistic.ka}</p>
         <p>positiivisia {Statistic.pos}</p>
        </div>
     </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
