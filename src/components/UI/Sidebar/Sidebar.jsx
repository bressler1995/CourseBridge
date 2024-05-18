import './Sidebar.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Sidebar({children}) {
  return (
    <div className='os101Sidebar'>
      {children}
      <button className='os101SidebarHide btn btn-primary'><BiChevronLeft/></button>
    </div>
  )
}

export default Sidebar