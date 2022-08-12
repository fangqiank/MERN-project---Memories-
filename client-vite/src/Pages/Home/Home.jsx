import React, {useState} from 'react'
import {Container,Grow, Alert ,AlertTitle ,AppBar, TextField, Button, Paper, Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchBySearch, fetchPosts } from '../../features/post/postSlice'

import { Posts } from '../../components/Posts/Posts'
import { Form } from '../../components/Form/Form'
import { Paginate } from '../../components/Pagination/Pagination'
import useStyles from './style'

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

export const Home = () => {
	const [currentId, setCurrentId] = useState(0)
	const [search, setSearch] = useState('')
	const [tags, setTags] = useState([])
	const dispatch = useDispatch()
	const classes = useStyles()
	const query = useQuery()
	const page = query.get('page') || 1
	const searchQuery = query.get('searchQuery')
	const navigate = useNavigate()
	const auth = useSelector(state => state.auth.authData)
	const user = localStorage.getItem('profile')
	 ? JSON.parse(localStorage.getItem('profile'))
	 : null

	const searchPost = () => {
		if(search.trim() || tags.length != 0) {
			// dispatch(getPostBySearch({
		 console.log({search, tags})
			dispatch(fetchBySearch({	
				search,
				tags: tags.join(','),
			}))
			navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
		} else {
			dispatch(fetchPosts(page))
			navigate('/')
		}
	}
 
  const handlePress = e => {
		if(e.keyCode === 13) {
			searchPost()
		}
	}

	return (
		<Grow in>
			<Container>
				<Grid 
					container 
					// direction='column-reverse'
					justifyContent='space-between' 
					alignItems='stretch' 
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} md={9}>
						<Posts setCurrentId={setCurrentId}/>
						{
							(!searchQuery && !tags.length) && (
								<Paper className={classes.pagination} elevation={6}>
									<Paginate page={page} />
								</Paper>
							)
						}
					</Grid>
					<Grid item xs={12} md={3}>
						<AppBar 
							className={classes.appBarSearch} 
							position="static" 
							color="inherit"
						>
							<TextField 
								onKeyDown={handlePress} 
								name="search" 
								variant="outlined" 
								label="Search Memories" 
								fullWidth value={search} 
								onChange={(e) => setSearch(e.target.value)} 
							/>
              <TextField
								sx={{margin: '10px 0'}} 
								name="tags" 
								variant="outlined" 
								label="Tags (coma separated)" 
								// fullWidth 
								value={tags} 
								onChange={e => setTags(e.target.value.replace(/\s/g, '').split(','))}
							/>

              <Button 
								sx={{marginTop: '5px'}}
								onClick={searchPost} 
								className={classes.searchButton} 
								variant="contained" 
								color="primary"
							>
									Search
								</Button>
						</AppBar>
						{auth || user ? (
						<Form currentId={currentId} setCurrentId={setCurrentId}/>
						) :(
							<Paper className={classes.paper} elevation={6}>
								<Alert severity="warning">
  								<AlertTitle>Please Sign In</AlertTitle>
										Please Sign In to create your own memories and like other's memories.
									</Alert>
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}
