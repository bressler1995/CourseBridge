import './Sidebar.css';

function Sidebar({children}) {
  return (
    <div className='os101Sidebar'>
      <div className='os101Logo p-2 px-4'><img src='./images/logo.png'/></div>
      {children}
    </div>
  )
}

export default Sidebar