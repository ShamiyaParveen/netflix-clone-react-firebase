import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { signIn, signup } from '../../firebase'
import './login.css'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (isSignUp && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    try {
      setLoading(true)

      if (isSignUp) {
        await signup(name.trim(), email.trim(), password)
      } else {
        await signIn(email.trim(), password)
      }

      navigate('/')
    } catch (firebaseError) {
      setError(firebaseError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-page'>

      <header className="login-header">
        <Link to="/" className="login-logo" aria-label="Netflix home">
          <img src={logo} alt="Netflix" />
        </Link>
      </header>

      <main className="login-main">
        <section className="login-card">
          <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email or mobile number"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="sign-in-btn" disabled={loading}>
              {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" onClick={(e) => e.preventDefault()}>Need help?</a>
            </div>
          </form>

          <div className="signup-copy">
            <span>{isSignUp ? 'Already have an account?' : 'New to Netflix?'}</span>
            <button
              type="button"
              className="mode-switch"
              onClick={() => {
                setIsSignUp((prev) => !prev)
                setError('')
              }}
            >
              {isSignUp ? 'Sign in now.' : 'Sign up now.'}
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Login;
