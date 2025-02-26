import React, { useState, useEffect, useRef } from 'react';
import leafs from './leafs-logo.png';
import './App.css';
import Message from './components/Message';
import Score from './components/Score';
import Stats from './components/Stats';

import ReactGA from 'react-ga4';
ReactGA.initialize('G-0K5Y5P8S6T');
ReactGA.send('pageview');
ReactGA.event(window.location.pathname + window.location.search)
// ReactGA.pageview(window.location.pathname + window.location.search);
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-0K5Y5P8S6T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0K5Y5P8S6T');
</script> */}
function App() {

  const [scoreState, setScore] = useState([]);
  const [playingState, setPlaying] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [startTimeState, setStartTimeState] = useState('');
  const [stats, getStats] = useState([]);
  const [teamInfo, setTeamInfo] = useState();
  const [period, setPeriod] = useState();
  const [time, setTime] = useState();

  const heading = useRef();

  const TEAM = 'TOR';

  const fetchGameData = () => {
    fetch('https://nhl-score-api.herokuapp.com/api/scores/latest')
      .then((results) => results.json())
      .then((data) => {
        data.games.filter((i) => {
          if (
            i.teams.away.abbreviation.toString().indexOf(TEAM) > -1 ||
            i.teams.home.abbreviation.toString().indexOf(TEAM) > -1
          ) {
            setStartTimeState(i.startTime);
            setPlaying(true);
            setScore(i.scores);
            setGameStatus(i.status.state);
            getStats(i.goals);
            setTeamInfo(i.teams);
            setPeriod(i.status.progress.currentPeriodOrdinal);
            setTime(i.status.progress.currentPeriodTimeRemaining.pretty);
          }
          return false;
        });
      });
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchGameData();

    // Fetch data every 10 seconds
    const intervalId = setInterval(() => {
      fetchGameData();
    }, 10000);

    // Rotate heading elements
    Object.values(heading.current.children).forEach((elem, i) => {
      elem.style.transform = `rotate(${(360 / heading.current.children.length) * i}deg)`;
    });

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Score playing={playingState} score={scoreState} team={TEAM} time={time} period={period} />
      <Stats stats={stats} team={TEAM} teamInfo={teamInfo} />
      <div className="brand">
        <div className="message-holder">
          <Message playing={playingState} score={scoreState} team={TEAM} status={gameStatus} startTime={startTimeState} />
          <div className="heading" ref={heading}>
            <p className="letter"><span>A</span></p>
            <p className="letter"><span>R</span></p>
            <p className="letter"><span>E</span></p>
            <p className="letter"><span></span></p>
            <p className="letter"><span>T</span></p>
            <p className="letter"><span>H</span></p>
            <p className="letter"><span>E</span></p>
            <p className="letter"><span></span></p>
            <p className="letter"><span>L</span></p>
            <p className="letter"><span>E</span></p>
            <p className="letter"><span>A</span></p>
            <p className="letter"><span>F</span></p>
            <p className="letter"><span>S</span></p>
            <p className="letter"><span></span></p>
            <p className="letter"><span>W</span></p>
            <p className="letter"><span>I</span></p>
            <p className="letter"><span>N</span></p>
            <p className="letter"><span>N</span></p>
            <p className="letter"><span>I</span></p>
            <p className="letter"><span>N</span></p>
            <p className="letter"><span>G</span></p>
            <p className="letter"><span></span></p>
          </div>
          <img src={leafs} className="logo" alt="Leafs logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
