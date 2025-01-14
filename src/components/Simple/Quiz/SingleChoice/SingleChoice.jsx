import { createContext, useState, useContext } from 'react';
import './SingleChoice.css';
import { Children } from 'react';
import Form from 'react-bootstrap/Form';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";

export const singleChoiceContext = createContext();

function SingleChoice({children, index = -1, question = 'Is this a unique question?', answer = '', isBool = 'false'}) {

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [correct, handleCorrect] = useContext(quizContext);

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  let slug = slugify(question) + '-question';

  const handleAnswer = (e) => {
    console.log('Setting answer ' + e.currentTarget.value);
    let elementVal = e.currentTarget.value;
    setCurrentAnswer(elementVal);

    if(elementVal == slug + '-' + answer) {
      handleCorrect(index, 'true');
    } else {
      handleCorrect(index, 'false');
    }
  };

  return (
    <div id={slug} className='os101_simpleSingleChoice' data-index={index}>
        <h3>{question}</h3>
        <p>{isBool == "true" ? "Read the statement and decide whether it's true or false." : "Select an option below:"}</p>
        <Form>
          <singleChoiceContext.Provider value={[slug, handleAnswer, currentAnswer]}>
          {children}
          </singleChoiceContext.Provider>
        </Form>
        {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> Correct</span> : null}
    </div>
  );
  
}

export default SingleChoice