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
                <header className="bg-gray-100 py-5 shadow mb-8">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold text-gray-800">BlogStack</h1>
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
