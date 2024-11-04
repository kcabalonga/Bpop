import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {

  return (
    <div className="App" style={{background: '#94ccee',  zIndex: -1}}>
      <Header/>

      <Footer/>
    </div>
  );
}


export default App;
