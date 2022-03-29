import React, {useState, useEffect} from 'react';
import leafs from './leafs-logo.png'
import './App.css';
import Message from './components/Message';
import Score from './components/Score';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-211632738-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

  const [scoreState, setScore] = useState([]);
  const [playingState, setPlaying] = useState(null)
  
  const TEAM = 'TOR';

  useEffect(() => {
      fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
      .then(results => results.json())
      .then(data => {
        data.games.filter(i => 
              i.teams.away.abbreviation === TEAM || i.teams.home.abbreviation === TEAM || i.scores[TEAM] >= 0 ?
              i.scores[TEAM]
              :
              setPlaying(false)
              
          ).forEach(e=>{
              setScore(e)
              e.teams.away.abbreviation === TEAM ? 
              setPlaying(true)
              : 
              setPlaying(false)
              
              e.teams.home.abbreviation === TEAM ?
              setPlaying(true)
              : 
              setPlaying(false)
          })
      });
  }, []);

  return (
    <div className="App">
      <>
      <Score playing={ playingState } score={ scoreState } team={ TEAM } />
      {/* {console.log(scoreState.includes())} */}
      
      <Message playing={ playingState } score={ scoreState } team={ TEAM } />
      </>
      <img src={leafs} className="logo" alt="Leafs logo"/>
    </div>
  );
}

export default App;
