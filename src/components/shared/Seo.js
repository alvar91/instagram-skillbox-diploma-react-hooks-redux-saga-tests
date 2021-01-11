import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

function SEO({ title }) {
  const titleText = title ? `${title} · Instagram` : "Instagram";

  return (
    <Helmet>
      <title>{titleText}</title>
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
};

export default SEO;
