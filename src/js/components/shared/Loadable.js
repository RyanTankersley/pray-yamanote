'use strict';

import React from 'react';
import Loading from './Loading.jsx';

class Loadable {
  consructor() {
    this.loading = true;
  }
  
  isLoading() {
    return this.loading === true;
  }

  stopLoading() {
    this.loading = false;
  }

  startLoading() {
    this.loading = true;
  }

  setLoading(loading) {
    this.loading = loading;
  }
  renderLoading() {
    return (<Loading />);
  }
}

module.exports = Loadable;