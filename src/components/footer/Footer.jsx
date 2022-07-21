import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillGithub, AiFillLinkedin , AiFillTwitterCircle} from 'react-icons/ai'
import { BiMessageAltError, BiMessageAltCheck, BiLoader, BiWinkSmile } from 'react-icons/bi'
import { database } from '../../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import './footer.scss'
import { useContext } from 'react'
import { ModeContext } from '../../contexts/ModeContext'

export default function Footer() {
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { mode } = useContext(ModeContext)

  const handleSubmit = async e => {
    e.preventDefault()
    
    try {
      if (mail === '') {
        setError('Please enter your email')
        window.setTimeout(() => {
          setError('')
      }, 3000)
        return
      }

      setLoading(true)

      const colRef = collection(database, 'emails')
      await addDoc(colRef, {
        mail,
        time: serverTimestamp()
      })
      setMessage('You successfully registered to our newsletter!')
      setLoading(false)
      window.setTimeout(() => {
        setMessage('')
    }, 4000)
        setMail('')
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <footer className={`footer ${mode} `}>
      <div className="footer_container">
        <Link to='/'>
          <h2>Quick<span>Shop</span></h2>
          <i>Get your favourite products...</i>
        </Link>
        <form onSubmit={handleSubmit}>
          <p className="subscribe">Subscribe to our newsletter</p>
          {error && <p className='newsletter_error'>
            <BiMessageAltError className='news_icon' />{error}
          </p>
          }
          {message && <p className='newsletter_message'>
            <BiMessageAltCheck className='news_icon_' />{message} <BiWinkSmile className='news_icon_' />
          </p>
          }
          <input 
            type="email" 
            value={mail}
            onChange={(e)=>setMail(e.target.value)}
            placeholder='Enter your email' 
           />
          <button type='sumbit'>{loading ? <BiLoader /> : 'Submit'}</button>
        </form>
        <div className="social_icons">
          <ul>
            <li><a href='https://github.com/Elue-Dev'><AiFillGithub /></a></li>
            <li><a href='https://www.linkedin.com/in/wisdom-elue-8822a5188'><AiFillLinkedin /></a></li>
            <li><a href='https://twitter.com/eluewisdom_'><AiFillTwitterCircle /></a></li>
          </ul>
        </div>
        <div>
        </div>
      </div>
      <div className="line">
      <hr /><br />
      <p className='copyright'>&copy; 2022. Developed by Wisdom Elue</p>
      </div>
    </footer>
  )
}