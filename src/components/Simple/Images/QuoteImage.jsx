import './Images.css';

function QuoteImage({quote = 'This is a Beautiful Default Quote', byWho = 'Default Quote Person', byWhoLink="", bgImage=''}) {
 console.log(bgImage)
  return (
    <div className='os101_simpleQuoteImage' style={{ backgroundImage: "url(" + bgImage + ")" }}>
        <div className='os101_simpleQuoteImage_overlay'></div>
        <div className='os101_simpleQuoteImage_content'>
          <h4>
            {quote}
          </h4>
          <p>{byWhoLink == "" ? "-" + byWho : <a href={byWhoLink} target="_blank">{"-" + byWho}</a>}</p>
        </div>
    </div>
  );
  
}

export default QuoteImage