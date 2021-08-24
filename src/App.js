import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Router>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={() => <Redirect exact to='/posts' />}/>
                    <Route exact path='/posts' component={Home} />
                    <Route exact path='/posts/search' component={Home}/>
                    <Route path='/posts/:id' component={PostDetails} />
                    <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />    
                </Switch>    
            </Container>
        </Router>
    )
}

export default App
