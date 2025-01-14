import './SimpleQuiz.css';
import { Children, useState, createContext, cloneElement } from 'react';
import Button from 'react-bootstrap/Button';
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const quizContext = createContext();

function SimpleQuiz({children}) {

  const initialQuestion = Children.map(children, (child, index) => {
    let result = 'noshow';

    if(index == 0) {
      result = 'show';
    }

    return result;
  });

  const initialCorrect = Children.map(children, (child, index) => {
    let result = index + '::false';

    return result;
  });

  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [correct, setCorrect] = useState(initialCorrect);
  const [grade, setGrade] = useState('hideGrade');

  const handleDisplay = (inputIndex) => {
    let result = currentQuestion.map((child, index) => {
      if(inputIndex == index) {
        return 'show';
      } else {
        return 'noshow';
      }
    });

    setCurrentQuestion(result);
  };

  const handleCorrect = (indexParam, valueParam) => {
    let result = correct.map((child, index) => {
      if(index == indexParam) {
        return index + '::' + valueParam;
      } else {
        return child;
      }
    });

    setCorrect(result);
  }

  const goNext = () => {
    let currentIndex = getStateIndex();

    if(currentIndex + 1 < currentQuestion.length) {
      currentIndex += 1;
      handleDisplay(currentIndex)
    }
  };

  const goPrev = () => {
    let currentIndex = getStateIndex();

    if(currentIndex -1 >= 0) {
      currentIndex -= 1;
      handleDisplay(currentIndex)
    }
  };

  const getStateIndex = () => {
    let result = -1;

    for(let i = 0; i < currentQuestion.length; i++) {
      if(currentQuestion[i] == 'show') {
        result = i;
        break;
      }
    }

    return result;
  };

  const getCorrectPercent = () => {
    let result = 0;

    for(let i = 0; i < correct.length; i++) {
      let currentCorrect = correct[i];
      let splitCorrect = currentCorrect.split("::");
      let splitIndex = splitCorrect[0];
      let splitVal = splitCorrect[1];

      if(splitVal == 'true') {
        result += 1;
      }
    }

    return parseFloat(result / correct.length) * 100;
  }

  return (
    <div className='os101_simpleQuiz' style={{backgroundImage: 'url(./images/bluebgtexture.png)'}}>
        <div className='os101_simpleQuiz_overlay'></div>
        <div className={'os101_simpleQuiz_container ' + grade}>
          <quizContext.Provider value={[correct, handleCorrect]}>
          {children != null ? Children.map(children, (child, index) => {return <div className={'os101_simpleQuiz_question ' + currentQuestion[index]}>{cloneElement(child, {index: index})}</div>}) : <p className="os101_simpleQuiz_noQuestions">No questions have been added...</p>}
          </quizContext.Provider>
          <Button title='Previous Question' disabled={currentQuestion[0] == 'show'} className='os101_simpleQuiz_nav left' onClick={goPrev} variant="primary"><GoChevronLeft/></Button>
          <Button title='Next Question' disabled={currentQuestion[currentQuestion.length - 1] == 'show'} className='os101_simpleQuiz_nav right' onClick={goNext} variant="primary"><GoChevronRight/></Button>
          {getStateIndex() == currentQuestion.length -1 ? <div className='os101_simpleQuiz_submit'><Button type="button" onClick={() => setGrade('showGrade')} variant="primary">Get Score</Button></div> : null }
        </div>
        <div className={'os101_simpleQuiz_grade ' + grade}>
          <h3>Your Score</h3>
          <div style={{width: '200px', height: '200px', marginBottom: '24px'}}>
            <CircularProgressbar 
              value={grade == 'showGrade' ? parseInt(getCorrectPercent()) : 0} 
              text={grade == 'showGrade' ? parseInt(getCorrectPercent()) + '%' : 0 + '%'} 
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'round',

                // Text size
                textSize: '16px',

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: 'var(--bg-dark)',
                textColor: 'var(--primary-button-bg)',
                trailColor: '#E1E1E1',
                backgroundColor: '#000',
              })} 
            />
          </div>
          <div className='os101_simpleQuiz_submit'><Button type="button" onClick={() => setGrade('hideGrade')} variant="primary">Go Back</Button></div>
        </div>
    </div>
  );
  
}

export default SimpleQuiz