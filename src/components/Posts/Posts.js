import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'


const Posts = ({ setCurrentId }) => {
    const classes = useStyles()
    const { posts, isLoading } = useSelector((state) => state.posts )

    if(!posts?.length && !isLoading)
        return 'No Posts'

    return (
        isLoading ? <CircularProgress /> : (
            <Grid container className={classes.container} alignItems='stretch' spacing={3}>
                 {posts.map((post) => (
                     <Grid key={post._id} item xs={12} sm={6} md={4}  lg={3}>
                         <Post setCurrentId={setCurrentId} post={post} />
                     </Grid>    
                 ))}
            </Grid>
        )
    )
}

export default Posts
