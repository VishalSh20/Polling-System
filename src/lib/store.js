import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import pollSlice from './slices/pollSlice';
import userSlice from './slices/userSlice';
import chatSlice from './slices/messageSlice'

const rootReducer = combineReducers({
    poll: pollSlice,
    user: userSlice,
    chat: chatSlice
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user', 'poll']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

const persistor = persistStore(store);

export { store, persistor };
