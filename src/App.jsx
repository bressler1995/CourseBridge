import { useState, Children, createContext } from 'react';
import './App.css';
import { BackgroundColors } from './Colors';
import Module1 from './content/Module1.mdx';
import Module2 from './content/Module2.mdx';
import Sidebar from './components/UI/Sidebar/Sidebar';
import NavItem from './components/UI/Sidebar/NavItem';
import Content from './components/UI/Content/Content';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const checkNav = (e) => {
    let curIndex = +e.currentTarget.dataset.index;

    setNavState(curIndex);
  }

  return (
    <div className='app'>
      <Sidebar>
        
      </Sidebar>
      <Content>
        <Module1 />
      </Content>
    </div>
  )
}

export default App
