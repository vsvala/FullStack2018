import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    selected:0,
    // votes:{0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    votes: [0,0,0,0,0,0]

    }
  }

  klickNext = () => {
    this.setState({
      selected: Math.floor((Math.random() * 5) + 1)
    })
  }

  voting = () => {
    const index=this.state.selected
    const kopio = this.state.votes
    kopio[index]+=1
     this.setState({ votes: kopio })
   }

 
  render() {

    // const klickVote = (arvo, nimi) => () => {
    //     this.setState({ vote: arvo })
    //   }

      //eniten ääniä
      var max= Math.max(...(this.state.votes))
      //eniten ääniä saaneen anekdootin indeksi
      var ind=this.state.votes.indexOf(Math.max(...(this.state.votes)))

      return (
        <div>
          {this.props.anecdotes[this.state.selected]}
            <p>has {this.state.votes[this.state.selected]} votes</p>
            {/* <p>has {this.state.selected} valittu state</p> */}
          <div>
              {/* console.log(this.state.vote[this.state.selected]+1)
              <Button
                   handleClick={this.asetaArvoon(this.state.hyva + 1, "hyva")}  // arvo, nimi
                   text="hyva"
                   /> */}
            <button onClick={this.voting}>vote</button>
            <button onClick={this.klickNext}>next anecdote</button>
          </div>
          <div>

          <h3>Anecdote with most votes: </h3>
          {/* anekdoottitaulukosta samalla indeksillä haku */}
          {this.props.anecdotes[ind]}        
          <p>{max}</p>
          </div>
     
         


      </div>
      )
    }
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
