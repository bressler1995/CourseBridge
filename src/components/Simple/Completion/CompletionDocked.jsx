import './Completion.css';
import { useContext } from 'react';
import { modeContext } from '../../../App';
import {useParams} from 'react-router-dom';

function CompletionDocked() {
  const [courseMode, handleCompletion, completion] = useContext(modeContext);

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
        <button onClick={() => {doit == true ? handleCompletion(idParam, newLid) : null}}>Complete Lesson</button>
    </div>
  );
  
}

export default CompletionDocked