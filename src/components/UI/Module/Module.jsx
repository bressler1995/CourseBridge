import {useParams} from 'react-router-dom';
import { createElement } from 'react';
import parse from 'html-react-parser';
import toc from '../../../toc.json';
import Module1 from '../../../content/Module1.mdx';
import Module2 from '../../../content/Module2.mdx';
import Module3 from '../../../content/Module3.mdx';

function Module() {

  const params = useParams();
  let currentModule = '<Module1/>';

  toc.map((child, i) => {
    if(parseInt(child.id) == params.id) {
      currentModule = '<' + child.file + '/>';
    }
  });
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return <>{params.id == 1 ? <Module1/> : params.id == 2 ? <Module2/> : params.id == 3 ? <Module3/> : <Module1/>}</>;
  
}

export default Module