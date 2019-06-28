import React from 'react';

import Routes from './routes';
import StatusBar from './components/statusbar';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#213257" barStyle="light-content" />
      <Routes />
    </>
  );
}
