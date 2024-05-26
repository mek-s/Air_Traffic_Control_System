// src/utils/fetchPlanesData.js
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchPlanesData = async () => {
  const urls = [
    'http://127.0.0.1:3001/planes_data',
    'http://127.0.0.1:3002/planes_data'
  ];

  try {
    const response = await fetch(urls[0]);
    if (!response.ok) throw new Error('Network response was not ok');
    toast.success('Connected to server 1 '); 
    return await response.json();
  } catch (error) {
    toast.error('Problem in server 1, Connected to server 2');
    console.error(`Failed to fetch data from ${urls[0]}`, error);
  }

  try {
    const response = await fetch(urls[1]);
    if (!response.ok) throw new Error('Network response was not ok');
    toast.success('Connected to server 2 '); 
    return await response.json();
  } catch (error) {
    toast.error('Failed to fetch data from both servers');
    console.error(`Failed to fetch data from ${urls[1]}`, error);
    throw new Error('Failed to fetch data from both servers');
  }
};
export default fetchPlanesData;
