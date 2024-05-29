import { lazy, Suspense } from 'react';
import {useParams} from 'react-router-dom';
import { createElement } from 'react';
import parse from 'html-react-parser';
import toc from '../../../toc.json';
import Module1 from '../../../content/Module1.mdx';
import Module2 from '../../../content/Module2.mdx';
import Module3 from '../../../content/Module3.mdx';

function renderLazyComponent(component) {
  return lazy(() => import('../../../content/' + component));
}

function Module() {

  const params = useParams();
  let CurrentModule = <></>;

  toc.map((child, i) => {
    if(parseInt(child.id) == params.id) {
      CurrentModule = renderLazyComponent(child.file + '.mdx');
    }
  });
  
  // TODO: Check this out- https://stackoverflow.com/questions/58785014/how-to-pass-string-into-react-router-dom-route-as-function
  return (
    <Suspense fallback={<div>Loading</div>}>
      <CurrentModule/>
    </Suspense>
  );
  
}

export default Module