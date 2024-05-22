import { useState, Children, createContext } from 'react';
import './App.css';
import Module1 from './content/Module1.mdx';
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const checkNav = (e) => {
    let curIndex = +e.currentTarget.dataset.index;

    setNavState(curIndex);
  }

  return (
    
      <HashRouter>
        <Routes>
            <Route exact path='/os101-dev-preview/' element={
                <div className='app'>
                <Sidebar></Sidebar>
                <Content>
                  <Module1 />
                </Content>
                </div>
            }>
            </Route>
            <Route path='/os101-dev-preview/minimal' element={
              <Content>
                  <Module1 />
              </Content>
            }></Route>
          
        </Routes>
      </HashRouter>
  
  )
}

export default App
