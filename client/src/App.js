import { Routes,Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/home';
import { SocketProvider } from './providers/socket';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <SocketProvider>
        <Route path="/" element={<Homepage/>}/>
        {/* <Route path="/" element={<Homepage/>}/> */}
        </SocketProvider>
      </Routes>


    </div>
  );
}

export default App;
