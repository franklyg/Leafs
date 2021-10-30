import leafs from './leafs-logo.png'
import './App.css';
import Score from './components/Score';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-211632738-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App">
      <img src={leafs} className="logo" alt="Leafs logo"/>
      <Score />
    </div>
  );
}

export default App;
