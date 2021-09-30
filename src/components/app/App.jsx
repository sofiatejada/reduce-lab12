import React, { useReducer } from 'react';

const initialValue = {
  before: [],
  current: '#FF0000',
  after: [],
};



const appReducer = (state, action) => {
  const { before, current, after } = state;
  switch (action.type) {
    case 'redo':
      return {
        before: [...before, current],
        current: after[0],
        after: after.slice(1),
      };
    case 'undo':
      return {
        after: [current, ...after],
        current: before[before.length - 1],
        before: before.slice(0, -1),
      };
    case 'record':
      return {
        ...state,
        before: [...before, current],
        current: action.payload,
      };
  }
};

// const useRecord = (init) => {
//   const [before, setBefore] = useState([]);
//   const [current, setCurrent] = useState(init);
//   const [after, setAfter] = useState([]);

//   const undo = () => {
//     setAfter(after => [current, ...after]);
//     setCurrent(before[before.length - 1]);
//     setBefore(before => before.slice(0, -1));
//   };

//   const redo = () => {
//     setBefore(before => [...before, current]);
//     setCurrent(after[0]);
//     setAfter(after => after.slice(1));
//   };

//   const record = val => {
//     setBefore(before => [...before, current]);
//     setCurrent(val);
//   };

//   return {
//     undo,
//     record,
//     redo,
//     current,
//   };
// };

function App() {
  // const { current, undo, redo, record } = useRecord('#FF0000');

  const [state, dispatch] = useReducer(appReducer, initialValue);
  const color = initialValue.current;

  const record = ({ target }) => {
    dispatch({
      type: 'undo',
      payload: target.value,
    });
  };

  const undo = () => {
    dispatch({
      type: 'undo'
    });
  };

  const redo = () => {
    dispatch({
      type: 'redo'
    });
  };
  console.log(color);

  return (
    <>
      <button 
        aria-label="undo-button" 
        onClick={undo}>
          undo
      </button>
      <button 
        aria-label="redo-button" 
        onClick={redo}>
          redo
      </button>
      <input 
        aria-label="color-picker" 
        type="color" 
        value={color} 
        onChange={record} />
      <div 
        aria-label="display" 
        style={{ 
          backgroundColor: color, width: '10rem', height: '10rem' 
        }}></div>
    </>
  );
}

export default App;
