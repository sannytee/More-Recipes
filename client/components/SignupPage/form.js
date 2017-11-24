import React from 'react';


/* eslint-disable no-unused-vars */
const Form = (props) => {
  return(
    <div className="container">
      <div className="pt-5" style={{textAlign:'center'}}>
        <form className="m-x-auto form card">
          <h1 className="signin-text">More-Recipes</h1>
          <div className="pb-4 pt-3 form-group">
            <input type="text" className="form-control" required placeholder="Username"/>
          </div>
          <div className="pb-4 form-group">
            <input type="email" className="form-control" required placeholder="Email"/>
          </div>  
          <div className="pb-4 form-group">
            <input type="password" className="form-control" required placeholder="Password"/>
          </div>
          <div className="pb-4 form-group">
            <input type="password" className="form-control" required placeholder="Confirm Password"/>
          </div>
          <button type="submit" className="btn signin-btn btn-lg" style={{color:'#f2b43c'}}>
            Create Account
          </button>
          <div className="form-group">
            <p>
              Already have an account? <a href="/signin">Log in.</a>
            </p>
          </div>
        </form> 
      </div>
    </div>
  );
  
};

export default Form;