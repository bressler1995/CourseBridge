import PropTypes from 'prop-types';
import { useState, Children, createContext } from 'react';
import { BackgroundColors, TextColors } from '../../Colors';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import './Quiz.css';


export const UserContext = createContext();

function Quiz({children, id, title='This is a Quiz'}) {

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
  const [gradeState, setGrade] = useState({grade: 'Not yet graded...', pass: ''});
  const [pageState, setPage] = useState(0);

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

  const nextPage = (e) => {
    if(pageState < children.length) {
      setPage(pageState + 1);
    }
  };

  const prevPage = (e) => {
    if(pageState > 0) {
      setPage(pageState - 1);
    }
  };

  const checkGrade = () => {
    let correctCount = 0;
    let result = '';
    let pass = 'nopass';

    for(let i = 0; i < questionStates.length; i++) {
      let currentState = questionStates[i];
      
      if(currentState.correct == 'correct') {
        correctCount += 1;
      }
    }

    if(correctCount == questionStates.length) {
      pass = 'pass';
    }

    result = {grade: correctCount + '/' + questionStates.length, pass: pass};
    setGrade(result);
  }

  return (<div style={{backgroundColor: BackgroundColors.darkBg }} id={id} className='quizContainer slide'>
    <div className='slideContent'>
      <h2 style={{color: TextColors.title }}>{title}</h2>
      <p style={{ color: gradeState.pass == 'pass' ? 'rgb(0, 255, 0)' : gradeState.pass == 'nopass' ? 'red' : TextColors.paragraphWhite }}>Grade: {gradeState.grade} {gradeState.pass == 'pass' ? ', You Passed!' : '' }</p>
      <div className='quizQuestions'>
        <UserContext.Provider value={{ questionStates, setQuestionStates, checkAnswer, pageState }}>
        {children}
        </UserContext.Provider>
      </div>
      <br></br>
      <div className='quizButtons'>
        <button style={{ display: pageState != children.length - 1 ? 'none' : 'inline-block'}} className='os101Button btn-primary' onClick={checkGrade}>Grade Quiz</button>
      </div>
      <button style={{ display: pageState > 0 ? 'inline-block' : 'none' }} className='os101Button btn' onClick={prevPage}><BiChevronLeft />Prev</button>
      <button style={{ display: pageState < children.length - 1 ? 'inline-block' : 'none' }} className='os101Button btn-primary' onClick={nextPage}><BiChevronRight /></button>
    </div>
  </div>)
}

export default Quiz