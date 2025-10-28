import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, Search, Home, List, User } from 'lucide-react';

// Import komponen-komponen yang telah dipecah
import { MovieRow } from './MovieComponents'; 
import { MovieModal, VideoPlayerOverlay } from './ModalComponents'; 

// Mock data for movies and genres (Tetap di sini untuk kemudahan)
const mockMovies = [
  // ... (Data mockMovies tetap di sini)
  {
    id: 1,
    title: "Neural Horizon",
    year: 2024,
    duration: "2h 18m",
    rating: "8.7",
    genre: ["Sci-Fi", "Cyberpunk", "Thriller"],
    synopsis: "In a world where memories can be bought and sold, a rogue neural engineer discovers a conspiracy that threatens to erase humanity's collective consciousness.",
    poster: "https://placehold.co/300x450/0b0b0b/ffffff?text=Neural+Horizon",
    backdrop: "https://placehold.co/1920x1080/000000/ffffff?text=Neural+Horizon+Backdrop"
  },
  {
    id: 2,
    title: "Quantum Echo",
    year: 2023,
    duration: "1h 52m",
    rating: "9.1",
    genre: ["Drama", "Mystery", "Psychological Thriller"],
    synopsis: "A physicist's experiment with quantum entanglement accidentally creates a bridge between parallel realities, forcing her to confront alternate versions of herself.",
    poster: "https://placehold.co/300x450/1f1f1f/ffffff?text=Quantum+Echo",
    backdrop: "https://placehold.co/1920x1080/0b0b0b/ffffff?text=Quantum+Echo+Backdrop"
  },
  {
    id: 3,
    title: "Stellar Drift",
    year: 2024,
    duration: "2h 35m",
    rating: "8.3",
    genre: ["Adventure", "Sci-Fi", "Drama"],
    synopsis: "The last survivors of Earth embark on a century-long journey through deep space, only to discover that their destination holds secrets that could rewrite human history.",
    poster: "https://placehold.co/300x450/000000/ffffff?text=Stellar+Drift",
    backdrop: "https://placehold.co/1920x1080/1f1f1f/ffffff?text=Stellar+Drift+Backdrop"
  },
  {
    id: 4,
    title: "Digital Ghost",
    year: 2023,
    duration: "1h 48m",
    rating: "7.9",
    genre: ["Horror", "Supernatural", "Thriller"],
    synopsis: "An AI researcher creates a digital consciousness that begins haunting the internet, targeting those who wronged its creator in life.",
    poster: "https://placehold.co/300x450/0b0b0b/e0e0e0?text=Digital+Ghost",
    backdrop: "https://placehold.co/1920x1080/000000/e0e0e0?text=Digital+Ghost+Backdrop"
  },
  {
    id: 5,
    title: "Crimson Protocol",
    year: 2024,
    duration: "2h 05m",
    rating: "8.5",
    genre: ["Action", "Thriller", "Heist"],
    synopsis: "A former intelligence operative must infiltrate a high-security facility to prevent the activation of a weapon that could destabilize global politics.",
    poster: "https://placehold.co/300x450/1f1f1f/aaaaaa?text=Crimson+Protocol",
    backdrop: "https://placehold.co/1920x1080/0b0b0b/aaaaaa?text=Crimson+Protocol+Backdrop"
  },
  {
    id: 6,
    title: "Ethereal Bonds",
    year: 2023,
    duration: "1h 58m",
    rating: "8.8",
    genre: ["Romance", "Drama", "Coming-of-Age"],
    synopsis: "Two souls connected across time and space discover that their love transcends the boundaries of reality itself.",
    poster: "https://placehold.co/300x450/000000/e0e0e0?text=Ethereal+Bonds",
    backdrop: "https://placehold.co/1920x1080/1f1f1f/e0e0e0?text=Ethereal+Bonds+Backdrop"
  }
];

const genres = [
  "Action", "Adventure", "Animation", "Anime", "Arthouse", "Biography", "Comedy", "Black Comedy", "Crime", 
  "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History", "Horror", "Mystery", "Music", "Musical", 
  "Romance", "Romantic Comedy", "Sci-Fi", "Cyberpunk", "Superhero", "Short", "Miniseries", "TV Series", 
  "Reality TV", "Talk Show", "Game Show", "Sport", "Thriller", "Psychological Thriller", "War", "Western", 
  "Experimental", "Indie", "LGBTQ+", "Coming-of-Age", "Period", "Courtroom", "Heist", "Road Movie", "Satire", 
  "Supernatural", "Paranormal", "Dystopian", "Historical Fiction", "Biographical Drama", "Children", "Educational", 
  "Silent Film", "Mockumentary", "Concert Film", "K-Drama", "Telenovela", "Soap Opera", "Slice of Life"
];


const VYNIX = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [myList, setMyList] = useState(new Set());
  const [showSearch, setShowSearch] = useState(false);

  // Analytics mock function (tetap di sini)
  const trackEvent = (eventName, data = {}) => {
    console.log(`[ANALYTICS] ${eventName}:`, data);
  };

  const toggleMyList = (movieId) => {
    const newMyList = new Set(myList);
    if (newMyList.has(movieId)) {
      newMyList.delete(movieId);
      trackEvent('remove_from_list', { movieId });
    } else {
      newMyList.add(movieId);
      trackEvent('add_to_list', { movieId });
    }
    setMyList(newMyList);
  };

  const handlePlay = (movie) => {
    setSelectedMovie(movie);
    setIsPlaying(true);
    trackEvent('play_started', { movieId: movie.id });
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    trackEvent('poster_clicked', { movieId: movie.id });
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsPlaying(false);
  };

  // Handle keyboard shortcuts (tetap di sini)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedMovie && e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMovie]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            VYNIX
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {/* Navigasi sama seperti sebelumnya */}
            <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2"><Home size={16} /><span>Home</span></a>
            <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2"><Search size={16} /><span>Browse</span></a>
            <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2"><List size={16} /><span>My List</span></a>
            <a href="#" className="hover:text-gray-300 transition-colors flex items-center gap-2"><User size={16} /><span>Profile</span></a>
          </nav>

          <div className="md:hidden">
            <Search size={20} className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
          </div>
        </div>
      </header>

      {/* Hero Section (sama seperti sebelumnya) */}
      <section className="relative h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mockMovies[0].backdrop})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{mockMovies[0].title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{mockMovies[0].synopsis.substring(0, 150)}...</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlay(mockMovies[0])}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Play size={20} /> Play
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMovieClick(mockMovies[0])}
                className="bg-gray-800/50 backdrop-blur-sm px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-700/50 transition-colors border border-gray-600"
              >
                <Info size={20} /> More Info
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Movie Rows */}
      <main className="container mx-auto px-6 py-12 space-y-12">
        {genres.slice(0, 8).map((genre) => (
          <MovieRow 
            key={genre}
            title={genre}
            movies={mockMovies}
            onMovieClick={handleMovieClick}
            myList={myList}
            onToggleMyList={toggleMyList}
          />
        ))}
      </main>

      {/* Movie Detail Modal */}
      <AnimatePresence>
        {selectedMovie && !isPlaying && (
          <MovieModal 
            movie={selectedMovie}
            onClose={closeModal}
            onPlay={handlePlay}
            isInMyList={myList.has(selectedMovie.id)}
            onToggleMyList={() => toggleMyList(selectedMovie.id)}
          />
        )}
      </AnimatePresence>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {isPlaying && selectedMovie && (
          <VideoPlayerOverlay 
            movie={selectedMovie}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VYNIX;
