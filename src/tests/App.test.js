import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('app');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

