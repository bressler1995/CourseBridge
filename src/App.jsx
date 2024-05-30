import { useState, useEffect, Children, createContext, createElement } from 'react';
import './App.css';
import Module from './components/UI/Module/Module';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import TopBar from './components/UI/TopBar/TopBar';
import {BrowserRouter as Router, HashRouter, Route, Routes, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import toc from './toc.json';
import Module1 from './content/Module1.mdx';

export const modeContext = createContext();

function App() {

  const [sidebarShow, setSidebarShow] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [courseMode, setCourseMode] = useState('full');

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
  }

  return (
    
      <HashRouter basename='/'>
        <Routes>
            <Route exact path='/' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar show={sidebarShow}>
                  <ul>
                  {
                    toc.map((child, i) => {
                      return <li><Link to={'/Module/' + child.id}>{child.name}</Link></li>
                    })
                  }  
                  </ul>
                  </Sidebar>
                  <Content show={sidebarShow}>
                    
                  </Content>
                </div>
            }>
            </Route>
            <Route path='/Module/:id' element={
                <div className='app'>
                  <TopBar handleHide={handleHide} handleFullScreen={handleFullScreen} handleCourseMode={handleCourseMode} sidebarShow={sidebarShow} isFullScreen={isFullScreen}></TopBar>
                  <Sidebar show={sidebarShow}>
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
                </div>
            }>
            </Route>
            <Route path='/minimal' element={
              <Content isMinimal={true}>
                  <Module1/>
              </Content>
            }></Route>
          
        </Routes>
      </HashRouter>
  
  )
}

export default App
