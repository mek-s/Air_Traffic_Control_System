
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchFlightsData = async () => {
  const urls = [
    'http://127.0.0.1:3001/flights',
    'http://127.0.0.1:3002/flights'
  ];

  try {
    const response = await fetch(urls[0]);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${urls[0]}`, error);
  }

  try {
    const response = await fetch(urls[1]);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${urls[1]}`, error);
    throw new Error('Failed to fetch data from both servers');
  }
};
export default fetchFlightsData;
