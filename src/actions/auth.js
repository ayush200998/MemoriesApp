import * as api from '../api'

export const signup = (formData, history) => async(dispatch) => {
    try {
        //Sign up user
        const { data } = await api.signup(formData)
        dispatch({type: 'AUTH', payload: data })

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signin = (formData, history) => async(dispatch) => {
    try {
        // Sign in user
        const { data } = await api.signin(formData)
        dispatch({type: 'AUTH', payload: data })

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}