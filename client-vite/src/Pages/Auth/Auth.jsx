import React, {useState} from 'react'
import {createAction}from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import {Avatar, Button, Paper, Typography, Container, Grid} from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { toast } from 'react-toastify'
import useStyles from './style'
import {Input} from '../../components/Input'
import { signIn, signUp } from '../../features/auth/authSlice'
// import {signIn, signUp} from '../../actions/userAction'
// import { AUTH } from '../../constants/actionTypes' 
import jwt_decode from 'jwt-decode'

const initialState = { 
	firstName: '', 
	lastName: '', 
	email: '', 
	password: '', 
	confirmPassword: '' 
}

export function SignUp() {
	const classes = useStyles()

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState(false)
	const [isSignup, setIsSignup] = useState(false)
	const [form, setForm] = useState(initialState)

	const byGoogle = createAction('auth/googleSignIn', function prepare(profile) {
		return {
			payload: {profile}
		}
	})

	const handleShowPassword = () => setShowPassword(!showPassword)

	const handleSubmit = e => {
		e.preventDefault()

		if (isSignup) {
			const registerAndRedirect = {
				formData: form,
				redirect: navigate
			}
			if (form.password === form.confirmPassword){
				dispatch(signUp(registerAndRedirect))
				navigate('/')
			}else{
				setForm({...form, passowrd: '', confirmPassword: ''})
				toast.warning('Passwords do not match')
			}
			
		} else {
			const loginAndRedirect = {
				formData: form,
				redirect: navigate
			}
			dispatch(signIn(loginAndRedirect))
			navigate('/')
		}
	}

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const switchMode = () => {
		setForm(initialState)
		setIsSignup(prev => !prev)
		setShowPassword(false)
	}

	const googleSuccess = response => {
		// console.log(response)
		const decoded = jwt_decode(response.credential)
		const {name, email, picture, sub} = decoded
		const userInfo = {
			result:{
				_id: sub,
				name,
				email,
				imageUrl: picture
			},
			token: response.credential
		} 

		const action = byGoogle(userInfo)

		try{
			localStorage.setItem('profile', JSON.stringify(action.payload.profile))
			navigate('/')
		}catch(err){
			console.log(err)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar} sx={{ bgcolor: deepPurple[500] }}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component='h1' variant='h5'>
					{isSignup ? 'Sign up' : 'Sign in'}
				</Typography>

				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First name'
									handleChange={handleChange}
									autoFocus
									half
									xs={6} />
								<Input
									name='lastName'
									label='Last name'
									handleChange={handleChange}
									half
									xs={6} />
							</>
						)}
						<Input
							name="email"
							label="Email"
							handleChange={handleChange}
							type="email" />
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword} />
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password" />
						)}
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						style={{ 'marginTop': '10px' }}
					>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
							</Button>
						</Grid>
						<Grid item>
							<GoogleLogin
								onSuccess={googleSuccess}
								onError={() => console.log('error')} 
							/>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}
