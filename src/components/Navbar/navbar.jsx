import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import profileicon from '../../assets/profileicon.png'
import { logout } from '../../firebase'
import './navbar.css'

const navItems = ['Home', 'Shows', 'Movies', 'Games', 'New & Popular', 'My List', 'Browse by Languages']

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [isBlack, setIsBlack] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setIsBlack(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      await logout()
      setProfileMenuOpen(false)
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const preventNavigation = (event) => event.preventDefault()

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }

      if (event.target.closest('.menu-toggle')) {
        return
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  const closeMenus = () => {
    setMenuOpen(false)
    setProfileMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isBlack ? 'nav-black' : ''}`} id="navbar">
      <div className="container">
        <div className="nav-left">
          <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
            <img src={logo} alt="Netflix Logo" />
          </a>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" onClick={preventNavigation}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
          </button>
          <div className={`search-container ${searchOpen ? 'search-open' : ''}`} id="searchContainer">
            <button
              type="button"
              className="search-btn"
              id="searchBtn"
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
            >
              <i className="fas fa-search" />
            </button>
            <input
              type="text"
              className="search-input"
              id="searchInput"
              placeholder="Titles, people, genres"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <span className="children">Children</span>
          <i className="fas fa-bell" />
          <div className="profile-menu-wrapper" ref={profileMenuRef}>
            <button
              type="button"
              className="profile-trigger"
              aria-label="Open profile menu"
              aria-expanded={profileMenuOpen}
              onClick={() => setProfileMenuOpen((open) => !open)}
            >
              <img
                src={profileicon}
                alt="Profile"
                className="profile-icon"
              />
              <i className={`fas fa-caret-${profileMenuOpen ? 'up' : 'down'} profile-caret`} />
            </button>

            {profileMenuOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-arrow" />

                <div className="profile-summary">
                  <img src={profileicon} alt="Children profile" className="dropdown-avatar" />
                  <span>Children</span>
                </div>

                <ul className="profile-menu-list">
                  <li><a href="#" onClick={preventNavigation}><i className="fas fa-pencil-alt" />Manage Profiles</a></li>
                  <li><a href="#" onClick={preventNavigation}><i className="fas fa-external-link-alt" />Exit Profile</a></li>
                  <li><a href="#" onClick={preventNavigation}><i className="fas fa-comments" />Transfer Profile</a></li>
                  <li><a href="#" onClick={preventNavigation}><i className="far fa-user-circle" />Account</a></li>
                  <li><a href="#" onClick={preventNavigation}><i className="far fa-question-circle" />Help Centre</a></li>
                </ul>

                <div className="profile-signout">
                  <a href="#" onClick={handleLogout}>Log out of Netflix</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu" ref={mobileMenuRef}>
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  onClick={(event) => {
                    preventNavigation(event)
                    closeMenus()
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
