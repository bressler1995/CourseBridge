import { useState, useEffect, Children, createContext } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import './App.css';
import Module from './components/UI/Module/Module';
import SimpleModule from './components/UI/Module/Simple/SimpleModule';
import SimpleLesson from './components/UI/Module/Simple/SimpleLesson';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import TopBar from './components/UI/TopBar/TopBar';
import Notification from './components/UI/Notification/Notification';
import ScrollToAnchor from './components/UI/ScrollToAnchor/ScrollToAnchor.jsx';
import {HashRouter, Route, Routes, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import toc from './toc.json';

export const modeContext = createContext();

const options = {
  filename: 'currentModule.pdf',
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.NONE,
    // default is 'A4'
    format: 'letter',
    // default is 'portrait'
    orientation: 'landscape',
 },
};

const getTargetElement = () => document.getElementById('os101Content_container');

function App() {

  const initialCompletion = toc.map((child) => {
    const lessons = child.lessons;
    const lessonCompletion = lessons.map((child_two) => {
      return {id: child_two.id, status: false};
    });

    return lessonCompletion;

  });

  console.log(initialCompletion);

  const [sidebarShow, setSidebarShow] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [courseMode, setCourseMode] = useState('full');
  const [showNotification, setShowNotication] = useState([false, '', '', '']);
  const [completion, setCompletion] = useState(initialCompletion);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullScreen(Boolean(document.fullscreenElement));
    }
          
    document.addEventListener('fullscreenchange', onFullscreenChange);
  
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleFullScreen = () => {
    if(isFullScreen == false) {
      setIsFullScreen(true);
      setTimeout(function(){
        setSidebarShow(false)
      }, 500);
      document.body.requestFullscreen();
    } else {
      setIsFullScreen(false);
      document.exitFullscreen();
    }
  };

  const handleHide = () => {
    if(sidebarShow == true) {
      setSidebarShow(false);
    } else if(sidebarShow == false) {
      setSidebarShow(true);
    }
  };

  const handleCourseMode = (e) => {
    let curMode = e.currentTarget.dataset.mode;
    setCourseMode(curMode);
  };

  const handleNotification = (e) => {
    if(showNotification[0] == true) {
      setShowNotication([false, '', '', '']);
    } else if(showNotification[0] == false) {
      setShowNotication([true, e.currentTarget.dataset.title, e.currentTarget.dataset.status, e.currentTarget.dataset.body]);
      generatePDF(getTargetElement, options);
    }
    
  };

  const handleCompletion = (module, lesson) => {
    let changedCompletion = completion;

    if(changedCompletion != null && changedCompletion.length > 0) {
      for(let x = 0; x < completion.length; x++) {
        let current_completion_line = completion[x];

        if(current_completion_line != null && current_completion_line.length > 0) {
          for(let y = 0; y < current_completion_line.length; y++) {
            let current_completion = current_completion_line[y];
            let current_completion_id = current_completion.id;

            if(x == (module - 1) && current_completion_id == lesson) {
              changedCompletion[x][y] = {id: current_completion_id, status: true}
            }
          }
        } 
        
      }
    }

    console.log(changedCompletion);
    setCompletion(changedCompletion);
  }

  return (
    
      <HashRouter basename='/'>
        <ScrollToAnchor/>
        <Routes>
            <Route exact path='/' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} handleNotification={handleNotification} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar handleCourseMode={handleCourseMode} courseMode={courseMode} show={sidebarShow}>
                  <ul>
                  {
                    toc.map((child, i) => {
                      return <li><Link to={'/Module/' + child.id}>{child.name}</Link></li>
                    })
                  }  
                  </ul>
                  </Sidebar>
                  <Content show={sidebarShow}/>
                  <Notification handleNotification={handleNotification} showNotification={showNotification}/>
                </div>
            }>
            </Route>
            <Route path='/Module/:id' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} handleCourseMode={handleCourseMode} handleNotification={handleNotification} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar handleCourseMode={handleCourseMode} courseMode={courseMode} show={sidebarShow}>
                  <ul>
                  {
                   toc.map((child, i) => {
                    return <li><Link to={'/Module/' + child.id}>{child.name}</Link></li>
                  })
                  }  
                  </ul>
                  </Sidebar>
                  <Content show={sidebarShow}>
                    <modeContext.Provider value={{ courseMode }}>
                    <Module/>
                    </modeContext.Provider>
                  </Content>
                  <Notification handleNotification={handleNotification} showNotification={showNotification}/>
                </div>
            }>
            </Route>
            <Route path='/Horizontal/:id' element={
              <Content isMinimal={true}>
                  <modeContext.Provider value={{ courseMode }}>
                    <Module/>
                  </modeContext.Provider>
              </Content>
            }>
            </Route>
            <Route path='/Minimal/:id' element={
              <Content isMinimal={true}>
                  <modeContext.Provider value={{ courseMode }}>
                    <Module/>
                  </modeContext.Provider>
              </Content>
            }></Route>
            <Route path='/Simple/:id' element={
              <Content isSimple={true} handleCompletion={handleCompletion}>
                  <modeContext.Provider value={{ courseMode }}>
                    <SimpleModule/>
                  </modeContext.Provider>
              </Content>
            }></Route>
            <Route path='/Simple/:id/:lid' element={
              <Content isSimple={true} handleCompletion={handleCompletion}>
                  <modeContext.Provider value={{ courseMode }}>
                    <SimpleLesson/>
                  </modeContext.Provider>
              </Content>
            }></Route>
          
        </Routes>
      </HashRouter>
  
  )
}

export default App
