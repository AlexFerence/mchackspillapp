
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
        case SET_PROFILE:
            return {
                ...state,
                ...action.payload
            }
        case INCREMENT_CLUBSVIEWED:
            return {
                ...state,
                clubsViewed: state.clubsViewed + 1
            }
        default:
            return state
    }
}