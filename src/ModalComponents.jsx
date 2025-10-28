import React from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, X } from 'lucide-react';

// Movie Modal Component
const MovieModal = ({ movie, onClose, onPlay, isInMyList, onToggleMyList }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={movie.backdrop} 
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg flex-shrink-0"
            />
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-sm">⭐ {movie.rating}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map((g) => (
                  <span key={g} className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">{g}</span>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">{movie.synopsis}</p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPlay(movie)}
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Play size={20} /> Play
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggleMyList}
                  className="bg-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-700 transition-colors border border-gray-600"
                >
                  <Plus 
                    size={20} 
                    className={isInMyList ? 'text-white' : 'text-gray-300'} 
                    fill={isInMyList ? 'currentColor' : 'none'}
                  />
                  {isInMyList ? 'In List' : 'Add to List'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Video Player Overlay Component
const VideoPlayerOverlay = ({ movie, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full max-w-6xl aspect-video bg-gray-900 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Video Placeholder */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play size={48} className="text-white ml-2" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-400">Video Player Placeholder</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-colors"
        >
          <X size={24} className="text-white" />
        </button>
        
        {/* Fullscreen button placeholder */}
        <button className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export { MovieModal, VideoPlayerOverlay };
