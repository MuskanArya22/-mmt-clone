import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/homepage';
import { ChakraProvider } from '@chakra-ui/react';
import FlightResults from "./screens/FlightResults";
import BusResults from "./screens/BusResults";

const App = () => {
  return (
    <Router>
      <ChakraProvider resetCSS={false}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<FlightResults />} />
          <Route path="/bus-results" element={<BusResults />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
};

export default App;