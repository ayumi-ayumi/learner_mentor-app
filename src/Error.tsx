import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  // // const error = useRouteError();
  // const error = useRouteError() as { statusText?: string; message?: string };
  // console.error(error);

  return (
    <>
      <div id="error-page">
        <h1>Oops!</h1>
        <div>
          <h1>Sorry, the page you were looking for was not found.</h1>
          <Link to="/" className="link-button">
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
}