export default (state= { posts: [], isLoading: true }, action) => {
    switch(action.type){
        case 'START_LOADING':
            return { ...state, isLoading: true}
    
        case 'END_LOADING':
            return { ...state, isLoading: false}
        
        case 'DELETE':
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}

        case 'UPDATE_POST':
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload: post)}

        case 'FETCH_POSTDETAIL':
            return { ...state, post: action.payload }

        case 'FETCH_ALL':
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages, 
            }

        case 'FETCH_BY_SEARCH':
            return {...state, posts: action.payload}
        
        case 'CREATE':
            return {...state, posts: [ action.payload, ...state.posts  ]}

        default: 
            return state
    }
}