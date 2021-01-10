import React from 'react';
import PropTypes from 'prop-types';
import { useLayoutStyles } from '../../styles';
import SEO from '../shared/Seo';
import Navbar from '../shared/Navbar';

function Layout({ children, minimalNavbar = false, title, marginTop = 60 }) {
  const classes = useLayoutStyles();

  return (
    <section className={classes.section}>
      <SEO title={title} />
      <Navbar minimalNavbar={minimalNavbar} />
      <main className={classes.main} style={{ marginTop }}>
        <section className={classes.childrenWrapper}>
          <div className={classes.children}>{children}</div>
        </section>
      </main>
    </section>
  );
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  minimalNavbar: PropTypes.bool,
  title: PropTypes.string,
  marginTop: PropTypes.number,
};

export default React.memo(Layout);
