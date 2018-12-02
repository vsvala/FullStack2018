import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

 
  const Statistic = () => {

  const palautteita = store.getState().good + store.getState().ok + store.getState().bad
  const ka = Math.round((store.getState().good - store.getState().bad)/palautteita*100)/100
  const pos =  Math.round ((store.getState().good / palautteita)*100)

   if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
   }
            return(
            <div>
            <h1>Statistiikka</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>hyvä</td>
                            <td>{store.getState().good}</td>
                        </tr>
                         <tr>
                            <td>neutraali</td>
                            <td>{store.getState().ok} </td>
                        </tr>

                        <tr>
                            <td>huono</td>
                            <td>{store.getState().bad} </td>
                        </tr>
                        <tr>
                             <td>keskiarvo</td>
                            <td>{ka}</td>
                        </tr>
                        <tr>
                            <td> positiivisia</td>
                            <td>{pos}</td> 
                        </tr>
                    </tbody>
                </table>   
                </div>
            )
          }      
                    
                       
    const store = createStore(counterReducer) 

    class App extends React.Component {  

    klik = (nappi) => () => {
    store.dispatch({ type: nappi})

        } 
    render() {   
    return(
    
    <div>
   
       <h1>Anna palautetta</h1> 
       <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button> 
        <div> <button onClick={this.klik('ZERO')}>nollaa tilasto</button></div>
        <Statistic />     
                
     </div>
              
        )
        }  
        }  
        
        const renderApp = () => {
            ReactDOM.render(<App />, document.getElementById('root'))
            }
            
            renderApp()
            store.subscribe(renderApp)
            
            export default App