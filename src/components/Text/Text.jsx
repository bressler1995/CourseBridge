import { BackgroundColors } from '../../Colors';

function Text({children, id}) {
  return (
    <div style={{backgroundColor: BackgroundColors.defaultBg }} id={id} className='textContainer slide'>
      <div className='slideContent'>
      {children}
      </div>
    </div>
  )
}

export default Text