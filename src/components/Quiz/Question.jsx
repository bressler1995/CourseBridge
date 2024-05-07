import { Children, useContext, createContext } from 'react';
import Choice from './Choice';
import { UserContext } from './Quiz';

export const QuestionContext = createContext();

function Question({children, index = 0, title = 'This is a Question', answerIndex = 0}) {

  const user = useContext(UserContext);
  //console.log(user);
  //console.log(index);
  let radioState = user.questionStates[index].radio;
  let correctState = user.questionStates[index].correct;

  return (
    <div className={'question question_' + index}>
        <h3>{title}</h3>
        <p className={correctState}> You Selected {radioState}.  This is {correctState}</p>

        <form className="choiceContainer">
          <QuestionContext.Provider value={{ index, radioState }}>
          {children}
          </QuestionContext.Provider>
        </form>
    </div>
  )
}

export default Question