import { useState } from 'react';
import { Children } from 'react';
import './App.css';
import Module1 from './Module1.mdx';
import Sidebar from './components/Sidebar/Sidebar';
import NavItem from './components/Sidebar/NavItem';

function App() {

  return (
    <div className='os101App'>
      <Sidebar>
        <NavItem title='Module 1' />
        <NavItem title='Module 2' />
        <NavItem title='Module 3' />
        <NavItem title='Module 4' />
        <NavItem title='Module 5' />
      </Sidebar>
      <div className="os101Content">
        <Module1 />
      </div>
    </div>
  )
}

export default App
