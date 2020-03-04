import { assign } from 'xstate';

const doLogin = async (context, event) => {
  const { username, password } = event;
  if (username !== 'hello' && password !== '123') {
    throw new Error('Wrong username or password!');
  }
  return { username, password };
};

export const auth = {
  states: {
    started: {
      invoke: {
        id: 'doLogin',
        src: doLogin,
        onDone: {
          target: 'success',
          actions: assign({ user: (context, event) => event.data })
        },
        onError: {
          target: 'fail',
          actions: assign({ error: (context, event) => event.data })
        }
      }
    },
    success: {},
    fail: {}
  }
};
