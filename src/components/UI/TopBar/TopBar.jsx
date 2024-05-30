import { BiArrowBack } from "react-icons/bi";
import { GoSidebarExpand, GoSidebarCollapse, GoScreenFull, GoScreenNormal, GoBriefcase, GoRocket, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import './TopBar.css';

function TopBar({handleHide, handleFullScreen, handleCourseMode, sidebarShow, isFullScreen}) {

  let contentClasses = 'os101TopBar';

  if(sidebarShow == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
      <div className='os101Toggle_container'>
        <Button onClick={handleHide} className='btn btn-primary'>{sidebarShow == true ? <GoSidebarExpand /> : <GoSidebarCollapse />}</Button>
        <Button onClick={handleFullScreen} className='btn btn-secondary'>{isFullScreen == true ? <GoScreenNormal /> : <GoScreenFull />}</Button>
      </div>
      <div className='os101TopNav_container'>
        <Button onClick={handleCourseMode} data-mode='full' className='btn btn-secondary'><GoRocket /></Button>
        <Button onClick={handleCourseMode} data-mode='teacher' className='btn btn-secondary'><PiGraduationCap /></Button>
        <Button onClick={handleCourseMode} data-mode='manager' className='btn btn-secondary'><GoBriefcase /></Button>
      </div>
    </div>
  )
}

export default TopBar