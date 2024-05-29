import { BiArrowBack } from "react-icons/bi";
import { GoSidebarExpand, GoSidebarCollapse, GoScreenFull, GoChevronLeft, GoChevronRight } from "react-icons/go";
import Button from 'react-bootstrap/Button';
import './TopBar.css';

function TopBar({handleHide, handleFullScreen, show}) {

  let contentClasses = 'os101TopBar';

  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
      <div className='os101Toggle_container'>
        <Button onClick={handleHide} className='btn btn-primary'>{show == true ? <GoSidebarExpand /> : <GoSidebarCollapse />}</Button>
        <Button onClick={handleFullScreen} className='btn btn-secondary'><GoScreenFull /></Button>
      </div>
    </div>
  )
}

export default TopBar