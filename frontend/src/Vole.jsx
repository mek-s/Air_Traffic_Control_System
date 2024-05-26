import React , {useState , useEffect} from 'react'
import { BiHomeAlt, BiTime } from 'react-icons/bi';
import { FaPlaneCircleCheck } from "react-icons/fa6";
import { FaPlaneDeparture , FaPlaneArrival } from "react-icons/fa";
import plane from './plane.svg'; 
import fetchFlightsData from './flightsData'; 
function Vole() {
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const getData = async () => {
        try {
          const data = await fetchFlightsData();
          setFlights(data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      getData();
    }, []);

  return (
    <>
    <div className='h-screen bg-white  rounded shadow-lg'>
        <div className=' w-full flex flex-row justify-between p-4 items-center'>
        <h2 className=' text-Bleunuit text-3xl font-extrabold uppercase'>Liste des vols :</h2>
        <img src={plane} alt="plane" className=' w-28 h-28'/>
        </div>
      
       <table>
        <thead className="bg-gray-50 ">
          <tr>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <FaPlaneCircleCheck className="inline-block mr-2" /> Num vol
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <BiHomeAlt className="inline-block mr-2" /> Avion
            </th>
            <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <FaPlaneDeparture className="inline-block mr-2" /> De
            </th>
            <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <FaPlaneArrival className="inline-block mr-2" /> À
            </th>
            <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <BiTime className="inline-block mr-2" /> H-départ
            </th>
            <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase items-center">
              <BiTime className="inline-block mr-2" /> H-d'arrivée
            </th>
          </tr>
        </thead>
        <tbody className='divide-x divide-black'>
          {flights.map((flight, index) => (
            <tr key={flight.num_flight} className={index % 2 === 0 ? ' bg-Jaune text-black' : 'bg-white text-Bleunuit'}>
              <td className=" px-2 py-4 whitespace-nowrap">{flight.num_flight}</td>
              <td className=" px-2 py-4 whitespace-nowrap">{flight.plane}</td>
              <td className="px-2 py-4 whitespace-nowrap">{flight.from}</td>
              <td className=" px-2 py-4 whitespace-nowrap">{flight.to}</td>
              <td className="px-2 py-4 whitespace-nowrap">{new Date(flight.hour_launching).toLocaleTimeString()}</td>
              <td className="px-2 py-4 whitespace-nowrap">{new Date(flight.hour_arrival).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Vole