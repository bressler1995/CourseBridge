import { Children, cloneElement } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Definitions({children}) {
  Children.map(children, (child, idx) => {
    console.log(child);
    return '';
  });

  return (
    <Accordion defaultActiveKey="0">

    </Accordion>
  );
  
}

export default Definitions