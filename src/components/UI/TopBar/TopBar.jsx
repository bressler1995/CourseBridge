import { BiArrowBack } from "react-icons/bi";
import { GoSidebarExpand, GoSidebarCollapse, GoScreenFull, GoScreenNormal, GoBriefcase, GoRocket, GoDownload, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { PiGraduationCap } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import './TopBar.css';

function TopBar({handleHide, handleFullScreen, handleCourseMode, handleNotification, sidebarShow, isFullScreen}) {

  let contentClasses = 'os101TopBar';

  if(sidebarShow == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
      <div className='os101Toggle_container'>
        <Button onClick={handleHide} className='btn btn-primary'>{sidebarShow == true ? <GoSidebarExpand /> : <GoSidebarCollapse />}</Button>
        <Button onClick={handleFullScreen} variant="secondary">{isFullScreen == true ? <GoScreenNormal /> : <GoScreenFull />}</Button>
        <Button onClick={handleNotification} variant="secondary" data-title='Downloading...' data-status='Test status' data-body='This is body...'><GoDownload /></Button>
      </div>
      <div className='os101TopNav_container'>
        <Button onClick={handleCourseMode} data-mode='full' variant="secondary"><GoRocket /></Button>
        <Button onClick={handleCourseMode} data-mode='teacher' variant="secondary"><PiGraduationCap /></Button>
        <Button onClick={handleCourseMode} data-mode='manager' variant="secondary"><GoBriefcase /></Button>
      </div>
    </div>
  )
}

export default TopBar