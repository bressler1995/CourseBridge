import { Backgrounds } from '../../Colors';

function Text({children, id}) {
  return (
    <div style={{backgroundColor: Backgrounds.defaultBg }} id={id} className='textContainer slide'>{children}</div>
  )
}

export default Text