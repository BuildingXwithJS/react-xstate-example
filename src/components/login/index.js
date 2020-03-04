import React, { useContext, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { MachineContext } from 'state';

function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const [machine, sendToMachine] = useContext(MachineContext);
  const { error } = machine.context;

  const doLogin = () => {
    const username = userRef.current.value;
    const password = passRef.current.value;
    sendToMachine('LOGIN', { username, password });
  };

  return (
    <div className="">
      <h1>Login</h1>

      <div>
        <input type="text" placeholder="username" defaultValue="hello" ref={userRef} />
      </div>
      <div>
        <input type="password" placeholder="password" defaultValue="123" ref={passRef} />
      </div>
      {machine.matches('auth.fail') && (
        <div style={{ color: 'red' }}>{error.toString()}</div>
      )}
      <div>
        <button onClick={doLogin}>Login</button>
      </div>

      {machine.matches('auth.success') && <Redirect to="/" />}
    </div>
  );
}

export default Login;
