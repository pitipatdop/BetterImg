import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const rootEl = document.getElementById('app')

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextRootApp = require('./containers/App').default
    render(
      <AppContainer>
        <NextRootApp />
      </AppContainer>,
      rootEl
    );
  });
}
