import { useMachine } from '@xstate/react';
import Home from 'components/home';
import Login from 'components/login';
import PrivateRoute from 'components/privateroute';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { appMachine, MachineContext } from 'state';
import './App.css';

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);

  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute machine={currentMachine} path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </MachineContext.Provider>
  );
}

export default App;
