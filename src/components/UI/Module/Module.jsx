import {useParams} from 'react-router-dom';
import { createElement } from 'react';

function Module(file) {

  const params = useParams();
  

  return <h1>{params.id}</h1>;
  
}

export default Module