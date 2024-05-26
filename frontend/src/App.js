
import MapComponent from './MapComponent';
import Vole from './Vole';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
   <>
      <div className=' flex flex-row justify-center items-center'>
      <div className=' w-2/5'>
      <Vole/>
      </div>
      <div className=' w-3/5'>
      <MapComponent />
      </div>
      </div>
      <ToastContainer />
   </>
  )
}

export default App;
