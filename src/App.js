import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <div className='flex'>
            <FontAwesomeIcon icon={faUserCircle} size='6x' />
            <div className='my-auto ml-7'>
              <h1 className='text-3xl font-bold'>User Name</h1>
              <h1 className='text-left mt-3'>
                Jumlah Post:
                <span className='underline mx-1'>
                  00
                </span>
                Post
              </h1>
            </div>
          </div>
          <button className='bg-blue-700 w-full rounded text-white font-bold mt-2'>Add Post</button>
        </div>
        <div className='grid grid-flow-row grid-cols-3 gap-4 mt-5'>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
        </div>
      </div>
    </div>
  );
}

export default App;
