import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinWindow from '../components/CoinWindow';
import LoadingState from '../components/LoadingState';
import Table from '../components/table/Table';
import { useStore } from '../entities/store';
import transitionStates from '../utils/transitionStates';

function MainWindow() {
  const [isFetching, setIsFetching] = useState(true);
  // const [coinParam, setCoinParam] = useState('');

  const store = useStore();

  useEffect(() => {
    const getData = async () => {
      await store.fetchProducts();
      if (store.state === 'done') {
        transitionStates.fadeOut('#loadingState');
        setTimeout(() => {
          setIsFetching(false);
        }, 40);
        setTimeout(() => {
          transitionStates.fadeIn('#tableComponent');
        }, 50);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {isFetching ? (
        <LoadingState />
      ) : (
        <Routes>
          <Route path='/coin' element={<CoinWindow />} />
          <Route path='/' element={<Table />} />
        </Routes>
      )}
    </div>
  );
}

export default MainWindow;
