import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CoinWindow from '../components/CoinWindow';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import Table from '../components/table/Table';
import { useStore } from '../entities/store';
import transitionStates from '../utils/transitionStates';

function MainWindow() {
  const store = useStore();
  const [isFetching, setIsFetching] = useState(store.state);
  // const [coinParam, setCoinParam] = useState('');

  useEffect(() => {
    const getData = async () => {
      await store.fetchProducts();
      if (store.state === 'done') {
        transitionStates.fadeOut('#loadingState');
        setTimeout(() => {
          setIsFetching(store.state);
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
      {isFetching === 'error' ? <ErrorState /> : null}
      {isFetching === 'pending' ? (
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
