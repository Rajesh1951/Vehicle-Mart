import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Components/Home';
import { ChakraProvider } from '@chakra-ui/react';
import { MyProvider } from './Contexts/AuthContext';
import RequireAuth from './Components/RequireAuth';
import theme from './Components/theme';
const Dealer = lazy(() => import('./Components/Dealer'))
const User = lazy(() => import('./Components/User'))
const Logout = lazy(() => import('./Components/Logout'));
const Login = lazy(() => import('./Components/Login'));
const About = lazy(() => import('./Components/About'));
const Contact = lazy(() => import('./Components/Contact'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
          <Routes>
            <Route path="/dealer" element={
              <RequireAuth>
                <Suspense>
                  <Dealer />
                </Suspense>
              </RequireAuth>
            } />
            <Route path="/home" element={
              <RequireAuth>
                <Suspense>
                  <Home />
                </Suspense>
              </RequireAuth>
            } />
            <Route path="/user" element={
              <RequireAuth>
                <Suspense>
                  <User />
                </Suspense>
              </RequireAuth>
            } />
            <Route path="/about" element={
              <RequireAuth>
                <Suspense>
                  <About />
                </Suspense>
              </RequireAuth>
            } />
            <Route path="/contact" element={
              <RequireAuth>
                <Suspense>
                  <Contact />
                </Suspense>
              </RequireAuth>
            } />
            <Route path='/logout' element={<Logout />} />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </MyProvider>
  </React.StrictMode>
);