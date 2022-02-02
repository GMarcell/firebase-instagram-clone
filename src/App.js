import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='flex'>
        <FontAwesomeIcon icon={faUserCircle} size='6x' />
        <h1 className='underline'>Hello World</h1>
      </div>
    </div>
  );
}

export default App;
