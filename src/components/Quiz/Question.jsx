import { Children, useContext, createContext } from 'react';
import Choice from './Choice';
import { UserContext } from './Quiz';
import { BackgroundColors, TextColors } from '../../Colors';

export const QuestionContext = createContext();

function Question({children, index = 0, title = 'This is a Question', answerIndex = 0}) {

  const user = useContext(UserContext);
  //console.log(user);
  //console.log(index);
  let radioState = user.questionStates[index].radio;
  let correctState = user.questionStates[index].correct;
  let pageState = user.pageState;

  return (
    <div style={{ display: pageState != index ? 'none' : 'initial' }} className={'question question_' + index}>
        <h4 style={{color: TextColors.titleWhite }}>{title}</h4>

        <form className="choiceContainer">
          <QuestionContext.Provider value={{ index, radioState }}>
          {children}
          </QuestionContext.Provider>
        </form>
    </div>
  )
}

export default Question