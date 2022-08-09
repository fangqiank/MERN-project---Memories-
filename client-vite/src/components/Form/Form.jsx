import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { TextField, Button, Typography, Paper } from '@mui/material'
import useStyles from './style'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/postAction'

export const Form = ({currentId, setCurrentId}) => {
	const classes = useStyles()
  const navigate = useNavigate()
	const dispatch = useDispatch()

	// const [tag, setTag] = useState('')

	const post = useSelector(state => 
		currentId ? state.posts.posts.find(p => p._id === currentId) : null
	)

	const [postData, setPostData] = useState({ 
		title: '', 
		message: '', 
		tags: '', 
		selectedFile: '' 
	})

	const user = JSON.parse(localStorage.getItem('profile'))

	const handleClear = () => {
		setCurrentId(0)

		setPostData({ 
			title: '', 
			message: '',
			tags: '', 
			selectedFile: '' 
		})

		// setTag('')
	}

	const handleSubmit = e => {
		e.preventDefault()

		if(currentId === 0) {
			dispatch(createPost({...postData, user: user?.result?.name}, navigate))
			toast.success('Post created successfully!')

			handleClear()
		}else{
			dispatch(updatePost(currentId, {...postData, user: user?.result?.name }))
			toast.success(`Post ${currentId} updated successfully!`)

			handleClear()
		}
	}

	if(!user?.result?.name){
		return (
			<Paper className={classes.paper} elevation={6}>
				<Typography variant="h6" align='center'>
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		)
	}

	useEffect(() => {
		if(!post?.title) handleClear()

		if(post) {
			setPostData({ 
				// creator: post.creator, 
				title: post.title, 
				message: post.message, 
				tags: post.tags, 
				selectedFile: post.selectedFile 
			})
		}
	}, [post])

	return (
		<Paper className={classes.paper}>
			<form 
				autoComplete='off' 
				noValidate 
				className={`${classes.root} ${classes.form}`}
				onSubmit = {handleSubmit}
			>
				<Typography variant='h6'>
					{currentId === 0 ? 'Creating Post' : 'Editing Post'}
				</Typography>

				<TextField 
					name='title' 
					variant='outlined' 
					label='Title' 
					fullWidth
					value={postData.title}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>

				<TextField 
					name='message' 
					variant='outlined' 
					label='Message' 
					fullWidth
					value={postData.message}
					onChange={e => setPostData({ ...postData, message: e.target.value })}
				/>

				<TextField 
					name="tags" 
					variant="outlined" 
					label="Tags (coma separated)" 
					fullWidth 
					value={postData.tags} 
					onChange={e => setPostData({ ...postData, tags: e.target.value.split(',')})}
				/>

			
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} 
					/>
				</div>

				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>

				<Button
					sx={{marginTop: '10px'}}
					variant='contained'
					color='secondary'
					size='small'
					onClick={handleClear}
					fullWidth
				>
					Clear
				</Button>

			</form>
		</Paper>
	)
}
