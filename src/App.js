import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './components/Home/Home'
import Timeline from './components/Timeline/Timeline'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/timelines' element={<Timeline></Timeline>}></Route>
          <Route path='/timelines/:id' element={<Timeline></Timeline>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
