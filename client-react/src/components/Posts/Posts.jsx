import React from 'react'
import  {useSelector} from 'react-redux'
import { Grid, CircularProgress } from '@mui/material'
import { Post } from './Post/Post'
import useStyles from './style' 

export const Posts = ({setCurrentId}) => {
	const classes = useStyles()

	const posts = useSelector(state => state.posts.posts)

	return (
		!posts.length ? (<CircularProgress />) : (
			<Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
		)
	)
}
