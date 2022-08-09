import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { TextField, Button, Typography, Paper } from '@mui/material'
import useStyles from './style'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/postAction'

export const Form = ({currentId, setCurrentId}) => {
	const classes = useStyles()

	const dispatch = useDispatch()

	const post = useSelector(state => 
		currentId ? state.posts.posts.find(p => p._id === currentId) : null
	)

	const [postData, setPostData] = useState({ 
		creator: '', 
		title: '', 
		message: '', 
		tags: '', 
		selectedFile: '' 
	});

	const handleClear = () => {
		setCurrentId(0)

		setPostData({ 
			creator: '', 
			title: '', 
			message: '', 
			tags: '', 
			selectedFile: '' 
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		if(currentId === 0) {
			dispatch(createPost(postData))
			toast.success('Post created successfully!')

			handleClear()
		}else{
			dispatch(updatePost(currentId, postData))
			toast.success(`Post ${currentId} updated successfully!`)

			handleClear()
		}
	}

	useEffect(() => {
		if(post) {
			setPostData({ 
				creator: post.creator, 
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
					name='creator' 
					variant='outlined' 
					label='Creator' 
					fullWidth
					value={postData.creator}
					onChange={e => setPostData({ ...postData, creator: e.target.value })}
				/>

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
					fullWidth value={postData.tags} 
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} 
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
