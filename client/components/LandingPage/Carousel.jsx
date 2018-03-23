import React from 'react';
import banner from '../../public/images/banner-img-4.jpg';
import bannerTwo from '../../public/images/banner-img-2.jpg';
import bannerOne from '../../public/images/banner-img-1.jpg';

const Carousel = () => (
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="" />
      <li data-target="#carouselExampleIndicators" data-slide-to="1" className="active" />
      <li data-target="#carouselExampleIndicators" data-slide-to="2" className="" />
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item">
        <img className="d-block w-100" src={bannerOne} alt="First slide" />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="cal-big">Paunch bunger be thrice the person you wanna be</h1>
        </div>
      </div>
      <div className="carousel-item active">
        <img className="d-block w-100" src={bannerTwo} alt="Second slide" />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="cal-big">Cheese Pizza spicy blue cheese char! </h1>
        </div>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={banner} alt="Third slide" />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="cal-big">Paunch bunger be thrice the person you wanna be</h1>
        </div>
      </div>
    </div>
    <a
      className="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </div>
);

export default Carousel;
