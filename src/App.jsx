import { useState, Children, createContext } from 'react';
import './App.css';
import Module1 from './Module1.mdx';
import Module2 from './Module2.mdx';
import Sidebar from './components/Sidebar/Sidebar';
import NavItem from './components/Sidebar/NavItem';

function App() {

  const [navState, setNavState] = useState(0);

  const checkNav = (e) => {
    let curIndex = +e.currentTarget.dataset.index;

    setNavState(curIndex);
  }

  return (
    <div className='os101App'>
      <Sidebar>
        <NavItem title='Module 1' index={0} navState={navState} handleNav={checkNav} />
        <NavItem title='Module 2' index={1} navState={navState} handleNav={checkNav} />
      </Sidebar>
      <div className="os101Content">
        {
          navState == 0 ? <Module1 /> : navState == 1 ? <Module2 /> : <Module1 />
        }
      </div>
    </div>
  )
}

export default App
