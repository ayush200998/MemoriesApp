import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Paper, Typography, Button, TextField } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if(post !== null){
            setPostData(post)
            console.log(postData)
        } 
    },[post])

    const clear = () => {
        console.log('Clear clicked')
        setCurrentId(null)
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId){
            console.log('update Post called')
            dispatch(updatePost(currentId, postData))
        }else{
            console.log('create Post called')
            dispatch(createPost(postData))
        }
        clear()
    }

    

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete='off'
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'> {currentId ? 'Editing' : 'Creating'} a Memory </Typography>
                <TextField 
                    variant='outlined'
                    label='Creator' 
                    name='creator' 
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData , creator: e.target.value})}
                />
                <TextField 
                    variant='outlined'
                    label='Title' 
                    name='title' 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData , title: e.target.value})}
                />
                <TextField 
                    variant='outlined'
                    label='Message' 
                    name='message' 
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData , message: e.target.value})}
                />
                <TextField 
                    variant='outlined'
                    label='Tags' 
                    name='tags' 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData , tags: e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}
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
                    size='large'
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>

            </form>
        </Paper>
    )
}

export default Form
