import TitleCards from '../../components/TitleCards/TitleCards'
import './home.css'

export default function Home() {
  return (
    <>
      <header className="banner">
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1 className="banner-title">Extraction 2</h1>

          <p className="banner-description">
            Back from the brink of death, highly skilled commando Tyler Rake takes on another dangerous mission:
            saving the imprisoned family of a ruthless gangster.
          </p>
          <div className="banner-buttons">
            <button type="button" className="banner-btn play-btn">
              <i className="fas fa-play"></i> Play
            </button>
            <button type="button" className="banner-btn info-btn">
              <i className="fas fa-info-circle"></i> More Info
            </button>
          </div>
        </div>
        <div className="banner-fadeBottom"></div>
      </header>

      <TitleCards />

      <div className='more-cards'>
        <TitleCards title="Recommended for you" />
        <TitleCards title="New Releases" />
        <TitleCards title="Trending Now" />
      </div>
    </>
  )
}
