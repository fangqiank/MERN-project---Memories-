import React from 'react'
import {useLocation, useSearchParams, useParams} from 'react-router-dom'
import {Typography, Grid, CircularProgress, Divider} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'

import {Post} from './Posts/Post/Post'
// import { getPostByCreator, getPostBySearch } from '../actions/postAction'
import {fetchBySearch, fetchByCreator} from '../features/post/postSlice'
import { useEffect } from 'react'

export const CreatorOrTag = () => {
	const {name} = useParams()
	// const [searchParams, setSearchParams] = useSearchParams()
	// const name = searchParams.get('name') 
	const dispatch = useDispatch()
	const location = useLocation()
	const {posts, isLoading} = useSelector(state => state.posts)

	useEffect(() => {
		location.pathname.startsWith('/tags') 
		? dispatch(fetchBySearch({tags: name}))
		: dispatch(fetchByCreator(name))
		// dispatch(fetchByCreator(name))
	}, [])

	if(!posts.length && !isLoading) 
		return 'No posts found'

	return (
		<div>
			<Typography variant="h6">
				{name}
			</Typography>

			<Divider
				sx={{margin: '20px 0 50px 0'}} 
			/>

			{isLoading ? (
				<CircularProgress />
			) : (
				<Grid container spacing={3} alignItems='stretch'>
					{posts.map(post => (
						<Grid
							key={post._id}
							item 
							xs={12}
							sm={12}
							md={6}
							lg={3}
						>
							<Post post={post} />
						</Grid>
					))}	
				</Grid>
			)}
		</div>
	)
}
