import './App.css';
import './components/CustomerList';
import Customerapp from './components/CustomerList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './components/menu';
import PersistentDrawerLeft from './components/menu';

function App() {

  return (
    <div className="App">
        <PersistentDrawerLeft></PersistentDrawerLeft>
      <Customerapp/>
    </div>
  );
}

export default App;