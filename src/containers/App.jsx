import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';

import '../assets/styles/App.scss';

const App = () => {

  async function getTvShow(id) {
    const url = `http://api.tvmaze.com/shows/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Generate an array with a specified quantity of random numbers (ids)
  function getArrOfIds(maxNumOfItems = 3) {
    const arrOfIds = [];
    const maxIdNumber = 2000; // TVMaze shows ids can be even higher,  but I'll just work with ids from 1 to 2000 max
    while (arrOfIds.length <= maxNumOfItems) {
      const randomId = Math.floor(Math.random() * maxIdNumber);
      // Avoid any random id appears more than once in arrOfIds
      if (arrOfIds.indexOf(randomId) === -1) {
        arrOfIds.push(randomId);
      }
    }
    return arrOfIds;
  }

  async function getTvShows() {
    const numOfItems = 2;
    const arrOfIds = getArrOfIds(numOfItems);

    const tvShowPromises = arrOfIds.map((id) => getTvShow(id));

    const tvShows = await Promise.all(tvShowPromises);
    return tvShows;
  }

  const [videos, setVideos] = useState([]); // useState recibe diferentes tipos de datos booleanos, arreglos, strings

  // useEffect recibe dos parámetros el primero es una función y el segundo es una propiedad que escucha cambios en propiedades para volver a ejecutarse, si no se pasa ese parámetro se ejecuta indefinidamente
  useEffect(() => {
    const tvShows = getTvShows();
    tvShows
      .then((data) => setVideos(data));
  }, []);

  console.log(videos);

  return (
    <div className="App">
      <Header />
      <Search />

      { videos.length > 0 && (
        <Categories title="Mi lista">
          <Carousel>

            <CarouselItem image={videos[0]?.image?.original} name={videos[0]?.name} rating={videos[0]?.rating?.average} premiered={videos[0]?.premiered} />

            <CarouselItem image={videos[1]?.image?.original} name={videos[1]?.name} rating={videos[1]?.rating?.average} premiered={videos[1]?.premiered} />

            <CarouselItem image={videos[2]?.image?.original} name={videos[2]?.name} rating={videos[2]?.rating?.average} premiered={videos[2]?.premiered} />

          </Carousel>
        </Categories>
      )}

      { videos.length > 0 && (
        <Categories title="Tendencias">
          <Carousel>

            <CarouselItem image={videos[0]?.image?.original} name={videos[0]?.name} rating={videos[0]?.rating?.average} premiered={videos[0]?.premiered} />

            <CarouselItem image={videos[1]?.image?.original} name={videos[1]?.name} rating={videos[1]?.rating?.average} premiered={videos[1]?.premiered} />

            <CarouselItem image={videos[2]?.image?.original} name={videos[2]?.name} rating={videos[2]?.rating?.average} premiered={videos[2]?.premiered} />

          </Carousel>
        </Categories>
      )}

      { videos.length > 0 && (
        <Categories title="Populares ahora">
          <Carousel>

            <CarouselItem image={videos[0]?.image?.original} name={videos[0]?.name} rating={videos[0]?.rating?.average} premiered={videos[0]?.premiered} />

            <CarouselItem image={videos[1]?.image?.original} name={videos[1]?.name} rating={videos[1]?.rating?.average} premiered={videos[1]?.premiered} />

            <CarouselItem image={videos[2]?.image?.original} name={videos[2]?.name} rating={videos[2]?.rating?.average} premiered={videos[2]?.premiered} />

          </Carousel>
        </Categories>
      )}

      <Footer />
    </div>
  );
};

export default App;
