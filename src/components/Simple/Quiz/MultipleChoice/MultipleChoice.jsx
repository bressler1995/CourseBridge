import { createContext, useState, useContext } from 'react';
import './MultipleChoice.css';
import { Children } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { quizContext } from '../SimpleQuiz';
import { GoXCircleFill } from "react-icons/go";
import { GoCheckCircleFill } from "react-icons/go";

export const multipleChoiceContext = createContext();

function MultipleChoice({children, index = -1, question = 'Is this a unique question?', answers = '', uniExplanations = false, correctExplanation = '', incorrectExplanation = '', introText = ''}) {

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  let slug = slugify(question) + '-question';
  const initialChoices = Children.map(children, (child) => {
    let isAnswer = '';
    let explanationProp = '';
    if(child.props.isAnswer == null) {
        isAnswer = 'false';
    } else {
        isAnswer = child.props.isAnswer;
    }

    if(child.props.explanation == null) {
        explanationProp = '';
    } else {
        explanationProp = child.props.explanation;
    }

    let result = slug + '-' + child.props.id + '::' + 'false' + '::' + isAnswer + "::" + explanationProp;
    return result;
  });

  const initialExplain = ['No answer selected.'];
  const [choices, setChoices] = useState(initialChoices);
  const [correctChoices, setCorrectChoices] = useState([]);
  const [correct, handleCorrect, parent] = useContext(quizContext);
  const [check, setCheck] = useState(false);
  const [explain, setExplain] = useState(initialExplain);


  let isExplainEmpty = () => {
    let result = false;
    let emptyCount = 0;

    if(explain != null && explain.length > 0) {
        for(let i = 0; i < explain.length; i++) {
            if(explain[i] == '') {
                emptyCount++;
            }
        }
    }

    if(uniExplanations == true) {
        if(correctExplanation == '' && incorrectExplanation == '' && introText == '') {
            result = true;
        }
    } else {
        if(emptyCount == explain.length && introText == '') {
            result = true;
        }
    }

    return result;
  };

  const handleChoices = (e) => {
    let elementChecked = '';
    let elementVal = e.currentTarget.value;
    let uni = 0;

    if(e.currentTarget.checked == true) {
        elementChecked = 'true';
    } else if(e.currentTarget.checked == false) {
        elementChecked = 'false';
    }

    // console.log(elementVal);
    // console.log(elementChecked);

    let choicesResult = choices.map((child, index) => {
        console.log(child);
        let splitChoice = child.split("::");
        let splitId = splitChoice[0];
        let splitVal = splitChoice[1];
        let splitIsAnswer = splitChoice[2];
        let splitExplain = splitChoice[3];

        if(splitId == elementVal) {
            return splitId + "::" + elementChecked + "::" + splitIsAnswer + "::" + splitExplain;
        } else {
            return splitId + "::" + splitVal + "::" + splitIsAnswer + "::" + splitExplain;
        }

        // console.log(elementVal);
    });

    let explanations = [];
    if(choicesResult != null && choicesResult.length > 0) {

        for(let i = 0; i < choicesResult.length; i++) {
            let splitChoice = choicesResult[i].split("::");
            let splitId = splitChoice[0];
            let splitVal = splitChoice[1];
            let splitIsAnswer = splitChoice[2];
            let splitExplain = splitChoice[3];

            if(splitVal == 'true') {
                explanations.push(splitExplain);
                uni++;
            }
        }
    }

    if(explanations == null || explanations.length == 0) {
        explanations = initialExplain;
    }

    let correctChoices = choicesResult.map((child, index) => {
        let splitChoice = child.split("::");
        let splitId = splitChoice[0];
        let splitVal = splitChoice[1];
        let splitIsAnswer = splitChoice[2];
        let splitExplain = splitChoice[3];

        if(splitVal == 'true' && splitIsAnswer=='true') {
            return 'true';
        } else if(splitVal == 'false' && splitIsAnswer=='false') {
            return 'true';
        } else {
            return 'false';
        }
        
    });

    let correctCount = 0;
    for(let i = 0; i < correctChoices.length; i++) {
        let currentChoice = correctChoices[i];
        if(currentChoice == 'true') {
            correctCount += 1;
        }
    }

    console.log(choicesResult);
    console.log(correctCount + "/" + correctChoices.length);

    if(correctCount == correctChoices.length) {
        handleCorrect(index, 'true');

        if(uniExplanations == true) {
            if(uni == 0) {
                setExplain(initialExplain)
            } else {
                setExplain([correctExplanation]);
            }
        } else {
            setExplain(explanations);
        }
    } else {
        handleCorrect(index, 'false');

        if(uniExplanations == true) {
            if(uni == 0) {
                setExplain(initialExplain)
            } else {
                setExplain([incorrectExplanation]);
            }
        } else {
            setExplain(explanations);
        }
    }

    setChoices(choicesResult);
    setCheck(false);

    
  };

  return (
    <div id={slug} className='os101_simpleMultipleChoice' data-index={index}>
        <h3>{question}</h3>
        <p>Select all that apply.</p>
        <Form>
          <multipleChoiceContext.Provider value={[slug, handleChoices, choices]}>
          {children}
          </multipleChoiceContext.Provider>
         </Form>

        {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{display: check == true ? 'block' : 'none', backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> <strong>All Correct{isExplainEmpty() == false ? ':' : ''} <span>{introText}</span></strong> {explain.map((child) => { return child != '' ? <><br/>- {child}</> : null })}</span> : <span className='os101_simpleQuiz_questionStat' style={{display: check == true ? 'block' : 'none', backgroundColor: 'red', color: 'white'}}><GoXCircleFill /> <strong>Not All Correct{isExplainEmpty() == false ? ':' : ''} <span>{introText}</span></strong> {explain.map((child) => { return child != '' ? <><br/>- {child}</> : null })}</span>}
        <div className="os101_simpleQuiz_checkAnswer"><Button disabled={check} type="button" onClick={() => setCheck(true)} variant="primary">Check Answer</Button></div>
    </div>
  );
  
}

export default MultipleChoice