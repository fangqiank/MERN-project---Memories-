import {Navigate, Outlet} from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import {useAuthStatus}  from '../../hooks/useAuthStatus'

export const CheckLoggedIn = () => {
	const {loggedIn, checking} = useAuthStatus()
	if (checking) 
		return <CircularProgress />

	return (
		loggedIn ? <Outlet /> : <Navigate to="/auth" />
	)
}