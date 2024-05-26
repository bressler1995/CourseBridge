import './Sidebar.css';

function Sidebar({children, show}) {
  return (
    <div className={show == true ? 'os101Sidebar' : 'os101Sidebar hide'}>
      <div className='os101Logo p-2 px-4'><img src='./images/logo.png'/></div>
      {children}
    </div>
  )
}

export default Sidebar