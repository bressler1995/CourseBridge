import {Link, useParams} from 'react-router-dom';
import toc from '../../../../toc.json';
import './Simple.css';

function SimpleSidebar() {

  const params = useParams();
  let idParam = params.id;

  let lesson_data = [];

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

  console.log(lesson_data);
  
  return (<div className='simpleSideBar'>
    <h2>Navigation</h2>
    <ul>
        <li><Link to={'/Simple/' + idParam}>Welcome</Link></li>
        {
          lesson_data.map((child) => {
            return <li><Link to={'/Simple/' + idParam + '/' + child[0]}>{child[1]}</Link></li>
          })
        }
    </ul>
  </div>);
  
}

export default SimpleSidebar