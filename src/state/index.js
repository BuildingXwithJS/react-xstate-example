import { createContext } from 'react';
import { assign, Machine, spawn } from 'xstate';
import { auth } from './auth';
import { createStoryMachine } from './story';

export const MachineContext = createContext();

const storiesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const getStoryDataUrl = id =>
  `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

const fetchStories = async () => {
  const storyIds = await fetch(storiesUrl).then(r => r.json());
  const topTenStories = await Promise.all(
    storyIds
      .slice(0, 10)
      .map(id => getStoryDataUrl(id))
      .map(url => fetch(url).then(r => r.json()))
  );
  return topTenStories;
};

export const appMachine = Machine({
  id: 'app',
  initial: 'init',
  context: {
    user: undefined,
    error: undefined,
    stories: [],
    selectedStory: undefined
  },
  states: {
    init: {},

    auth,

    list: {
      states: {
        loading: {
          invoke: {
            id: 'fetchStories',
            src: fetchStories,
            onDone: {
              target: 'success',
              actions: assign({ stories: (context, event) => event.data })
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
    },

    stories: {
      states: {
        selected: {}
      }
    }
  },
  on: {
    LOGIN: {
      target: 'auth.started'
    },
    LOAD_STORIES: {
      target: 'list.loading'
    },
    SELECT_STORY: {
      target: 'stories.selected',
      actions: assign((context, event) => {
        const newStoryMachine = spawn(createStoryMachine(event.story));
        return { selectedStory: newStoryMachine };
      })
    }
  }
});
