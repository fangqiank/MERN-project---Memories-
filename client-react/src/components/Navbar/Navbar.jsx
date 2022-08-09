import React,{useState, useEffect} from 'react'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom'
import memories from '../../images/memories.png'
import useStyles from './style'
import {LOGOUT} from '../../constants/actionTypes'

export const Navbar = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
  const navigate = useNavigate()
	const location = useLocation()
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

	const userLogin = useSelector(state => state.auth)
	let { authData } = userLogin
	// console.log(authData)

	const logout = () => {
		dispatch({type: LOGOUT})
		navigate('/auth')
	}

	useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>
				<Typography 
					component={Link}
					to='/'
					className={classes.heading}
					variant='h2'
					align='center'
				>
					Memories
				</Typography>
				<img 
					src={memories} 
					alt="logo" 
					height='60' 
					className={classes.image}
				/>
			</div>
			
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar 
							className={classes.purple}
							alt={authData?.result.name}
							src={authData?.result.imageUrl}
							sx={{ bgcolor: deepOrange[500] }}
						>
							{`${authData?.result.name.split(' ')[0][0]}${authData?.result.name.split(' ')[1][0]}`}
						</Avatar>
						<Typography
							className={classes.userName}
							variant='h6'
						>
							{authData?.result.name}
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
				)}
			</Toolbar>
		</AppBar>
	)
}
