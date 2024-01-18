import React from "react";

function RegisterPage() {
  return (
    <form action="#" className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mb-5">Sign up</h2>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingUsername" placeholder="Username" />
        <label htmlFor="floatingUsername">Username</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingEmail">Email address</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <input type="submit" value="Register" className="my-4 btn btn-primary" />

      <p className="">Or Sign in with social platforms</p>
      <div className="w-100 d-flex justify-content-evenly">
        <a className="fs-2 btn btn-primary">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a className="fs-2 btn btn-primary">
          <i className="fa-brands fa-google"></i>
        </a>
        <a className="fs-2 btn btn-primary">
          <i className="fa-brands fa-square-instagram"></i>
        </a>
      </div>
    </form>
  );
}

export default RegisterPage;