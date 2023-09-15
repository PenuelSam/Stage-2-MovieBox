import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import Home from './Pages/Home'
import Description from './Pages/Description'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Description />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
