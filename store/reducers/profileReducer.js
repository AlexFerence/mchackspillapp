
const profileDefaultState = {
    firstName: '',
    lastName: '',
    email: '',
    uid: '',
    city: '',
    clubsViewed: 0
}

export default (state = profileDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}