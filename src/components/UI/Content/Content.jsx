import './Content.css';

function Content({children, isMinimal = false, isHorizontal = false, show}) {
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

  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div id='os101Content' className={contentClasses}>
      <div id='os101Content_container' className='os101Content_container'>{children}</div>
    </div>
  )
}

export default Content