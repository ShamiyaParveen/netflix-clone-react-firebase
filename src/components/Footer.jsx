import './footer.css'
import facebookIcon from '../assets/facebook_icon.png'
import instagramIcon from '../assets/instagram_icon.png'
import twitterIcon from '../assets/twitter_icon.png'
import youtubeIcon from '../assets/youtube_icon.png'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-socials">
          <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
            <img src={twitterIcon} alt="Twitter" />
          </a>
          <a href="#" aria-label="Youtube" onClick={(e) => e.preventDefault()}>
            <img src={youtubeIcon} alt="Youtube" />
          </a>
        </div>

        <div className="footer-links">
          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Audio Description</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Investor Relations</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Legal Notices</a></li>
          </ul>

          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Help Centre</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Jobs</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Cookie Preferences</a></li>
          </ul>

          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Gift Cards</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Corporate Information</a></li>
          </ul>

          <ul>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Media Centre</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-copy">© 1997-{new Date().getFullYear()} Netflix, Inc.</div>
      </div>
    </footer>
  )
}
