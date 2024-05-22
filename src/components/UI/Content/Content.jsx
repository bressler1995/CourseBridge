import './Content.css';

function Content({children, isMinimal = false}) {
  return (
    <div className={isMinimal == true ? 'os101Content minimalContent' : 'os101Content'}>
    {children}
    </div>
  )
}

export default Content