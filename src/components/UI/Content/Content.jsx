import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './Content.css';
import SimpleSidebar from '../Module/Simple/SimpleSidebar';

function Content({children, isMinimal = false, isHorizontal = false, isSimple = false, show}) {
  // if(isMinimal == true) {
  //   window.parent.document.getElementById('myframe').height = '1000px';
  // }

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;

  let contentClasses = 'os101Content';
  const contentRef = useRef(null);
  const [contentElements, setContentElements] = useState(0);

  useEffect(() => {
    let result = [];
    const elements = contentRef.current;
    let titles = elements.getElementsByTagName("h2");

    if(titles != null) {
      for(let i = 0; i < titles.length; i++) {
        let current_title = titles[i].innerHTML;
        result.push(current_title);
      }
  
      console.log(result);
  
      setContentElements(result);
    }
  }, [idParam, lidParam]);


  if(isMinimal == true) {
    contentClasses = contentClasses + ' ' + 'minimalContent';
  }

  if(isHorizontal == true) {
    contentClasses = contentClasses + ' ' + 'horizontalContent';
  }

  if(isSimple == true) {
    contentClasses = contentClasses + ' ' + 'simpleContent';
  }


  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div id='os101Content' className={contentClasses}>
      {isSimple == true ? <><SimpleSidebar content={contentElements}/><div className='simpleContent_wrapper'><div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div></div></> : <div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div>}
    </div>
  )
}

export default Content