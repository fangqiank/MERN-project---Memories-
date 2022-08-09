import React, {useState, useEffect} from 'react'
import {Container,Grow, Grid} from '@mui/material'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/postAction'

import { Posts } from '../../components/Posts/Posts'
import { Form } from '../../components/Form/Form'

export const Home = () => {
	const [currentId, setCurrentId] = useState(0)
	const dispacth = useDispatch()

	useEffect(() => {
		dispacth(getPosts())
	}, [currentId, dispacth])

	return (
		<Grow in>
			<Container>
				<Grid 
					container 
					// direction='column-reverse'
					justifyContent='space-between' 
					alignItems='stretch' 
					spacing={3}
				>
					<Grid item xs={12} md={7}>
						<Posts setCurrentId={setCurrentId}/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId}/>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}
