import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './titlecards.css'
import cards_data from '../../assets/cards/Cards_data'

const sectionQueries = {
  'Popular on Netflix': 'netflix',
  'Recommended for you': 'action',
  'New Releases': '2024',
  'Trending Now': 'avengers',
}

const fallbackCards = cards_data

const formatCards = (items = []) =>
  items
    .filter((item) => item.Poster && item.Poster !== 'N/A')
    .map((item) => ({
      image: item.Poster,
      name: item.Title,
      id: item.imdbID,
    }))

const TitleCards = ({ title, category }) => {
  const cardListRef = useRef(null)
  const [cards, setCards] = useState(fallbackCards)
  const [message, setMessage] = useState('')
  const sectionTitle = title || 'Popular on Netflix'
  const searchTerm = category || sectionQueries[sectionTitle] || 'netflix'
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const statusMessage = !apiKey ? 'Missing OMDb API key' : message

  const handleScroll = (direction) => {
    const cardList = cardListRef.current
    if (!cardList) return

    const scrollAmount = 300

    cardList.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (!apiKey) {
      return
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedCards = formatCards(data.Search)

        if (fetchedCards.length > 0) {
          setCards(fetchedCards)
          setMessage('')
        } else {
          setCards(fallbackCards)
          setMessage(data.Error || 'Showing fallback titles')
        }
      })
      .catch(() => {
        setCards(fallbackCards)
        setMessage('Could not load OMDb titles')
      })
  }, [apiKey, searchTerm])

  return (
    <div className="title-cards">
      <h2>{sectionTitle}</h2>
      <button
        type="button"
        className="scroll-btn left"
        aria-label="Scroll left"
        onClick={() => handleScroll('left')}
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div className='card-list' ref={cardListRef}>
        {cards.map((card, index) => (
          <Link to={`/player/${card.id || index}`} className="card" key={card.id || index}>
            <img src={card.image} alt={card.name} className="card-image" />
            <div className="card-title">{card.name}</div>
          </Link>
        ))}
      </div>

      {statusMessage && <p className="card-status">{statusMessage}</p>}

      <button
        type="button"
        className="scroll-btn right"
        aria-label="Scroll right"
        onClick={() => handleScroll('right')}
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  )
}

export default TitleCards
