import React from 'react';
import img from '../../public/images/recipe-10.jpg';
import photo from '../../public/images/recipe-11.jpg';

/* eslint-disable no-unused-vars */

const aboutSection = (props) => {
  return (
    <div className="container">
      <section id="About" className="section-about">
        <div>
          <p><span className="about">More-Recipes</span> provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt. Suppose a user comes up with a food recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.</p>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-3">
            <img className="img-fluid" src={img} />
          </div>
          <div className="col-md-6 col-sm-3">
            <img className="img-fluid" src={photo} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default aboutSection;