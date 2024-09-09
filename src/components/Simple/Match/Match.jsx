import React, {useState, Children} from 'react';
import {DndContext} from '@dnd-kit/core';
import MatchDraggable from './MatchDraggable';
import MatchDroppable from './MatchDroppable';

function Match({children}) {
  const initParents = Children.map(children, (child, index) => {

    if(child.type.name == 'MatchDraggable') {
      console.log(child);
      return ['null', child.props.title, child.props.id];
    }

  });

  const droppables = Children.map(children, (child, index) => {

    if(child.type.name == 'MatchDroppable') {
      return [child.props.title, child.props.id];
    }

  });

  console.log(initParents);

  const [parents, setParents] = useState(initParents);
  const draggable = (
    <MatchDraggable id="draggable">
      Go ahead, drag me.
    </MatchDraggable>
  );

  return (
    <div class='os101_simpleMatch'>
    <DndContext onDragEnd={handleDragEnd}>
      <div className='os101_simpleMatch_draggables'>
      {parents.map((child) => {
        if(child[0] == 'null') {
          return <MatchDraggable title={child[1]} id={child[2]}></MatchDraggable>;
        } else {
          return null;
        }
      })}
      </div>
      <div className='os101_simpleMatch_droppables'>
      {droppables.map((child) => {
        let result = 'Drop here';

        for(let i = 0; i < parents.length; i++) {
          let current_parent = parents[i];
          
          if(current_parent[0] == child[1]) {
            result = current_parent[1];
          }
        }

        <MatchDroppable title={child[0]} id={child[1]}>
          {result}
        </MatchDroppable>
      })}
      </div>

    </DndContext>
    </div>
  );

  function handleDragEnd({over}) {
    setParents(over ? over.id : null);
  }
}

export default Match