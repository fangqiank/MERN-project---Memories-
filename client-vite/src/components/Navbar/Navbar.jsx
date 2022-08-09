import React,{useState, useEffect} from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@mui/material'
import decode from 'jwt-decode';
import { deepOrange } from '@mui/material/colors'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
import memoriesLogo from '../../images/memoriesLogo.png'
// import memoriesText from '../../images/memoriesText.png'
import useStyles from './style'
import {LOGOUT} from '../../constants/actionTypes'

export const Navbar = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
  const navigate = useNavigate()
	const location = useLocation()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

	// const userLogin = useSelector(state => state.auth)
	// let { authData } = userLogin
	
	const logout = () => {
		dispatch({type: LOGOUT})
		navigate('/auth')
		setUser(null)
	}

	useEffect(() => {
		const token = user?.token
		
		if(token) {
			const decoded = decode(token)

			// if(decoded.exp < Date.now() / 1000)
			if (decoded.exp * 1000 < new Date().getTime())  
				logout()
		}

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>

				<Typography 
					component={Link} 
					to="/"
					sx={{
						fontFamily: '"Lobster", cursive', 
						color: '#000',
					}}
					className={classes.heading} 
					variant="h2" 
					align="center"
				>
					Memories
				</Typography>
        
        <img 
					className={classes.image} 
					src={memoriesLogo} 
					alt="icon" 
					height="40px" 
				/>
      </div>
			
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar 
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}
							sx={{ bgcolor: deepOrange[500] }}
						>
							{`${user?.result.name.split(' ')[0][0]}${user?.result.name.split(' ')[1][0]}`}
						</Avatar>
						<Typography
							className={classes.userName}
							variant='h6'
						>
							{user?.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={logout} 
						>
							Logout
						</Button>
					</div>
				) : (
					<Button 
						variant='contained'
						component={Link}
						to='/auth'
						color='primary' 
					>
						Sign In
					</Button>

					// <Link to='/auth' style={{"textDecoration": 'none'}}>
					// 	<Button variant='contained' color='primary'>
					// 		Sign In
					// 	</Button>
					// </Link>
				)}
			</Toolbar>
		</AppBar>
	)
}
