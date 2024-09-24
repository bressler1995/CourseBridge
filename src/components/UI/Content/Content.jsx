import { useRef, useState, useLayoutEffect, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import './Content.css';
import SimpleSidebar from '../Module/Simple/SimpleSidebar';

function Content({children, isMinimal = false, isHorizontal = false, isSimple = false, show, handleCompletion}) {
  // if(isMinimal == true) {
  //   window.parent.document.getElementById('myframe').height = '1000px';
  // }

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;

  let contentClasses = 'os101Content';
  const contentRef = useRef(null);
  const [contentElements, setContentElements] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const position = Math.ceil(
            (scrollTop / (scrollHeight - clientHeight)) * 100
        );
        console.log(position);

        if(idParam != null && lidParam != null && position >= 98) {
          console.log('Handling completion');
          handleCompletion(idParam, lidParam)
        }
  };

  useEffect(() => {
    let result = [];
    const elements = contentRef.current;
    let tables = elements.getElementsByTagName("table");
    let titles = elements.getElementsByTagName("h2");

    if(titles != null) {
      for(let i = 0; i < titles.length; i++) {
        let current_title = titles[i].innerHTML;
        let current_slug = slugify(current_title);
        let current_class = titles[i].className;

        if(current_class != 'accordion-header') {
          titles[i].id = current_slug;
          result.push([current_title, current_slug, current_class]);
        }
        
      }
  
      setContentElements(result);
    } else {
      setContentElements(0);
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
      {isSimple == true ? <><SimpleSidebar content={contentElements}/><div onScroll={handleScroll} className='simpleContent_wrapper'><div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div></div></> : <div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div>}
    </div>
  )
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export default Content