import logo from './logo.svg';
import leafs from './leafs-logo.png'
import './App.css';
import Score from './components/Score';

function App() {
  return (
    <div className="App">
      <img src={leafs} className="logo"/>
      <Score />
    </div>
  );
}

export default App;
