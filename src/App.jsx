import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MoviesPage from './pages/MoviesPage';
import ActorsPage from './pages/ActorsPage';
import MovieDetail from './pages/MovieDetail';
import ActorDetail from './pages/ActorDetail';
import TVShowsPage from './pages/TVShowsPage';
import TVShowDetail from './pages/TVShowDetail';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Navbar onSearch={setSearchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/movies/:category" element={<MoviesPage />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/actor/:id" element={<ActorDetail />} />
        <Route path="/tv/category/:category" element={<TVShowsPage />} />
        <Route path="/tv/:id" element={<TVShowDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;