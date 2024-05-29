import { lazy, Suspense } from 'react';
import {useParams} from 'react-router-dom';

import Module1 from '../../../content/Module1.mdx';
import Module2 from '../../../content/Module2.mdx';
import Module3 from '../../../content/Module3.mdx';

function Module() {

  const params = useParams();
  let idParam = params.id;
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return (idParam == 1 ? <Module1/> : idParam == 2 ? <Module2/> : idParam == 3 ? <Module3/> : <Module1/>);
  
}

export default Module