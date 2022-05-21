import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
// import CoinWindow from './features/CoinWindow';
import MainWindow from './features/MainWindow';

function App() {
  return (
    <div className='App max-w-7xl mx-auto flex flex-col'>
      <div className='body border mt-10'>
        <Header />
        <MainWindow />
        {/* <CoinWindow /> */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
