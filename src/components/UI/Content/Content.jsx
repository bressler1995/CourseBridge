import './Content.css';
import SimpleSidebar from '../Module/Simple/SimpleSidebar';

function Content({children, isMinimal = false, isHorizontal = false, isSimple = false, show}) {
  // if(isMinimal == true) {
  //   window.parent.document.getElementById('myframe').height = '1000px';
  // }
  let contentClasses = 'os101Content';

  if(isMinimal == true) {
    contentClasses = contentClasses + ' ' + 'minimalContent';
  }

  if(isHorizontal == true) {
    contentClasses = contentClasses + ' ' + 'horizontalContent';
  }

  if(isSimple == true) {
    contentClasses = contentClasses + ' ' + 'simpleContent';
  }


  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div id='os101Content' className={contentClasses}>
      { isSimple == true ? <><SimpleSidebar/><div className='simpleContent_wrapper'><div id='os101Content_container' className='os101Content_container'>{children}</div></div></> : <div id='os101Content_container' className='os101Content_container'>{children}</div> }
    </div>
  )
}

export default Content