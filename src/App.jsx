import { useState } from 'react';
import { Children } from 'react';
import './App.css';
import Module1 from './Module1.mdx';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className='os101App'>
      <Sidebar/>
      <div className="os101Content">
        <Module1 />
      </div>
    </div>
  )
}

export default App
