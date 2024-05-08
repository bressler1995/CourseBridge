import './Sidebar.css';

function Sidebar({children}) {
  return (
    <div className='os101Sidebar'>
      <h3 className='os101Sidebar_title'>Modules</h3>
      {children}
    </div>
  )
}

export default Sidebar