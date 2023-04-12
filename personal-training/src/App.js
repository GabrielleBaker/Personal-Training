import './App.css';
import './components/CustomerList';
import './components/Trainings';
import TrainingList from './components/Trainings';
import Customerapp from './components/CustomerList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './components/menu';
import PersistentDrawerLeft from './components/menu';
import './components/Router'
import Nav from './components/Router';
function App() {

  return (
    <div className="App">
      <PersistentDrawerLeft/>
    </div>
  );
}

export default App;
