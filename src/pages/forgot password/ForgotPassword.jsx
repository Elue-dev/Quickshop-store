import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrStatusGood } from 'react-icons/gr'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import './forgotPassword.scss'

export default function ForgotPassword() {
  const emailRef = useRef(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const { resetPassword } = useAuth()

  useEffect(() => {
    emailRef.current.focus()
  },[])

   const handleSubmit = async(e) => {
    e.preventDefault()

    try {
        setError('')
        setMessage('')
        await resetPassword(email)
        setEmail('')
        setMessage('Check your inbox for further instructions (Ensure to check spam folder).')
        window.setTimeout(() => {
          setMessage('REDIRECTING...')
         },5000)
        window.setTimeout(() => {
          navigate('/login')
      }, 7000)
    } catch (err){
      if (err.message === 'Firebase: Error (auth/user-not-found).') {
        setError('This email is not registered')
        window.setTimeout(() => {
            setError('')
        }, 3000)
      }
      if (err.message === 'Firebase: Error (auth/invalid-email).') {
        setError('Invalid email')
        window.setTimeout(() => {
            setError('')
        }, 3000)
      }
      if (err.message === 'Firebase: Error (auth/too-many-requests).') {
        setError('Reset password limit exceeded')
        window.setTimeout(() => {
            setError('')
        }, 3000)
      }
    }
  }
  
  return (
    <div className='login'>
      <h1>Password Reset</h1>
      <div className='reset_desc'>
        <p>You may need to check your spam folder.<br /> Also, If the link appears not to be clickable, 
          you may need to copy the link and paste in your browser.</p>
      </div>
      {error && <p className='alert error'> <MdOutlineReportGmailerrorred className='error_icon' />  {error} </p>}
      {message && <p className='alert message'> <GrStatusGood className='message_icon' style={{ color: '#fff'}} />  {message} </p>}
      <form onSubmit={handleSubmit}>
        <label>
            <input type="email"
             value={email} 
             ref={emailRef} 
             onChange={(e)=>setEmail(e.target.value)} 
             required
             placeholder='Enter your email' />
        </label> <br />
        <button className="btn">Proceed</button>
      </form>
      <p className='forgot_password'>
        <Link to='/login'>Back to Login</Link>
      </p>
      <p className='get_account'>
        New to QuickShop? <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  )
}