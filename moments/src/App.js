import {useState, useEffect} from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

//React Router
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import NewMoment from './pages/NewMoment/NewMoment';

//session utils
import {validateSession} from './utils/session_utils'
import EditMoment from './pages/EditMoment/EditMoment';

function App() {

  const [auth, setAuth]=useState(false)

  useEffect(()=>{
    validateSession()
    .then(valid => {
      if(valid) setAuth(true)
    })
    // console.log(auth)
    return ()=>{
      setAuth(false)
    }
}, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          {auth ? 
            <Route path="/" exact element={<Dashboard />} />
            :
            <Route path="/" exact element={<Login setAuth={setAuth} />} />
          }
          <Route path="/create" element={<NewMoment />} />
          <Route path="/edit" element={<EditMoment />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;