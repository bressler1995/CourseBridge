import './InfoBox.css';
import Alert from 'react-bootstrap/Alert';
import { GoInfo } from "react-icons/go";

function InfoBox({message='This is a default message.'}) {
    
    return (
      <Alert key='info' variant='info' className='os101_simpleInfoBox'>
        <GoInfo/> {message}
      </Alert>
    );
}

export default InfoBox