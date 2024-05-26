import { BiArrowBack } from "react-icons/bi";
import { GoSidebarExpand } from "react-icons/go";
import './TopBar.css';

function TopBar({handleHide, show}) {

  let contentClasses = 'os101TopBar';

  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
      <div className='os101Toggle_container'><button onClick={handleHide} className='btn btn-primary os101Toggle'><GoSidebarExpand /></button></div>
    </div>
  )
}

export default TopBar