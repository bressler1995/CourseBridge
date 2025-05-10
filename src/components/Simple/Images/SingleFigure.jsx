import './Images.css';

function SingleFigure({size = '', src = '', caption = '', link = '', alt = 'Image Figure', external = false, border = false}) {

  let hasCaption = 'os101_simpleSingleFigure_imageContainer';

  if(caption != '') {
    hasCaption = 'os101_simpleSingleFigure_imageContainer hasCaption';
  }

  return (
    <div className={size == '' ? 'os101_simpleSingleFigure' : 'os101_simpleSingleFigure ' + size}>
        <div style={{border: border == true ? '1px solid #CCC' : null, borderRadius: border == true ? '5px' : null}} className={hasCaption}>
            <img src={src} alt={alt}/>
            {caption == '' && link == '' ? null : caption != '' && link == '' ? <div className='os101_simpleSingleFigure_captionContainer'><div style={{width: "100%", paddingRight: "0px"}} className='os101_simpleSingleFigure_caption'>{caption}</div></div> : caption != '' && link != '' ? <div className='os101_simpleSingleFigure_captionContainer'><div className='os101_simpleSingleFigure_caption'>{caption}</div><div className='os101_simpleSingleFigure_link'><a target="_blank" className="btn btn-primary" role="button" href={link}>{external == true ? 'Link (External)' : 'Link'}</a></div></div> : null}
        </div>
    </div>
  );
  
}

export default SingleFigure