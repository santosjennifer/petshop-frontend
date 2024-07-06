import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.tsx';
import Footer from './components/Footer/Footer.tsx';

import Home from './pages/Home/Home.tsx'
import About from './pages/About/About.tsx'
import Animal from './pages/Animal/Animal.tsx';
import Person from './pages/Person/Person.tsx';
import AnimalCreate from './components/Animal/AnimalCreate.tsx';
import AnimalEdit from './components/Animal/AnimalEdit.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pet" element={<Animal />} />
            <Route path="/person" element={<Person />} />
            <Route path="/add-animal" element={<AnimalCreate />} />
            <Route path="/edit-animal/:id" element={<AnimalEdit />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
