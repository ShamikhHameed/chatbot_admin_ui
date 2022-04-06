import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

export default function DraggableDiv({ id, name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'div',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  return (
    <div
      ref={drag}
      width="150px"
      style={{ border: isDragging ? '5px solid pink' : '0px', backgroundColor: 'red' }}
    >
      {name}
    </div>
  );
}
