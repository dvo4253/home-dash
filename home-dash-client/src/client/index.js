import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
// import createStore from './store/createStore'
// import makeFetch from './utils/make-fetch'
// import makePut from './utils/make-put'
import Entry from './entry';

const renderEntry = (Component) => {
  const store = createStore(window.__STATE__, makeFetch, makePut);

  if (window.newrelic) {
    window.newrelic.setCustomAttribute('nmUniqueId', window.__STATE__.meta.nmUniqueId);
  }

  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderEntry(Entry);

if (module.hot) {
  module.hot.accept('./entry', () => {
    const RootContainer = require('./entry').default;
    renderEntry(RootContainer);
  });
}
