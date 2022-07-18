import axios from './axios';
import React, { useEffect, useState } from 'react'
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

// baseUrl for movie posters..
const baseUrl = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setmovies] = useState([]);
  // fetch data using useEffect
  // >>useState for the trailer URL
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    // make a async call to fetch the data
    const fetchData = async () => {
      const request = await axios.get(fetchURL);
      // console.log(request.data.results);
      setmovies(request.data.results);
      return request
    }
    fetchData()
  }, [fetchURL]);
  // >>For setting the wight and height of the youtube video
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }
  // >> For handling the youtube trailers
  const handleClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl("")
    }else{
      movieTrailer(movie?.name || "")
      .then((url) =>{
        // >> For getting the v value in the Url and setting it to setTrailerUrl
        const urlParam = new URLSearchParams( new URL(url).search);
        setTrailerUrl(urlParam.get('v'))
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  }
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className="row_posters">
        {/* render the images using map function */}
        {movies.map((movie) => {
          return (
            <img 
            key={movie.id}
            onClick={() => handleClick(movie) }
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path }`} 
            alt={movie.name} />
          )
        })}
      </div>
      {
        trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
      }
    </div>
  )
}

export default Row;