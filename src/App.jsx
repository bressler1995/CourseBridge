import { useState, Children, createContext, createElement } from 'react';
import { useSearchParams } from "react-router-dom";
import './App.css';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import TopBar from './components/UI/TopBar/TopBar';
import Module from './components/UI/Module/Module';
import {BrowserRouter as Router, HashRouter, Route, Routes, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import toc from './toc.json';
import Module1 from './content/Module1.mdx';

function App() {

  const [sidebarShow, setSidebarShow] = useState(true);

  const toggleHide = () => {
    if(sidebarShow == true) {
      setSidebarShow(false);
    } else if(sidebarShow == false) {
      setSidebarShow(true);
    }
  };

  return (
    
      <HashRouter basename='/'>
        <Routes>
            <Route exact path='/' element={
                <div className='app'>
                  <TopBar handleHide={toggleHide} show={sidebarShow}></TopBar>
                  <Sidebar show={sidebarShow}>
                  <ul>
                  {
                    toc.map((child, i) => {
                      return <li><Link to={child.link}>{child.name}</Link></li>
                    })
                  }  
                  </ul>
                  </Sidebar>
                  <Content show={sidebarShow}>
                    <Module1 />
                  </Content>
                </div>
            }>
            </Route>
            <Route path='/Module/:id' element={
                <div className='app'>
                  <TopBar handleHide={toggleHide} show={sidebarShow}></TopBar>
                  <Sidebar show={sidebarShow}>
                  <ul>
                  {
                    toc.map((child, i) => {
                      return <li><Link to={child.link}>{child.name}</Link></li>
                    })
                  }  
                  </ul>
                  </Sidebar>
                  <Content show={sidebarShow}>
                      <Module file={'Module1'}/>
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
