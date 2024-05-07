import { Children } from 'react';
import Choice from './Choice'


function Question({children, index = 0, title = 'This is a Question', answerIndex, radio, correct, handleAnswer}) {

  const mappedChildren = Children.map(children, (child, childIndex) => {

      let hasTitle = false;

      if(child.props.title != null) {
        if(child.props.title != '') {
          hasTitle = true;
        }
      }

      // console.log('Choice Index:' + index);

      if(hasTitle == true) {
        return (<Choice index={childIndex} title={child.props.title} checked={radio === childIndex} questionId={index} radio={radio} handleAnswer={handleAnswer}/>);
      } else {
        return (<Choice index={childIndex} checked={radio === childIndex} questionId={index} radio={radio} handleAnswer={handleAnswer}/>);
      }
      
  });

  return (
    <div className={'question question_' + index}>
        <h3>{title}</h3>
        <p className={correct}> You Selected {radio}.  This is {correct}</p>

        <form className="choiceContainer">
          {mappedChildren}
        </form>
    </div>
  )
}

export default Question