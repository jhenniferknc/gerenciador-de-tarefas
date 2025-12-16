import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicial from './components/TelaUsuario/Inicial';
import Login from './components/TelaUsuario/Login';
import Cadastro from './components/TelaUsuario/Cadastro'; 
import NovaTarefa from './components/TelaTarefa/NovaTarefa';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {<Route path="/" element={<Inicial />}/>}
        {<Route path="/login" element={<Login />} />}
        {<Route path="/cadastro" element={<Cadastro />} />}
        <Route path="/novaTarefa" element={<NovaTarefa />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
