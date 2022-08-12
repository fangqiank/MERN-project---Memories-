import React, {useState} from 'react'
import { styled } from '@mui/material/styles'
import useStyles from './style'
import {Stack,Card, CardHeader,CardActions, CardContent, CardMedia, Button, Typography, Chip, Avatar, IconButton } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { deletePost, likePost } from '../../../actions/postAction'
import {deletePost, likePost} from '../../../features/post/postSlice' 

export const Post = ({post, setCurrentId}) => {
	const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
	const dispatch = useDispatch()
	const [likes, setLikes] = useState(post?.likes)
	const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

	const userId = user?.result?._id
	const hasLikedPost = post?.likes?.find(like => like === userId)

	const handleLike = () => {
		dispatch(likePost(post._id))

		if(hasLikedPost) {
			setLikes(post.likes.filter(id => id !== userId))
		}else{
			setLikes([...post.likes, userId])
		}
	} 

	const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	}))

	const stringToColor = string => {
		let hash = 0;
		let i;
	
		/* eslint-disable no-bitwise */
		for (i = 0; i < string?.length; i += 1) {
			hash = string?.charCodeAt(i) + ((hash << 5) - hash);
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
			children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
		};
	}
	
	const Likes = () => {
		if(likes.length > 0) {
			return likes.find(like => like === userId) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />{' '}
					{
						likes.length > 2 
						? `You and ${likes.length - 1} others` 
						: `${likes.length} like${likes.length > 1 
						? 's' : ''}` 
					}
				</>
			) : (
				(
          <>
						<ThumbUpAltOutlined fontSize="small" />{' '}{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
					</>
        )
			)
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />{' '}Like
			</>
		)
	}

	const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

	return (
		<Card className={classes.card} raised elevation={6}>
			<CardHeader
				avatar={
					<Avatar {...stringAvatar(post.user)}/>
				}
				action={
					<IconButton aria-label="details" onClick={openPost}>
						<ArrowForwardIosIcon />
					</IconButton>
				}
				title={post.title}
				subheader={moment(post.createdAt).fromNow()}
			/>
			<CardMedia 
				className={classes.media} 
				image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
				title={post.title} 
			/>
			
			<div className={classes.details}>
				<Typography 
					variant="body2" 
					color="textSecondary" 
					component="h2"
				>
					{post?.tags?.map((tag, idx) => (
						<Stack
							key={idx} 
							direction={'row'} 
							spacing={1} 
							sx={{marginTop:'5px', fontSize:'10px'}}
						>
							<Chip 
								label={`${tag} `}  
								color= 'default' 
								size='small'
								icon={<FaceIcon />}
							/>
						</Stack>
						))}
				</Typography>
			</div>

			<CardContent>
				<Typography 
					variant="body2" 
					color="text.secondary" 
					component="p"
				>
					{post?.message?.length > 20 ? `${post.message.substring(0, 20)}...` : post.message}
				</Typography>
			</CardContent>

		<CardActions className={classes.cardActions} disableSpacing>
			<Button 
				size="small" 
				color="primary"
				disabled={!user?.result}
				onClick={handleLike}
			>
				<Likes /> 
			</Button>

			<Button 
				size="small" 
				color="primary" 
				disabled={user?.result?._id !== post?.creator}
				onClick={() => {
					dispatch(deletePost(post._id))
					// window.location.reload()
				}}
			>
				<DeleteIcon fontSize="small" /> Delete
			</Button>

			
			<ExpandMore
				expand={expanded}
				onClick={e => {
					e.stopPropagation()
					setCurrentId(post._id)
				}}
				aria-expanded={expanded}
				aria-label="edit"
				disabled={user?.result?._id !== post?.creator}
			>
				<MoreHorizIcon fontSize="default"/>
			</ExpandMore>
		</CardActions>
	</Card>
	)
}
