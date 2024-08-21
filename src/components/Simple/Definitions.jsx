import { Children, cloneElement } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Definitions({children}) {
  Children.map(children, (child, idx) => {
    console.log(cloneElement(child, { ref: idx }));
    return '';
  });

  return (
    ''
  );
  
}

export default Definitions