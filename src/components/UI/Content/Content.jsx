import './Content.css';

function Content({children, isMinimal = false}) {
  if(isMinimal == true) {
    window.parent.document.getElementById('myframe').height = '1000px';
  }

  return (
    <div className={isMinimal == true ? 'os101Content minimalContent' : 'os101Content'}>
    {children}
    </div>
  )
}

export default Content