import userReducer from './user/userReducer'
import socketReducer from './socket/socketReducer'
import flagReducer from './flags/flagReducer'
import {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import loadingReducer from './loading/loadingReducer'
//import storageSession from 'redux-persist/lib/storage/session'
import storage from 'redux-persist/lib/storage'
const socketPersistConfig = {
    key: 'socket',
    storage: storage,
    blacklist: ['state']
  }

export default combineReducers({
    banksterUser:persistReducer(socketPersistConfig,userReducer),
    flag:flagReducer,
    loading:loadingReducer,
    socket:persistReducer(socketPersistConfig,socketReducer)
})