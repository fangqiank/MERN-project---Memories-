import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {Container, ThemeProvider, createTheme} from '@mui/material'
import { blue } from '@mui/material/colors';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar } from './components/Navbar/Navbar'
import {Home} from './Pages/Home/Home'
import {PostDetails} from './Pages/PostDetails/PostDetails'
import { CreatorOrTag } from './components/CreatorOrTag'
import {SignUp} from './Pages/Auth/Auth'
import {CheckLoggedIn} from './components/CheckLoggedIn'

function App() {
  const theme = createTheme({
    palette: {
      primary:{
        main: blue[500]
      },
    },
    // typography: {
    //   fontFamily: "'Lobster', cursive",
    // } 
    
  })

  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container maxWidth='xl'>
            <Navbar />
            <Routes>
              {/* <Route path="/" element={<Navigate to="/posts" replace />} /> */}
              {/* <Route path="/posts" element={<Home />} /> */}
              {/* <Route path="/posts/search" element={<Home />} /> */}
              {/* <Route path="/posts/:id" element={<PostDetails />} /> */}
              {/* <Route path={['/creators/:name', '/tags/:name']} elememt={<CreatorOrTag />} /> */}
              {/* <Route path="/auth" element={!user ? <SignUp /> : <Navigate to="/posts" replace/>} /> */}
              <Route path='/' element={<Home />} />
              <Route path='/auth' element={<SignUp />} />
              <Route path='/posts/search' element={<Home />} />
              <Route path='/posts/creator' elememt={<CreatorOrTag />} />

              <Route path='/posts' element={<CheckLoggedIn/>}>
                <Route path='/posts' element={<Home />} />  
              </Route>

              <Route path='/posts/:id' element={<CheckLoggedIn/>}>
                <Route path='/posts/:id' element={<PostDetails />} />
              </Route>
            </Routes>
          </Container>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
