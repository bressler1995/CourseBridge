import PropTypes from 'prop-types';
import { useState } from 'react';
import { Children } from 'react';
import Question from './Question';
import './Quiz.css';

function Quiz({children, title='This is a Quiz'}) {

  const [grade, setGrade] = useState(0);
  const [questionStates, setQuestionStates] = useState([]);
  // const [isCorrect, setIsCorrect] = useState(answerIndex == 0 ? 'correct' : 'incorrect');

  const checkAnswer = (e) => {
    let curValue = +e.currentTarget.value;
    let curQuestion = +e.currentTarget.dataset.qid;
    let curRadio = +e.currentTarget.dataset.radio;

    console.log(curQuestion);

    let newVals = Children.map(children, (child, index) => {
      let correct = 'incorrect';
      let radio = 0;
      let answerIndex = 0;

      if(child.props.answerIndex != null) {
        if(child.props.answerIndex != '') {
          answerIndex = child.props.answerIndex;
          // console.log(answerIndex);
        }
      }

      if(index == curQuestion) {
        radio = curValue;

        if(curValue == answerIndex) {
          correct = 'correct';
        }
      }

      return {radio: radio, correct: correct};
    });

    console.log(newVals);
    setQuestionStates(newVals);
};

const mappedChildren = Children.map(children, (child, index) => {

  // console.log(questionStates);

  let localRadio = 0;
  let localCorrect = 'incorrect';

  if(questionStates != null && questionStates.length > 0) {
        console.log(questionStates[index]);
        localRadio = questionStates[index].radio;
        localCorrect = questionStates[index].correct;
  }

  let hasTitle = false;
  let hasAnswer = false;

  if(child.props.title != null && child.props.title != '') {
    hasTitle = true;
  }

  if(child.props.answerIndex != null && child.props.answerIndex != '') {
    hasAnswer = true;
  }

  if(hasTitle == true) {
    if(hasAnswer == true) {
      return (<Question children={child.props.children} index={index} title={child.props.title} answerIndex={child.props.answerIndex} radio={localRadio} correct={localCorrect} handleAnswer={checkAnswer}/>);
    } else {
      return (<Question children={child.props.children} index={index} title={child.props.title} radio={localRadio} correct={localCorrect} handleAnswer={checkAnswer}/>);
    }
  } else {

    if(hasAnswer == true) {
      return (<Question children={child.props.children} index={index} answerIndex={child.props.answerIndex} radio={localRadio} correct={localCorrect} handleAnswer={checkAnswer}/>);
    } else {
      return (<Question children={child.props.children} index={index} radio={localRadio} correct={localCorrect} handleAnswer={checkAnswer}/>);
    }

  }
  
});

  return (<div className='quizContainer'>
    <h2>{title}</h2>
    <p>Grade: {grade}</p>
    {mappedChildren}
    <br></br>
    <button>Submit Quiz</button>
  </div>)
}

export default Quiz