import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {BrowserRouter as Router} from 'react-router-dom';
import { ModalProvider } from 'react-modal-hook';

ReactDOM.render(
  <ModalProvider>
      <Router>
          <App />
      </Router>
  </ModalProvider>,
  document.getElementById('root')
);