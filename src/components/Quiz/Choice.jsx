function Choice({title='This is a Choice', index = 0, checked = false, questionId = 0, radio, handleAnswer}) {

  return (
    <div className={'choice_' + index}>
        <input type='radio' id={'radio_' + index} value={index} data-qid={questionId} checked={checked} data-radio={radio} onChange={handleAnswer}/>
        {title}
    </div>
  );
}

export default Choice