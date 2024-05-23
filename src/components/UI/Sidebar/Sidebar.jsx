import './Sidebar.css';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Sidebar({children}) {
  return (
    <div className='os101Sidebar'>
      {children}
    </div>
  )
}

export default Sidebar