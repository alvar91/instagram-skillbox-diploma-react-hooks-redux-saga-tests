import React from "react";
import PropTypes from 'prop-types';
import Layout from "../components/shared/Layout";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

function ErrorPage({ errorInfo, clearState }) {
  const navigateToHomePage = () => {
    clearState();
    window.location.reload();
  };

  return (
    <Layout minimalNavbar title="Error page" marginTop={120}>
      <Typography variant="h5" align="center" paragraph>
        {errorInfo ? errorInfo : "Sorry, something went wrong."}
      </Typography>
      <Typography align="center" onClick={() => navigateToHomePage()}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigateToHomePage()}
            fullWidth
          >
            Go back to Instagram.
          </Button>
      </Typography>
    </Layout>
  );
}

ErrorPage.propTypes = {
  errorInfo: PropTypes.string.isRequired,
  clearState: PropTypes.func.isRequired,
};

export default ErrorPage;
