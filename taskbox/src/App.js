import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import store from './lib/store';
import InboxScreen from './components/InboxScreen';

function App() {
  return (
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
