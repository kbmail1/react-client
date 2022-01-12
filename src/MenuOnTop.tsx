import { Link } from 'react-router-dom'
import './MenuOnTop.scss'

const MenuOnTop = () => {
  return (
    <div className="menuontop" style={{ width: "100%" }}>
      <ul className="menuontop__list">

        <li className="menuontop__list__item">
          <Link to="/">{ }About{ }</Link>
        </li>
        <li className="menuontop__list__item">
          <Link to="/dictionary">{ }Dictionary{ }</Link>
        </li>
        <li>
          { } |  &nbsp; &nbsp;
        </li>
        <li className="menuontop__list__item">
          <Link to="/crossword">{ }Crossword{ }</Link> </li>
        <li>
          { } |  &nbsp; &nbsp;
        </li>
        <li className="menuontop__list__item">
          <Link to="/hangman">{ }Hangman{ }</Link>
        </li>
      </ul >
    </div >
  )
}
export default MenuOnTop