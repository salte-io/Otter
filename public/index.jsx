import { config } from './config';

const root = document.getElementById('root');

if (config.isElectron) {
  root.style.minHeight = '100vh';
} else {
  root.style.margin = 'auto';
  root.style.height = `${config.height}px`;
  root.style.width = `${config.width}px`;
}

const promises = [
  import('react'),
  import('react-dom'),
  import('./components/App')
];

Promise.all(promises).then(([React, ReactDOM, { App }]) => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});

