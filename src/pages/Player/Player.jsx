import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './player.css'
import backArrowIcon from '../../assets/back_arrow_icon.png'

const Player = () => {
  const { id } = useParams()
  const [movieData, setMovieData] = useState(null)
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const trailerSrc = 'https://www.youtube.com/embed/dQw4w9WgXcQ'

  useEffect(() => {
    if (!apiKey || !id) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [apiKey, id])

  return (
    <div className='player'>
      <Link to="/" className="back-btn">
        <img src={backArrowIcon} alt="Back" />
      </Link>

      <div className="player-box">
        <div className="video-box">
          <iframe
            width="100%"
            height="100%"
            src={trailerSrc}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="player-info">
          <div className="info-grid">
            <div className="info-card">
              <span>Published Date</span>
              <p>{movieData ? movieData.Released : 'Loading...'}</p>
            </div>

            <div className="info-card">
              <span>Name</span>
              <p>{movieData ? movieData.Title : 'Loading...'}</p>
            </div>

            <div className="info-card">
              <span>Type</span>
              <p>{movieData ? movieData.Type : 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
