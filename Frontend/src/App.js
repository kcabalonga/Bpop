import './App.css';
import Header from './components/Header';
import Landing from './components/Landing';

function App() {

  return (
    <div className="App" style={{background: '#94ccee',  zIndex: -1}}>
      <Header />
      <Landing />
    </div>
  );
}


export default App;
