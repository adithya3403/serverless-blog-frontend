// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import CreatePost from './components/CreatePost';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="py-3 mb-4 rounded" style={{ backgroundColor: '#cfe7ff' }}>
                    <div className="container text-center">
                        <h1 className="display-3 font-weight-bold text-dark">BlogStack</h1>
                        <p className="lead text-muted">Incididunt ex id nulla exercitation adipisicing minim ullamco</p>
                    </div>
                </header>
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/" element={<BlogList />} />
                        <Route path="/create" element={<CreatePost />} />
                        <Route path="/edit/:id" element={<CreatePost />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
