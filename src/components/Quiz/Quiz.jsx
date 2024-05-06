import PropTypes from 'prop-types';
import { useState } from 'react';
import { Children } from 'react';
import Question from './Question';
import './Quiz.css';

function Quiz({children, title='This is a Quiz'}) {

  const [grade, setGrade] = useState(0);

  return (<div className='quizContainer'>
    <h2>{title}</h2>
    <p>Grade: {grade}</p>
    {children}
    <button>Submit Quiz</button>
  </div>)
}

export default Quiz