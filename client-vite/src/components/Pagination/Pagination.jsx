import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Pagination, PaginationItem} from '@mui/material'
import { Link } from 'react-router-dom'

import { fetchPosts, reset } from '../../features/post/postSlice'

export const Paginate = ({page}) => {
	const {numberOfPages, isSuccess} = useSelector(state => state.posts)
  const dispatch = useDispatch()

	useEffect(() =>{
		return () => {
			if(isSuccess)
				dispatch(reset())
		}
	},[dispatch, isSuccess])

	useEffect(() => {
		if(page)
			dispatch(fetchPosts(page))
	},[dispatch, page])

	return (
		<Pagination
			sx={{display: 'flex', justifyContent: 'space-around'}}
			count={numberOfPages}
			page={Number(page) || 1}
			variant='outlined'
			color='primary'
			renderItem={item => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${item.page}`} 
				/>
			)} 
		/>
	)
}
