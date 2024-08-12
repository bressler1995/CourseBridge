import { lazy, Suspense, createElement } from 'react';
import {useParams} from 'react-router-dom';
import parse from 'html-react-parser';
import toc from '../../../../toc.json';

import Module1 from '../../../../content/Module1.mdx';
import Module2 from '../../../../content/Module2.mdx';
import Module3 from '../../../../content/Module3.mdx';
import Module4 from '../../../../content/Module4.mdx';
import Module5 from '../../../../content/Module5.mdx';

import M1Lesson1 from '../../../../content/clone/Module_1/Lesson_1/readme.mdx';
import M2Lesson1 from '../../../../content/clone/Module_2/Lesson_1/readme.mdx';
import M3Lesson1 from '../../../../content/clone/Module_3/Lesson_1/readme.mdx';
import M4Lesson1 from '../../../../content/clone/Module_4/Lesson_1/readme.mdx';
import M5Lesson1 from '../../../../content/clone/Module_5/Lesson_1/readme.mdx';

import M1Lesson2 from '../../../../content/clone/Module_1/Lesson_2/readme.mdx';
import M2Lesson2 from '../../../../content/clone/Module_2/Lesson_2/readme.mdx';
import M3Lesson2 from '../../../../content/clone/Module_3/Lesson_2/readme.mdx';
import M4Lesson2 from '../../../../content/clone/Module_4/Lesson_2/readme.mdx';
import M5Lesson2 from '../../../../content/clone/Module_5/Lesson_2/readme.mdx';

import M1Lesson3 from '../../../../content/clone/Module_1/Lesson_3/readme.mdx';
import M2Lesson3 from '../../../../content/clone/Module_2/Lesson_3/readme.mdx';
import M3Lesson3 from '../../../../content/clone/Module_3/Lesson_3/readme.mdx';
import M4Lesson3 from '../../../../content/clone/Module_4/Lesson_3/readme.mdx';
import M5Lesson3 from '../../../../content/clone/Module_5/Lesson_3/readme.mdx';

import M1Lesson4 from '../../../../content/clone/Module_1/Lesson_4/readme.mdx';
import M2Lesson4 from '../../../../content/clone/Module_2/Lesson_4/readme.mdx';
import M3Lesson4 from '../../../../content/clone/Module_3/Lesson_4/readme.mdx';
import M4Lesson4 from '../../../../content/clone/Module_4/Lesson_4/readme.mdx';
import M5Lesson4 from '../../../../content/clone/Module_5/Lesson_4/readme.mdx';

import M1Lesson5 from '../../../../content/clone/Module_1/Lesson_5/readme.mdx';
import M2Lesson5 from '../../../../content/clone/Module_2/Lesson_5/readme.mdx';
import M3Lesson5 from '../../../../content/clone/Module_3/Lesson_5/readme.mdx';
import M4Lesson5 from '../../../../content/clone/Module_4/Lesson_5/readme.mdx';
import M5Lesson5 from '../../../../content/clone/Module_5/Lesson_5/readme.mdx';

const modules = {
  1: Module1,
  2: Module2,
  3: Module3,
  4: Module4,
  5: Module5
}

function SimpleLesson() {

  const params = useParams();
  let idParam = params.id;
  let lidParam = params.lid;
  let lessons;

  if(idParam = 1) {
    lessons = {
        1: M1Lesson1,
        2: M1Lesson2,
        3: M1Lesson3,
        4: M1Lesson4,
        5: M1Lesson5
    }
  } else if(idParam == 2) {
    lessons = {
        1: M2Lesson1,
        2: M2Lesson2,
        3: M2Lesson3,
        4: M2Lesson4,
        5: M2Lesson5
    }
  } else if(idParam == 3) {
    lessons = {
        1: M3Lesson1,
        2: M3Lesson2,
        3: M3Lesson3,
        4: M3Lesson4,
        5: M3Lesson5
    }
  } else if(idParam == 4) {
    lessons = {
        1: M4Lesson1,
        2: M4Lesson2,
        3: M4Lesson3,
        4: M4Lesson4,
        5: M4Lesson5
    }
  } else if(idParam == 5) {
    lessons = {
        1: M5Lesson1,
        2: M5Lesson2,
        3: M5Lesson3,
        4: M5Lesson4,
        5: M5Lesson5
    }
  }
  
  return (
    toc.map((child) => {
      if(child.id === idParam) {
        const child_lessons = child.lessons;

        for (let key in child_lessons) {
            if (child_lessons.hasOwnProperty(key)) {
              let lesson_id = child_lessons[key].id;
              let lesson_use = child_lessons[key].use;
              
              if(lesson_id === lidParam) {
                let lessonComponentString = parse(lesson_use);

                return createElement(
                    lessons[lesson_id],
                    { className: '' }
                  );
              }
            }
        }

        let componentString = child.use;
        componentString = parse(componentString);

        return createElement(
          modules[child.id],
          { className: '' }
        );
      }
    })
  )
  
}

export default SimpleLesson