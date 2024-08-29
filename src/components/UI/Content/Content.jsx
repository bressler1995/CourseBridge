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
  
      // console.log(result);
  
      setContentElements(result);
    }

    // if(tables != null) {
    //   for(let i = 0; i < tables.length; i++) {
    //     let current_table = tables[i];
    //     let current_html = current_table.innerHTML;
    //     let current_head = current_table.getElementsByTagName('thead');
    //     let current_tr = current_table.getElementsByTagName('tr');
    //     let current_th = current_table.getElementsByTagName('th');
    //     let has_two = false;

    //     if(current_tr != null & current_tr.length > 0) {
    //       let current_td = current_tr[0].getElementsByTagName('td');

    //       if(current_td != null && current_td.length == 2) {
    //         has_two = true;
    //       }
    //     }

    //     if(current_head == null) {
    //       current_table.innerHTML = '<thead><th>Title</th><th>Description</th></thead>' + current_html;
    //     }
        
    //   }
    // }
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

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export default Content