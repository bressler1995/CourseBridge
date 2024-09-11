import {Link, useParams} from 'react-router-dom';
import toc from '../../../../toc.json';
import './Simple.css';

function SimpleSidebar({content}) {

  //console.log(content)

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let lesson_data = [];

  let contentList = [];

  if(content != null && content != 0) {
      contentList = content.map((child, index) => {
        if(lidParam != null) {
          return <li key={index}><Link to={'/Simple/' + idParam + '/' + lidParam + '/#' + child[1]}>{child[0]}</Link></li>
        } else {
          return <li key={index}><Link to={'/Simple/' + idParam + '/#' + child[1]}>{child[0]}</Link></li>
        }
        
      });
  }

  let searchModules = toc.filter((child, i) => {
    return child.id == params.id;
  }).map((child) => {
    return child.lessons;
  });

  

  if(searchModules != null && searchModules.length == 1) {
    for (let key in searchModules[0]) {
      if (searchModules[0].hasOwnProperty(key)) {
        let lesson_id = searchModules[0][key].id;
        let lesson_name = searchModules[0][key].name;
        lesson_data.push([lesson_id, lesson_name]);
      }
    }
  }

  // console.log(lidParam);

  if(lesson_data.length <= 0) {
    return '';
  } else {
    
    return (<div className='os101SimpleSideBar'>
      <div className='os101SimpleLogo'><img src='./images/logo.png'/></div>
      <h2>All Content</h2>
      <ul>
          <li><Link to={'/Simple/' + idParam}>Welcome</Link></li>
          {
            lesson_data.map((child, index) => {
              return <li key={index}><Link to={'/Simple/' + idParam + '/' + child[0]}>{child[1]}</Link></li>
            })
          }
          { idParam == 5 ? <li><Link to={'/Simple/' + idParam + '/Finish'}>Complete Course!</Link></li> : null }
      </ul>
      {contentList.length > 0 ? <><h2>Navigation</h2><ul>{contentList}</ul></> : <><h2>Navigation</h2><p>Nothing to navigate :)</p></>}
    </div>);
    
  }
  
}

export default SimpleSidebar