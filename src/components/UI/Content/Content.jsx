import './Content.css';

function Content({children, isMinimal = false, show}) {
  // if(isMinimal == true) {
  //   window.parent.document.getElementById('myframe').height = '1000px';
  // }
  let contentClasses = 'os101Content';

  if(isMinimal == true) {
    contentClasses = contentClasses + ' ' + 'minimalContent';
  }

  if(show == false) {
    contentClasses = contentClasses + ' ' + 'hide';
  }

  return (
    <div className={contentClasses}>
    {children}
    </div>
  )
}

export default Content