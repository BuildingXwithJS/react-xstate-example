import React from 'react';

function Stories({ stories, sendToMachine }) {
  const selectStory = (e, story) => {
    e.preventDefault();
    sendToMachine('SELECT_STORY', { story });
  };

  return (
    <div className="">
      {stories.map(story => (
        <div key={story.id}>
          <a href="#" onClick={e => selectStory(e, story)}>
            {story.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Stories;
