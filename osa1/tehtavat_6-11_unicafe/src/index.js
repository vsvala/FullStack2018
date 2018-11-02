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

    asetaArvoon = (arvo, nimi) => {
        return () => {
            if (nimi === "hyva") {
                this.setState({ hyva: arvo,
                kaikki:this.state.kaikki.concat('h')
                })
    
            } else if (nimi === "neutraali") {
                this.setState({ neutraali: arvo,
                kaikki:this.state.kaikki.concat('n')
                })
            } else if (nimi === "huono") {
                this.setState({ huono: arvo,
                kaikki:this.state.kaikki.concat('m')
                })
            }
        }   
    }
render() {

    // Button vastaa yksittäistä palautteenantonappia
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

// Statistics huolehtii tilastojen näyttämisestä
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

   
// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = {
    // ka: Math.round((this.state.hyva-this.state.huono)/(this.state.hyva+this.state.neutraali+this.state.huono)*100)/100,
    // pos:Math.round(this.state.hyva/(this.state.hyva+this.state.neutraali+this.state.huono)*100)/100
   ka:Math.round((this.state.hyva-this.state.huono)/this.state.kaikki.length*100)/100,
   pos:Math.round(this.state.hyva/this.state.kaikki.length*100)/100
 }

const Stat = () => {
    if (this.state.kaikki.length===0){
        return (
            <div>
             <h1>Statistiikka</h1>
              <em>ei yhtään palautetta annettu</em>
            </div>
          )
        } 
            return(
                <div>
                <h1>Statistiikka</h1>
                             
                  <p>{Statistics.stat[0].nimi} {Statistics.stat[0].hyva}</p>
                  <p>{Statistics.stat[1].nimi} {Statistics.stat[1].neutraali}</p>
                  <p>{Statistics.stat[2].nimi} {Statistics.stat[2].huono}</p>
         
                  <p>keskiarvo {Statistic.ka}</p>
                  <p>positiivisia {Statistic.pos}%</p>
                  </div>
            )   
            }

            return (

                <div>
                <h1>Anna palautetta</h1>
                    <Button 
                   handleClick={this.asetaArvoon(this.state.hyva + 1, "hyva")}  // arvo, nimi
                   text="hyva"
                   />
                   <Button
                    handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
                   text="neutraali"
                   />
                   <Button
                   handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
                   text="huono"
                   />
            
                   <Stat/>
                   {/* <div>{this.historia()}</div>
                   
                     <p>{Statistics.stat[0].nimi} {Statistics.stat[0].hyva}</p>
                     <p>{Statistics.stat[1].nimi} {Statistics.stat[1].neutraali}</p>
                     <p>{Statistics.stat[2].nimi} {Statistics.stat[2].huono}</p>
            
                     <p>keskiarvo {Statistic.ka}</p>
                     <p>positiivisia {Statistic.pos}%</p> */}
                </div>
            )
        }
        }
        
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
