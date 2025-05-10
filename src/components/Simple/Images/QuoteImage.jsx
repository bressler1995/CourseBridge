import './Images.css';

function QuoteImage({quote = 'This is a Beautiful Default Quote', byWho = '', byWhoLink="", bgImage='', caption = '', captionLink = '', captionExternal = false, decorative = false}) {

  return (
    <div className={decorative == true ? 'os101_simpleQuoteImage decorative' : 'os101_simpleQuoteImage'}>
        <div style={{ backgroundImage: bgImage != '' && decorative == false ? "url(" + bgImage + ")" : bgImage != '' && decorative == true ? 'url(./images/bluebgtexture.png)' : bgImage == '' && decorative == true ? 'url(./images/bluebgtexture.png)' : null }} className="os101_simpleQuoteImage_imageContainer">
          <div className='os101_simpleQuoteImage_overlay'></div>
          <div className='os101_simpleQuoteImage_content'>
            <h3 className={byWho == '' ? 'notitlediv' : null}>
              "{quote}"
            </h3>
            {byWho == "" ? null : byWho != "" && byWhoLink == "" ? <p>-{byWho}</p> : byWho != "" && byWhoLink != "" ? <p><a href={byWhoLink} target="_blank">-{byWho}</a></p> : null}
          </div>
        </div>
        {caption == '' && captionLink == '' ? null : caption != '' && captionLink == '' ? <div className='os101_simpleQuoteImage_captionContainer'><div style={{width: "100%", paddingRight: "0px"}} className='os101_simpleQuoteImage_caption'>{caption}</div></div> : caption != '' && captionLink != '' ? <div className='os101_simpleQuoteImage_captionContainer'><div className='os101_simpleQuoteImage_caption'>{caption}</div><div className='os101_simpleQuoteImage_link'><a target="_blank" className="btn btn-primary" role="button" href={captionLink}>{captionExternal == true ? 'Link (External)' : 'Link'}</a></div></div> : null}
    </div>
  );
  
}

export default QuoteImage