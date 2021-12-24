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
// import activityHistoryReducer from "../reducers/activityHistory.reducer";
// import outGoingDispatchReducer from "../reducers/outGoindDispatch.reducer";
// import roleReducer from "../reducers/role.reducer";
import workReducer from '../reducers/work.reducer'
import taskReducer from '../reducers/task.reducer'
import staffReducer from '../reducers/staff.reducer'
import meetingReducer from '../reducers/meeting.reducer';

const allReducers = combineReducers({
    authentication: authenticationReducer,
    comingDispatch: comingDispatchReducer,
    // outGoingDispatch: outGoingDispatchReducer,
    documentType: documentTypeReducer,
    storageLocation: storageLocationReducer,
    user: userReducer,
    releaseDepartment: releaseDepartmentReducer,
    // activityHistory: activityHistoryReducer,
    // role: roleReducer,
    work: workReducer,
    task: taskReducer,
    staff: staffReducer,
    meeting: meetingReducer,
});

const middlewares = [applyMiddleware(thunk, createLogger())];

const enhancer = composeWithDevTools(...middlewares);

const store = createStore(allReducers, enhancer);

export default store;