import { useService } from '@xstate/react';
import React from 'react';

function Story({ selectedStory }) {
  const [storyService, sendToStory] = useService(selectedStory);

  const { story, comments } = storyService.context;

  return (
    <div className="">
      <h2>{story.title}</h2>

      {storyService.matches('loading') && <h3>Loading..</h3>}

      {comments.map(comment => (
        <div key={comment.id}>
          {comment.text} by {comment.by}
        </div>
      ))}
    </div>
  );
}

export default Story;
