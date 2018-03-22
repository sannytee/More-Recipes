import React from 'react';
import img from '../../public/images/recipe-10.jpg';
import photo from '../../public/images/recipe-11.jpg';

const about = ' provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt. Suppose a user comes up with a food recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.';

const AboutSection = () => (
  <div className="container">
    <section id="About" className="section-about">
      <div>
        <p>
          <span className="about">More-Recipes</span>
          { about }
        </p>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-3">
          <img className="img-fluid" src={img} alt="recipe" />
        </div>
        <div className="col-md-6 col-sm-3">
          <img className="img-fluid" src={photo} alt="recipe" />
        </div>
      </div>
    </section>
  </div>
);

export default AboutSection;
