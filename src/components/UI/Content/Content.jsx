import { useRef, useState, useLayoutEffect, useEffect, useContext } from 'react';
import {useParams} from 'react-router-dom';
import './Content.css';
import SimpleSidebar from '../Module/Simple/SimpleSidebar';
import { modeContext } from '../../../App';

function Content({children, isMinimal = false, isHorizontal = false, isSimple = false, show}) {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;

  const [courseMode, handleCompletion, completion, handleLessonCompletion] = useContext(modeContext);

  let contentClasses = 'os101Content';
  const contentRef = useRef(null);
  const [contentElements, setContentElements] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e) => {
      let scrolledH2 = e.target.getElementsByTagName("h2");
      // console.log(scrolledH2);
      // const { scrollTop, scrollHeight, clientHeight } = e.target;
      // const position = Math.ceil(
      //     (scrollTop / (scrollHeight - clientHeight)) * 100
      // );
      // console.log("Scrolling Content: " + position);

      for(let i = 0; i < scrolledH2.length; i++) {
        if(scrolledH2[i].classList.contains('accordion-header') == false) {
          applyObserver(scrolledH2[i]);
        }
      }
      
  };

  const applyObserver = (el) => {

    const observer = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // console.log('Element Viewed: ' + el.innerHTML + ", Element ID: " + el.id);
        handleLessonCompletion(idParam, lidParam, el.id);
        return
      }
      // console.log('LEAVE ' + el.innerHTML);
    }, {
      root: null,
      threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
    })
  
    observer.observe(el);
  };

  useEffect(() => {
    let result = [];
    const elements = contentRef.current;
    let tables = elements.getElementsByTagName("table");
    let titles = elements.getElementsByTagName("h2");
    let simpleContent_wrapper = document.getElementById("simpleContent_wrapper");

    if(simpleContent_wrapper != null) {
      simpleContent_wrapper.scrollTop = 0;
    }

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
      {isSimple == true ? <><SimpleSidebar content={contentElements}/><div id="simpleContent_wrapper" className='simpleContent_wrapper' onScroll={handleScroll} onResize={handleScroll}><div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div></div></> : <div ref={contentRef} id='os101Content_container' className='os101Content_container'>{children}</div>}
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