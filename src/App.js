import React, {useState, useEffect, useRef} from 'react';
import leafs from './leafs-logo.png'
import './App.css';
import Message from './components/Message';
import Score from './components/Score';
import Stats from './components/Stats';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-211632738-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {

  const [scoreState, setScore] = useState([]);
  const [playingState, setPlaying] = useState(false)
  const [gameStatus, setGameStatus] = useState('')
  const [startTimeState, setStartTimeState] = useState('')
  const [stats, getStats] = useState([])
  const [teamInfo, setTeamInfo] = useState()
  
  const heading = useRef()

  const TEAM = 'TOR';
  
  useEffect(() => {
    fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
    .then(results => results.json())
    .then(data => {
      data.games.filter(i =>
        { 
          if(i.teams.away.abbreviation.toString().indexOf(TEAM) > -1 || i.teams.home.abbreviation.toString().indexOf(TEAM) > -1){
            console.log(i.teams)
            setStartTimeState(i.startTime)
            setPlaying(true)
            setScore(i.scores)
            setGameStatus(i.status.state)
            getStats(i.goals)
            setTeamInfo(i.teams)
          }
          return false;
        }
      )
    });
    
    Object.values(heading.current.children).forEach((elem, i) => {
      elem.style.transform = `rotate( ${(360 / heading.current.children.length) * i}deg)`
    })

  }, []);

  
        
    return (
      <div className="App">
        <Score playing={ playingState } score={ scoreState } team={ TEAM } />
        <Stats stats={ stats } team={ TEAM } teamInfo={ teamInfo } />
        <div className='brand'>
          <div className='message-holder'>
            <Message playing={ playingState } score={ scoreState } team={ TEAM } status={ gameStatus } startTime={ startTimeState }/>
            <div className='heading' ref={heading}>
              <p className='letter'><span>A</span></p>
              <p className='letter'><span>R</span></p>
              <p className='letter'><span>E</span></p>
              <p className='letter'><span></span></p>
              <p className='letter'><span>T</span></p>
              <p className='letter'><span>H</span></p>
              <p className='letter'><span>E</span></p>
              <p className='letter'><span></span></p>
              <p className='letter'><span>L</span></p>
              <p className='letter'><span>E</span></p>
              <p className='letter'><span>A</span></p>
              <p className='letter'><span>F</span></p>
              <p className='letter'><span>S</span></p>
              <p className='letter'><span></span></p>
              <p className='letter'><span>W</span></p>
              <p className='letter'><span>I</span></p>
              <p className='letter'><span>N</span></p>
              <p className='letter'><span>N</span></p>
              <p className='letter'><span>I</span></p>
              <p className='letter'><span>N</span></p>
              <p className='letter'><span>G</span></p>
              <p className='letter'><span></span></p>
            </div>
            <img src={leafs} className="logo" alt="Leafs logo"/>
          </div>
        </div>
      </div>
    );
}

export default App;
