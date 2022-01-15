import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import authenticationReducer from "../reducers/authentication.reducer";
import comingDispatchReducer from "../reducers/comingDispatch.reducer";
import documentTypeReducer from "../reducers/documentType.reducer";
import storageLocationReducer from "../reducers/storageLocation.reducer";
import userReducer from "../reducers/user.reducer";
import releaseDepartmentReducer from "../reducers/releaseDepartment.reducer";
import documentReducer from '../reducers/document.reducer'
import noteReducer from '../reducers/note.reducer'
import versionReducer from '../reducers/version.reducer'
import categoryReducer from '../reducers/category.reducer'
import permissionDocumentReducer from '../reducers/permissionDocument.reducer';
import folderReducer from '../reducers/folder.reducer'

const allReducers = combineReducers({
    authentication: authenticationReducer,
    comingDispatch: comingDispatchReducer,
    documentType: documentTypeReducer,
    storageLocation: storageLocationReducer,
    user: userReducer,
    releaseDepartment: releaseDepartmentReducer,
    // document
    document: documentReducer,
    note: noteReducer,
    version: versionReducer,
    category: categoryReducer,
    permissions: permissionDocumentReducer,
    folder: folderReducer,
});

const middlewares = [applyMiddleware(thunk, createLogger())];

const enhancer = composeWithDevTools(...middlewares);

const store = createStore(allReducers, enhancer);

export default store;
