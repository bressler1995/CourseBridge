import { createContext, useState, useContext } from 'react';
import './SingleChoice.css';
import { Children } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { quizContext } from '../SimpleQuiz';
import { GoCheckCircleFill } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

export const singleChoiceContext = createContext();

function SingleChoice({children, index = -1, question = 'Is this a unique question?', answer = '', isBool = 'false', image="", imageCaption='', alt="Quiz Image"}) {

  const [currentAnswer, setCurrentAnswer] = useState('');
  const [correct, handleCorrect, parent] = useContext(quizContext);
  const [openlb, setOpenlb] = useState(false);
  const [check, setCheck] = useState(false);
  const [explain, setExplain] = useState('No answer selected.');

  let lb = <>
    <Lightbox
    open={openlb}
    close={() => setOpenlb(false)}
    plugins={[Captions]}
    slides={[
      {
        src: image,
        title: imageCaption,
        alt: alt,
        width: 3840,
        height: 2560,
      },
    ]}
    portal={{root: parent.current}}
    styles={{ root: { "position": "absolute" }, navigationPrev: { "display" : "none" }, navigationNext: { "display" : "none" } }}
  /></>;

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
    console.log(e.currentTarget.dataset.explanation);
    let elementVal = e.currentTarget.value;
    let elementID = e.currentTarget.id;
    setCurrentAnswer(elementVal);
    setCheck(false);

    let explanation = Children.map(children, (child) => {
      if(slug + '-' + child.props.id == elementID) {
        return child.props.explanation;
      }
    });

    if(explanation != null && explanation.length > 0) {
      setExplain(explanation[0]);
    } else {
      setExplain('');
    }

    if(elementVal == slug + '-' + answer) {
      handleCorrect(index, 'true');
    } else {
      handleCorrect(index, 'false');
    }
  };

  return (
    <div id={slug} className='os101_simpleSingleChoice' data-index={index}>
        <h3>{question}</h3>
        {image != "" ? <img onClick={() => {setOpenlb(true)}} src={image} alt={alt}/> : null}
        {image != "" ? lb : null}
        <p>{isBool == "true" ? "Read the statement and decide whether it's true or false." : "Select an option below:"}</p>
        <Form>
          <singleChoiceContext.Provider value={[slug, handleAnswer, currentAnswer]}>
          {children}
          </singleChoiceContext.Provider>
        </Form>
        {correct[index].split('::')[1] == 'true' ? <span className='os101_simpleQuiz_questionStat' style={{display: check == true ? 'block' : 'none', backgroundColor: 'green', color: 'white'}}><GoCheckCircleFill /> <strong>Correct</strong>{explain != '' ? <>: {explain}</> : null}</span> : <span className='os101_simpleQuiz_questionStat' style={{display: check == true ? 'block' : 'none', backgroundColor: 'red', color: 'white'}}><GoXCircleFill /> <strong>Incorrect</strong>{explain != '' ? <>: {explain}</> : null}</span>}
        <div className="os101_simpleQuiz_checkAnswer"><Button disabled={check} type="button" onClick={() => setCheck(true)} variant="primary">Check Answer</Button></div>
    </div>
  );
  
}

export default SingleChoice