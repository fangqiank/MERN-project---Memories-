import React, {useState, useRef} from 'react'
import {Typography, TextField, Button} from '@mui/material'
import useStyles from './style'
import {useDispatch} from 'react-redux'
import { commentPost } from '../../actions/postAction'

export const CommentSection = ({post}) => {
	const user = JSON.parse(localStorage.getItem('profile'))
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()
	const [comments, setComments] = useState(post?.comments)
	const classes = useStyles()
	const commentRef = useRef()

	const handleComment = async () => {
		const newComment = await dispatch(commentPost(post._id, `${user?.result?.name}: ${comment}`))

		setComment('')
		setComments(newComment)

		commentRef?.current?.scrollIntoView({behavior: 'smooth'})
	}

	return (
		<>
			<div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography 
						gutterBottom 
						variant="h6"
					>
						Comments
					</Typography>
          {comments?.map((c, idx) => (
            <Typography 
							key={idx} 
							gutterBottom 
							variant="subtitle1"
						>
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography 
						gutterBottom 
						variant="h6"
					>
						Write a comment
					</Typography>
          <TextField 
						fullWidth 
						rows={4} 
						variant="outlined" 
						label="Comment" 
						multiline 
						value={comment} 
						onChange={(e) => setComment(e.target.value)} 
					/>
          <br />
          <Button 
						style={{ marginTop: '10px' }} 
						fullWidth 
						disabled={!comment.length} 
						color="primary" 
						variant="contained" 
						onClick={handleComment}
					>
            Comment
          </Button>
        </div>
      </div>
		</>
	)
}
