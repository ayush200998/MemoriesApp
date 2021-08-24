import React, { useState, useEffect } from 'react'
import { Grow, Container, Grid, Paper, TextField, AppBar, Button } from '@material-ui/core'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination'
import ChipInput from 'material-ui-chip-input'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const history = useHistory()
    const location = useLocation()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const handleKeyPress = (e) => {
        // Key Code 13 = Enter Key.
        if(e.keyCode === 13){
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag ])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)) 

    const searchPost = () => {
        if(search.trim() || tags){
            // dispatch -> Search Post
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))

            history.push(`/posts/search?searchQuery=${search || 'null'}&tags=${tags.join(',')}`)
        }else{
            history.push('/')
        }
    }

    

    return (
        <Grow in>
                <Container maxWidth='xl'>
                    <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={4}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField
                                    name='search'
                                    label='Search Memories'
                                    variant='outlined'
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <ChipInput
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    variant='outlined'
                                    label='Search by Tags'
                                />

                                <Button
                                    className={classes.searchButton}
                                    color='primary'
                                    variant='contained'
                                    onClick={searchPost}
                                >
                                    Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            <Paper elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home
