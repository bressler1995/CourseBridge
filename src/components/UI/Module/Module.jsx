import {useParams} from 'react-router-dom';
import { createElement } from 'react';

function Module(file) {

  const params = useParams();
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return <h1>{params.id}</h1>;
  
}

export default Module