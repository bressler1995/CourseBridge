import { BiArrowBack } from "react-icons/bi";
import './TopBar.css';

function TopBar() {
  return (
    <div className="os101TopBar">
      <div className='os101Toggle_container'><button className='btn btn-primary os101Toggle'><BiArrowBack /></button></div>
    </div>
  )
}

export default TopBar