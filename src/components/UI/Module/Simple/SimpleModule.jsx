import { lazy, Suspense, createElement } from 'react';
import {useParams} from 'react-router-dom';
import parse from 'html-react-parser';
import toc from '../../../../toc.json';

import Module1 from '../../../../content/clone/Module_1/readme.mdx';
import Module2 from '../../../../content/clone/Module_2/readme.mdx';
import Module3 from '../../../../content/clone/Module_3/readme.mdx';
import Module4 from '../../../../content/clone/Module_4/readme.mdx';
import Module5 from '../../../../content/clone/Module_5/readme.mdx';

const modules = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5
}

function SimpleModule() {

  const params = useParams();
  let idParam = params.id;
  
  return (
    toc.map((child) => {
      if(child.id === idParam) {
        let componentString = child.use;
        componentString = parse(componentString)

        return createElement(
          modules[child.id],
          { className: '' }
        );
      }
    })
  )
  
}

export default SimpleModule