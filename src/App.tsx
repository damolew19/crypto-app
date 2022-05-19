import './App.css';

import Header from './components/Header';
import Table from './components/table/Table';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App max-w-7xl mx-auto flex flex-col'>
      <Header />
      <div className='body border'>
        <Table />
      </div>
      <Footer />
    </div>
  );
}

export default App;
