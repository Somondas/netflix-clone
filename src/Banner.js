import axios from './axios';
import requests from './requests';
import React, { useEffect, useState } from 'react';
import "./Banner.css";

function Banner() {
    // movie state
    const [movie, setMovie] = useState([]);
    // get the data
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                // set a random movie
                request.data.results[
                // get the random number between 0 and the lenght of the array(-1)
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request
        }
        fetchData()
    }, []);
    // * Function for creating the three dots effect for the description
    
    const trancate = (str, n) =>{
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    return (
        <header>
            <div
                className="banner"
                // to get the banner background Image
                style={{
                    backgroundSize: "cover",
                    // get background Image
                    backgroundImage: `linear-gradient(180deg, transparent 82%, rgba(37, 37, 37, .61), #111) ,url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                    backgroundPosition: "center center",
                }}
            >
                <div className="banner_contents">
                    {/* Title */}
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original}
                    </h1>
                    {/* buttons */}
                    <div className="banner_buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">List</button>
                    </div>
                    {/* description */}
                    <h1 className="banner_description">{trancate(movie?.overview, 150)}</h1>
                </div>
            </div>

        </header>
    )
}

export default Banner