import { useState, Children, createContext } from 'react';
import './App.css';
import { Backgrounds } from './Colors';
import Module1 from './content/Module1.mdx';
import Module2 from './content/Module2.mdx';
import Sidebar from './components/UI/Sidebar/Sidebar';
import NavItem from './components/UI/Sidebar/NavItem';
import Content from './components/UI/Content/Content';

function App() {

  const [navState, setNavState] = useState(0);

  const checkNav = (e) => {
    let curIndex = +e.currentTarget.dataset.index;

    setNavState(curIndex);
  }

  return (
    <div className='app'>
      <Sidebar>
        <NavItem title='Module 1' index={0} navState={navState} handleNav={checkNav} />
        <NavItem title='Module 2' index={1} navState={navState} handleNav={checkNav} />
      </Sidebar>
      <Content>
        {
          navState == 0 ? <Module1 /> : navState == 1 ? <Module2 /> : <Module1 />
        }
      </Content>
    </div>
  )
}

export default App
