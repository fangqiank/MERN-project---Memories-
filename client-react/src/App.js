import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container, ThemeProvider, createTheme } from '@mui/material'
import { blue } from '@mui/material/colors'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar } from './components/Navbar/Navbar'
import { Home } from './Pages/Home/Home'
import { SignUp } from './Pages/Auth/Auth'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
    },
  })

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container maxWidth="xl">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<SignUp />} />
            </Routes>
          </Container>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
