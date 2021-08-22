import React, { useState } from 'react'
import useStyles from './styles'
import { Container, Paper, Avatar, Typography, Grid, Button, } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import Input from './Input'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { signup, signin } from '../../actions/auth'

const Auth = () => {
    const initialState = {
        firstName:'',
        lastName:'',
        email: '',
        password:'',
        confirmPassword:'',
    }

    const [formData, setFormData] = useState(initialState)
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signup( formData, history ))
        }else{
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const googleSuccess = async(res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try{
            console.log('inside try')
            dispatch({type: 'AUTH', payload: {result, token }})
            history.push('/')
        }catch(error){
            console.log(error)
        }
    }

    const googleFailure = () => {
        console.log('Error while logging in, Please try again.')
    }

    const switchMode = () =>{
        setIsSignUp((prevValue) => !prevValue)
    } 

    const handleShowPassword = () => setShowPassword((prevPassword) => !prevPassword)

    return (
        <Container component='main' maxWidth='xs'>
            <Paper elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5' >
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input 
                                        name='firstName' 
                                        label='First Name' 
                                        autoFocus 
                                        handleChange={handleChange}
                                        half 
                                        type='text'
                                    />

                                    <Input 
                                        name='lastName' 
                                        label='Last Name' 
                                        handleChange={handleChange}
                                        half 
                                        type='text'
                                    />
                                </>
                            )     
                        }

                        <Input 
                            name='email' 
                            label='Email Address' 
                            handleChange={handleChange}
                            type='email'
                        />

                        <Input
                            name='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword} 
                        />

                        {
                            isSignUp && <Input
                                name='confirmPassword'
                                label='Confirm Password'
                                type='password'
                                handleChange={handleChange}
                            />
                        }
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color={isSignUp ? 'secondary' : 'primary'}
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId='172756122493-t24qg300c3k0rnledmd8lj0mdrq5nhq9.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled}
                                className={classes.googleButton}
                                color='primary'
                                variant='contained'
                                fullWidth
                                startIcon={<Icon />}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an Account? Sign In' : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
