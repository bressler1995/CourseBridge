import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Module1 from './Module1.mdx';

function App() {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount((count) => count + 1)
  }

  return (
    <div className="tops_os101">
      <Module1 />
    </div>
  )
}

export default App
