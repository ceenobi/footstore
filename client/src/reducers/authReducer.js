export const initialState = {
  currentUser: null,
  token: '',
  loading: false,
  errorMessage: null,
}

export const AuthReducer = (state, action) => {
  console.log('pinned dispatched', action)
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      }
    case 'REQUEST_REGISTER':
      return {
        ...state,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        token: action.payload,
        loading: false,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload,
        token: action.payload,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        currentUser: '',
        token: '',
      }

    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      }
    case 'REGISTER_ERROR':
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      }

    default:
      return state
  }
}
