"use client"
import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = ({ src }: any) => {

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio: any = document.getElementById('audio-player');
        playing ? audio.play() : audio.pause();
    }, [playing]);

    const togglePlay = () => setPlaying(!playing);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
        }}>
            <audio id="audio-player" src={src} loop />
            <button aria-label="music-player" onClick={togglePlay} style={{
                backgroundColor: '#fff', // Circular background
                border: '2px solid #ccc', // Optional: border for the circle
                borderRadius: '50%', // Makes the button circular
                cursor: 'pointer',
                outline: 'none',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s, transform 0.3s', // Smooth transition for background color and transform
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: adding some shadow for better aesthetics
            }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} // Slightly enlarges the button on hover
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Reverts the scale on mouse leave
            >
                {playing
                    ? <FaPause color="red" size="12" />
                    : <FaPlay color="green" size="12" />
                }
            </button>
        </div>
    )
}

export default MusicPlayer