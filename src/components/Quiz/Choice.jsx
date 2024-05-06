function Choice({title='This is a Choice', index=0, checked = false, handleAnswer}) {

  return (
    <div className={'choice_' + index}>
        <input type='radio' id={'radio_' + index} value={index} checked={checked} onChange={handleAnswer}/>
        {title}
    </div>
  );
}

export default Choice