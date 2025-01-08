import PropTypes from "prop-types";

export const ErrorPage = ({ error, from }) => {
  return (
    <div className="absolute position-start error-page flex failure">
      <form className="error-form" >
        <p>{from}</p>
        <p className="error-code">{error?.statusCode ? error.statusCode : "Error"}</p>
        <p>{error?.statusText ? error.statusText : "Something went wrong"}</p>
        <p className="error-message">{error?.message}</p>
      </form>
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.shape({
    statusCode: PropTypes.number || PropTypes.string,
    statusText: PropTypes.string,
    message: PropTypes.string,
  }),
  from: PropTypes.string,
};
