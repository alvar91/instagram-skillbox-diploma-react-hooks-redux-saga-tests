import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ErrorPage from '../../pages/error-page';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
    this.clearState = this.clearState.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  clearState() {
    this.setState({ hasError: false, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage errorInfo={this.state.errorInfo} clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};

export default ErrorBoundary;