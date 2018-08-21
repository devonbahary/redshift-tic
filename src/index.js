import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'redux/createStore';
import Welcome from 'routes/Welcome';
import Play from 'routes/Play';
import HistoryList from 'routes/HistoryList';
import HistoricalGame from 'routes/HistoricalGame';
import './styles/core.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/play" component={Play} />
        <Route exact path="/history" component={HistoryList} />
        <Route exact path="/history/:gameId" component={HistoricalGame} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
