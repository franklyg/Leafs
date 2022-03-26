import React, {useState, useEffect} from 'react';
import leafs from './leafs-logo.png'
import './App.css';
import Score from './components/Score';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-211632738-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

  const [scoreState, setScore] = useState([]);
  const [playingState, setPlaying] = useState(true)
  
  const TEAM = 'CBJ';

  useEffect(() => {
      fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
      .then(results => results.json())
      .then(data => {
        data.games.filter(i => 
              i.teams.away.abbreviation.indexOf(TEAM) > -1 || i.teams.home.abbreviation.indexOf(TEAM) > -1 ?
              i.scores[TEAM]
              :
              setPlaying(false) 
          ).forEach(e=>{
              setScore(e)
              e.teams.away.abbreviation.indexOf(TEAM) > -1 ? 
              setPlaying(true)
              : 
              setPlaying(false)
              
              e.teams.home.abbreviation.indexOf(TEAM) > -1 ?
              setPlaying(true)
              : 
              setPlaying(false)
          })
      });
  }, []);

  return (
    <div className="App">
      <>
      {console.log( playingState, scoreState.length !== undefined )}
      {playingState.length && scoreState.length !== undefined ? 
        <p>false</p>
        :
        <Score playing={ playingState } score={ scoreState } team={ TEAM } />
      }
      </>
      <img src={leafs} className="logo" alt="Leafs logo"/>
    </div>
  );
}

export default App;
