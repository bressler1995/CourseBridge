import './Text.css';

function Text({children, id}) {
  return (
    <div id={id} className='textContainer slide'>
      <div className='slideContent'>
      {children}
      </div>
    </div>
  )
}

export default Text