import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';

import '../assets/styles/App.scss';

const App = () => {

  const [videos, setVideos] = useState({ 'myList': [], 'trends': [], 'originals': [] }); // useState recibe diferentes tipos de datos booleanos, arreglos, strings

  // useEffect recibe dos parámetros el primero es una función y el segundo es una propiedad que escucha cambios en propiedades para volver a ejecutarse, si no se pasa ese parámetro se ejecuta indefinidamente
  useEffect(() => {
    fetch('http://localhost:3000/initialState/')
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <Search />
      {
        videos.myList?.length > 0 &&
        (
          <Categories title="Mi lista">
            <Carousel>
              <CarouselItem />
            </Carousel>
          </Categories>
        )
      }

      <Categories title="Tendencias">
        <Carousel>
          {
            videos.trends?.forEach((item) => {
              <CarouselItem key={item.id} {...item} />;
            })
          }
        </Carousel>
      </Categories>

      <Categories title="Originales de Platzi Video">
        <Carousel>
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
        </Carousel>
      </Categories>

      <Footer />
    </div>
  );
};

export default App;
