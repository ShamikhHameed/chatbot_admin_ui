import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableDiv from './DraggableDiv';
import './DragDrop.css';

const PipelineComponentsList = [
  {
    id: 1,
    name: 'Tokenizer'
  },
  {
    id: 2,
    name: 'Featurizer'
  },
  {
    id: 3,
    name: 'DIETClassifier'
  }
];

export default function DragDrop() {
  const [PipelineComponentsList, setPipelineComponentsList] = useState([
    {
      id: 1,
      name: 'Tokenizer'
    },
    {
      id: 2,
      name: 'Featurizer'
    },
    {
      id: 3,
      name: 'DIETClassifier'
    }
  ]);
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'div',
    drop: (item) => addDivToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addDivToBoard = (id) => {
    const pipelineComponentsList = PipelineComponentsList.filter((div) => id === div.id);
    setBoard((board) => [...board, pipelineComponentsList[0]]);
  };

  return (
    <>
      <div className="PipelineComponents">
        {PipelineComponentsList.map((div) => (
          <DraggableDiv name={div.name} id={div.id} />
        ))}
      </div>
      <div className="Board" ref={drop}>
        {board.map((div) => (
          <DraggableDiv name={div.name} id={div.id} />
        ))}
      </div>
    </>
  );
}
