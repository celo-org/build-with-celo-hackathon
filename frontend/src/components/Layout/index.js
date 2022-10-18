// import logo from './logo.svg';
import './layout.css';

function Layout(props) {
  return (
    <div className="container">
      <div className="nav-container">
        <h2>Guess It!</h2>
        <ul className="nav">
          <li>
            Explore
          </li>
          <li>Create</li>
          <li>How To</li>
          <li>About</li>
        </ul>
        <div></div>
      </div>
      <div className="content">
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
