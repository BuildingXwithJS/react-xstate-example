import Stories from 'components/stories';
import Story from 'components/story';
import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { MachineContext } from 'state';

function Home() {
  const [machine, sendToMachine] = useContext(MachineContext);
  const { pathname } = useLocation();

  const { error, stories, selectedStory } = machine.context;

  useEffect(() => {
    sendToMachine('LOAD_STORIES');
  }, []);

  const storyUrl = `/story/${selectedStory?.machine?.context?.story?.id}`;

  return (
    <div className="">
      <h1>Home</h1>

      {machine.matches('list.loading') && <h2>Loading...</h2>}
      {machine.matches('list.fail') && (
        <div style={{ color: 'red' }}>
          Error loading stories: {error.toString()}
        </div>
      )}
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', maxWidth: 300 }}>
          {stories && stories.length > 0 && (
            <Stories stories={stories} sendToMachine={sendToMachine} />
          )}
        </div>
        <div style={{ display: 'flex' }}>
          <Switch>
            <Route path="/story/:id">
              <Story selectedStory={selectedStory} />
            </Route>
          </Switch>
        </div>
      </div>

      {machine.matches('stories.selected') && pathname !== storyUrl && (
        <Redirect to={storyUrl} />
      )}
    </div>
  );
}

export default Home;
