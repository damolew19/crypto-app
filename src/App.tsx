import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainWindow from './features/MainWindow';

function App() {
  return (
    <div className='App max-w-3xl mx-auto flex flex-col'>
      <div className='body border mt-10'>
        <Router>
          <Header />
          <MainWindow />
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
