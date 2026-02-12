import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Home from './components/layout/Home';
import Footer from './components/layout/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RoomList from "./components/room/RoomList";
import RoomDetail from "./components/room/RoomDetail";
import RoomInsert from "./components/room/RoomInsert";

function App() {
  return (


    <Router>
        <Header />
        <Routes>
            <Route>
                <Route path="/" element={<Home />}/>
                <Route path="/room/list" element={<RoomList />}/>
                <Route path="/room/detail/:no" element={<RoomDetail />}/>
                <Route path="/room/insert" element={<RoomInsert />}/>
            </Route>
        </Routes>
        <Footer />
    </Router>

  );
}

export default App;
