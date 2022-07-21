import { Link } from 'react-router-dom'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import  './error404.scss'

export default function Error404() {
  return (
    <div className='error_page'>
        <p className="error_icon"><HiOutlineEmojiSad /></p>
        <p className='error_top' >SORRY</p>
        <p className='error_desc'>We couldn't find that page</p>
        <p className='error_link'>Try going to <Link to='/'><span>Quick</span>Shop's home page.</Link></p>
    </div>
  )
}
