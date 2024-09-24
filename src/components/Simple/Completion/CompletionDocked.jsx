import './Completion.css';
import { useContext } from 'react';
import { modeContext } from '../../../App';
import {useParams} from 'react-router-dom';

function CompletionDocked() {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;

  const mode = useContext(modeContext);
  let handleCompletion = mode.handleCompletion;
  
  const triggerCompletion = () => {
        if(idParam != null && lidParam != null) {
          handleCompletion(idParam, lidParam);
        }
  };

  return (
    <div className="os101_CompletionDocked">
        <button onClick={triggerCompletion}>Complete Lesson</button>
    </div>
  );
  
}

export default CompletionDocked