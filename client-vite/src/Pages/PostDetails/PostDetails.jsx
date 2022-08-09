import React , {useEffect} from 'react'
import useStyles from './style'
import {Stack, Paper, Typography, CircularProgress, Divider, Chip, Avatar} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { useNavigate, Link, useParams } from 'react-router-dom'
import {getPost, getPostBySearch} from '../../actions/postAction'
import {CommentSection} from './CommentSection'

export const PostDetails = () => {
	const classes = useStyles()
	const {posts, post, isLoading} = useSelector(state => state.posts)
  const dispatch = useDispatch() 
  const navigate = useNavigate()
	const {id} = useParams()

	const stringToColor = string => {
		let hash = 0;
		let i;
	
		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
	
		let color = '#';
	
		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */
	
		return color;
	}

	const stringAvatar = name => {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: ``,
		};
	}


	useEffect(() => {
		dispatch(getPost(id))
	},[id])

	useEffect(() => {
		if(post){
			dispatch(getPostBySearch({search: 'none', tags: post?.tags.join(',')}))
		}
	}, [post])

	if(!post) return null

	const openPost = _id => navigate(`/post/${_id}`)

	if (isLoading){
		return(
			<Paper className={classes.loadingPaper} elevation={6}>
				<CircularProgress />
			</Paper>			
		) 
	}

	const recommendedPosts = posts.filter(({_id}) => _id !== post._id) 

	return (
		<Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant="h3" component="h2">
						{post.title}
					</Typography>
					<Typography 
						gutterBottom 
						variant="h6" 
						color="textSecondary" 
						component="h2"
					>
						{post.tags.map((tag, idx) => (
            <Link
							key={idx}
							to={`/tags/${tag}`} 
							style={{ textDecoration: 'none', color: '#3f51b5' }}
						>
							<Stack
								key={idx} 
								direction='row' 
								spacing={1} 
								sx={{marginTop:'5px', fontSize:'10px'}}
							>
								<Chip 
									label={`${tag} `}  
									color='default' 
									size='small'
									avatar={<Avatar {...stringAvatar(tag)}/>}
								/>
							</Stack>
            </Link>
          ))}
          </Typography>

					<Typography gutterBottom variant='body1' component='p'>
						{post.message}
					</Typography>

					<Typography variant="h6">
            Created by:
            <Link to={`/posts/creator?user=${post.user}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.user}`}
            </Link>
          </Typography>

					<Typography variant="body1">
						{moment(post.createdAt).fromNow()}
					</Typography>

					<Divider style={{ margin: '20px 0' }} />

					<Typography variant="body1">
						<strong>Realtime Chat - coming soon!</strong>
					</Typography>

					<Divider style={{ margin: '20px 0' }} />

					<CommentSection post={post} />

					<Divider style={{ margin: '20px 0' }} />
				</div>

				<div className={classes.imageSection}>
          <img 
						className={classes.media} 
						src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
						alt={post.title} />
        </div>
			</div>

			{!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
						You might also like:
					</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
	)
}
