import './Completion.css';
import { useContext } from 'react';
import { modeContext } from '../../../App';
import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CompletionDocked() {
  const [courseMode, handleCompletion, completion, handleLessonCompletion] = useContext(modeContext);

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let newLid;
  let doit = false;

  if(idParam != null && lidParam != null) {
    doit = true;
    newLid = lidParam;
  } else if(idParam != null && lidParam == null) {
    doit = true;
    
    newLid = completion[idParam - 1][0].id;
  } 

  return (
    <div className="os101_CompletionDocked">
        <Button onClick={() => {doit == true ? handleCompletion(idParam, newLid) : null}} variant="primary">Complete Lesson</Button>
    </div>
  );
  
}

export default CompletionDocked