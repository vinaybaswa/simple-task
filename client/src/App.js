import React, { useState, createContext, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import Navbar               from './components/Navbar';
import CheckoutForm         from './components/Stripe/CheckoutForm';
import Home                 from './pages/Home';
import About                from './pages/About';
import Login                from './pages/Login';
import Register             from './pages/Register';
import Users                from './pages/Users';
import User                 from './pages/User';
import Services             from './pages/Services';
import Service              from './pages/Service';
import TasksNew             from './pages/TasksNew';
import Task                 from './pages/Task';
import TaskComplete         from './pages/TaskComplete';
import TaskPayment          from './pages/TaskPayment';
import PaymentSuccess       from './pages/PaymentSuccess';
import Search               from './pages/Search';
import ChatBox              from './components/ChatBox';

const AppContext = createContext();
const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);

export default function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      return setSocket(new WebSocket(process.env.REACT_APP_WEBSOCKET_URL));
    }
  }, [token])

  // does it need to be in a useEffect?
  if (socket) {

    socket.onopen = function () {
      socket.send(JSON.stringify({ event: "connection", token }));
    };

    if (!token) {
      socket.send(JSON.stringify({ event: "disconnection" }));
      socket.close();
    }
  }


  return (
    <AppContext.Provider value={{ token, setToken }}>
      <Router>
        <div>
          <Navbar />
          <AppContext.Consumer>
            {token => <ChatBox token={token} socket={socket} />}
          </AppContext.Consumer>
          <Switch>
            <Route exact path="/">                           <Home />            </Route>
            <Route path="/about">                            <About />           </Route>
            <Route path="/login">                            <Login />           </Route>
            <Route path="/register">                         <Register />        </Route>
            <Route exact path="/users">                      <Users />           </Route>
            <Route path="/users/:id">                        <User />            </Route>
            <Route exact path="/categories/:id">             <Services />        </Route>
            <Route path="/categories/:c_id/services/:id">    <Service />        </Route>
            <Route path="/tasks/new">                        <TasksNew />        </Route>
            <Route exact path="/tasks/:id">                  <Task />            </Route>
            <Route path="/tasks/:id/complete">               <TaskComplete />    </Route>
            <Route exact path="/tasks/:id/payment">          <TaskPayment />     </Route>
            <Route path="/tasks/:id/payment/stripe">
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </Route>
            <Route path="/tasks/:id/payment/success">         <PaymentSuccess /> </Route>
            <Route path="/search">                           <Search />          </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export { AppContext }; 