import PropTypes from 'prop-types';
import { useState, createContext } from 'react';
import { Children } from 'react';
import Question from './Question';
import './Quiz.css';

export const UserContext = createContext();

function Quiz({children, title='This is a Quiz'}) {

  const initialState = Children.map(children, (child, index) => {
    let answerIndex = 0;
    let correct = 'incorrect';

    if(child.props.answerIndex != null) {
      if(child.props.answerIndex != '') {
        answerIndex = child.props.answerIndex;
        // console.log(answerIndex);
      }
    }

    if(answerIndex == 0) {
      correct = 'correct';
    }

    return {radio: 0, correct: correct, answerIndex: child.props.answerIndex}
  });

  console.log(initialState);

  const [questionStates, setQuestionStates] = useState(initialState);
  const [gradeState, setGrade] = useState('Not yet graded...');
  // const [isCorrect, setIsCorrect] = useState(answerIndex == 0 ? 'correct' : 'incorrect');

  const checkAnswer = (e) => {
    let curValue = +e.currentTarget.value;
    let curQuestion = +e.currentTarget.dataset.qid;

    // console.log(curQuestion);

    const newVals = [...questionStates];

    for(let i = 0; i < newVals.length; i++) {
      let currentVal = newVals[i];

      if(i == curQuestion) {
        currentVal.radio = curValue;

        if(curValue == currentVal.answerIndex) {
          currentVal.correct = 'correct';
        } else {
          currentVal.correct = 'incorrect';
        }
      }


    }

    //console.log(newVals);
    setQuestionStates(newVals);
  };

  const checkGrade = () => {
    let correctCount = 0;
    let result = '';

    for(let i = 0; i < questionStates.length; i++) {
      let currentState = questionStates[i];
      
      if(currentState.correct == 'correct') {
        correctCount += 1;
      }
    }

    result = correctCount + '/' + questionStates.length;
    setGrade(result);
  }

  return (<div className='quizContainer'>
    <h2>{title}</h2>
    <p>Grade: {gradeState}</p>
    <UserContext.Provider value={{ questionStates, setQuestionStates, checkAnswer }}>
    {children}
    </UserContext.Provider>
    <br></br>
    <button onClick={checkGrade}>Grade Quiz</button>
  </div>)
}

export default Quiz