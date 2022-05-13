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
  const [playingState, setPlaying] = useState('')

  const TEAM = 'TOR';
  
  useEffect(() => {
    fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
    .then(results => results.json())
    .then(data => {
      
      data.games.filter(i =>
            { 
              if(i.teams.away.abbreviation.toString().indexOf(TEAM) >= 0 ){
                if(i.teams.away.abbreviation === TEAM){
                  setPlaying(true)
                  setScore(i.scores)
                }
              }

              if(i.teams.home.abbreviation.toString().indexOf(TEAM) >= 0 ){
                if(i.teams.home.abbreviation === TEAM){
                  setPlaying(true)
                  setScore(i.scores)
                }
              }
              return false;
            }
          )
        });
  }, []);

  
        
    return (
      <div className="App">
        <>
          <Score playing={ playingState } score={ scoreState } team={ TEAM } />
          
          <Message playing={ playingState } score={ scoreState } team={ TEAM } />
        </>
        <img src={leafs} className="logo" alt="Leafs logo"/>
      </div>
    );
}

export default App;
