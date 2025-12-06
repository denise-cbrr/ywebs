import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero';
import About from './components/about/about';
import Services from './components/services/services';
import Faqs from './components/faqs/faqs';
import Developers from './components/developers/developers';
import Login from './components/register/register';


function App() {
  // const [count, setCount] = useState(0);
  // const [array, setArray] = useState([]);


  // const fetchAPI = async() => {
  //   const response = await axios.get("http://localhost:8080/api");
  //   setArray(response.data.fruits);
  //   console.log(response.data.fruits)
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Developers />
      <Faqs />
      <Login />
   </>


  );
}

export default App;
