import { Routes,Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/home';
import RoomPage from './pages/RoomPage';
import { PeerProvider } from './providers/peer';
import { SocketProvider } from './providers/socket';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <PeerProvider>

      <Routes>
       
        <Route path="/" element={<Homepage/>}/>
        <Route path="/room/:roomId" element={<RoomPage/>}/>
        
      </Routes>
      
      </PeerProvider>
      </SocketProvider>

    </div>
  );
}

export default App;
