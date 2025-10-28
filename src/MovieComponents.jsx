import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';

// Movie Card Component
const MovieCard = ({ movie, onClick, isInMyList, onToggleMyList }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="flex-shrink-0 w-48 relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={movie.poster} 
          alt={movie.title}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMyList();
          }}
          className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <Plus 
            size={16} 
            className={isInMyList ? 'text-white' : 'text-gray-300'} 
            fill={isInMyList ? 'currentColor' : 'none'}
          />
        </motion.button>
      </div>
      
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-medium text-sm line-clamp-2">{movie.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Movie Row Component
const MovieRow = ({ title, movies, onMovieClick, myList, onToggleMyList }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <h2 className="text-2xl font-semibold mb-6 tracking-wide">{title}</h2>
      
      <div className="relative">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie)}
              isInMyList={myList.has(movie.id)}
              onToggleMyList={() => onToggleMyList(movie.id)}
            />
          ))}
        </div>
        
        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export { MovieRow, MovieCard };
