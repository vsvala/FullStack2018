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

  asetaArvoon = (arvo) => {
    return () => {
      this.setState({hyva: arvo })
    kaikki:this.state.kaikki.concat('h')
    }
  }


klikNeutraali = (arvo) => {
  return () => {
  this.setState({
    neutraali:arvo,
    kaikki:this.state.kaikki.concat('n')
  })
}
}
klikHuono = () => {
  this.setState({
    huono: this.state.huono + 1,
    kaikki:this.state.kaikki.concat('m')
  })
}

  render(){

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
      ka:Math.round((this.state.hyva-this.state.huono)/this.state.kaikki.length*100)/100,
      pos:Math.round(this.state.hyva/this.state.kaikki.length*100)/100
    }

    const historia=() => {
    if (this.state.kaikki.length===0) {
       return (
         <div>
           <em>ei yhtään palautetta annettu</em>
         </div>
       )
      }
     }
    return(
     <div>
       <h1>Anna palautetta</h1>
         <div>
            <button onClick={this.asetaArvoon(this.state.hyva+1)}>hyva</button>
            <button onClick={this.klikNeutraali(this.state.neutraali+1)}>neutraali</button>
            <button onClick={this.klikHuono}>huono</button>
         </div>

       <h1>Statistiikka</h1>
        <div>
        <table>
          <tr>
            <td>{Statistics.stat[0].nimi}</td>
            <td>{Statistics.stat[0].hyva}</td>
          </tr>
          <tr>
          {Statistics.stat[1].nimi}
         {Statistics.stat[1].neutraali}
          </tr>
         <p>{Statistics.stat[1].nimi} {Statistics.stat[1].neutraali}</p>
         <p>{Statistics.stat[2].nimi} {Statistics.stat[2].huono}</p>
         <p>keskiarvo {Statistic.ka}</p>
         <p>positiivisia {Statistic.pos}</p>
         </table>
        </div>
     </div>
    )
}
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
