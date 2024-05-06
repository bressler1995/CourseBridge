import { cloneElement } from 'react';
import { useState } from 'react';
import { Children } from 'react';
import Choice from './Choice'


function Question({children, title = 'This is a Question', answerIndex, handleAnswer}) {

  const [isRadio, setIsRadio] = useState(0);
  const [isCorrect, setIsCorrect] = useState(answerIndex == 0 ? 'correct' : 'incorrect');

  const checkAnswer = (e) => {
    let curValue = +e.currentTarget.value;
    setIsRadio(curValue);

    if(curValue == answerIndex) {
      setIsCorrect('correct');
    } else {
      setIsCorrect('incorrect');
    }
};

  const mappedChildren = Children.map(children, (child, index) => {

      let hasTitle = false;

      if(child.props.title != null) {
        if(child.props.title != '') {
          hasTitle = true;
        }
      }

      if(hasTitle == true) {
        return (<Choice index={index} title={child.props.title} checked={isRadio === index} handleAnswer={checkAnswer}/>);
      } else {
        return (<Choice index={index} checked={isRadio === index} handleAnswer={checkAnswer}/>);
      }
      
  });

  
  return (
    <div className='questionContainer'>
        <h3>{title}</h3>
        <p className={isCorrect}> You Selected {isRadio}.  This is {isCorrect}</p>

        <form className="choiceContainer">
          {mappedChildren}
        </form>
    </div>
  )
}

export default Question