import React from 'react'
import useStyles from './styles'
import { Card, CardContent, CardActions, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import {ThumbUpAlt, Delete, MoreHoriz, ThumbUpAltOutlined } from '@material-ui/icons'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const Likes = () => {
        if (post.likes.length >= 1) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAlt fontSize="small" /> {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" /> {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like </>
    }

    const openPost = () => history.push(`/posts/${post._id}`)

    return (
        <Card onClick={openPost} className={classes.card} raised elevation={6}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'>
                        {post.name}
                    </Typography>
                    <Typography variant='body2'>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </div>

                <div className={classes.overlay2}>
                {user?.result?.googleId === post.creator || user?.result?._id === post.creator 
                    &&(
                        <Button 
                            style={{color: 'white'}} 
                            size='small' 
                            onClick={() => setCurrentId(post._id)}
                        >
                            <MoreHoriz fontSize='medium' />
                        </Button>
                    )  
                }           
                </div>

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{post.title}</Typography>
                <CardContent>
                    <Typography style={{color: '#434649', fontSize: '1.0rem'}} gutterBottom variant='h5'>{post.message}</Typography>
                </CardContent>

            <CardActions className={classes.cardActions}>
                <Button disabled={!user?.result} size='small' color='primary' onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                     {post.likeCount}
                </Button>
                {user?.result?.googleId === post.creator || user?.result?._id === post.creator 
                && (
                    <Button size='small' color='secondary' variant='contained' onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize='small' />
                        Delete
                    </Button>
                )
                } 
                
            </CardActions>
        </Card>
    )
}

export default Post
