import { Routes,Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/home';
import { SocketProvider } from './providers/socket';

function App() {
  return (
    <div className="App">
      <SocketProvider>
      <Routes>
       
        <Route path="/" element={<Homepage/>}/>
        <Route path="/room/:roomId" element={<h1>hello</h1>}/>
        
      </Routes>
      </SocketProvider>

    </div>
  );
}

export default App;
