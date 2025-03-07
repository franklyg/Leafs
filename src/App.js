import React, { useState, useEffect, useRef } from 'react';
import leafs from './leafs-logo.png';
import './App.css';
import Message from './components/Message';
import Score from './components/Score';
import Stats from './components/Stats';

import ReactGA from 'react-ga4';

// Initialize Google Analytics
const GA_TRACKING_ID = "G-0K5Y5P8S6T"; // Replace with your GA4 tracking ID
ReactGA.initialize(GA_TRACKING_ID);

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

  // Function to track custom events
  const trackEvent = (category, action, label = "", value = 0) => {
    ReactGA.event({ category, action, label, value });
    console.log("GA Event Tracked:", { category, action, label, value });
  };

  // Function to fetch game data
  const fetchGameData = async () => {
    try {
      const response = await fetch('https://nhl-score-api.herokuapp.com/api/scores/latest');
      const data = await response.json();
      
      const game = data.games.find(
        (i) => i.teams.away.abbreviation === TEAM || i.teams.home.abbreviation === TEAM
      );

      if (game) {
        setStartTimeState(game.startTime);
        setPlaying(true);
        setScore(game.scores);
        setGameStatus(game.status.state);
        getStats(game.goals);
        setTeamInfo(game.teams);
        setPeriod(game.status.progress.currentPeriodOrdinal);
        setTime(game.status.progress.currentPeriodTimeRemaining.pretty);
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchGameData();
    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchGameData, 10000);
    
    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Track pageview when the component mounts
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: document.title });
    console.log("GA Pageview Sent:", window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    // Rotate heading elements
    if (heading.current) {
      Object.values(heading.current.children).forEach((elem, i) => {
        elem.style.transform = `rotate(${(360 / heading.current.children.length) * i}deg)`;
      });
    }
  }, []);

  return (
    <div className="App">
      <Score playing={playingState} score={scoreState} team={TEAM} time={time} period={period} />
      <Stats stats={stats} team={TEAM} teamInfo={teamInfo} />

      <div className="brand">
        <div className="message-holder">
          <Message playing={playingState} score={scoreState} team={TEAM} status={gameStatus} startTime={startTimeState} />
          
          <div className="heading" ref={heading}>
            {["A", "R", "E", "", "T", "H", "E", "", "L", "E", "A", "F", "S", "", "W", "I", "N", "N", "I", "N", "G", ""].map((letter, index) => (
              <p key={index} className="letter">
                <span>{letter}</span>
              </p>
            ))}
          </div>

          <img src={leafs} className="logo" alt="Leafs logo" />
        </div>
      </div>

      {/* <button onClick={() => trackEvent("User Interaction", "Clicked Button", "Game Status Check", 1)}>
        Track Event
      </button> */}
    </div>
  );
}

export default App;
