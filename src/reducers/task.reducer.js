const initialState = {
    tasks: [],
    loading: false,
    taskAssigns: [],
    taskDetail: undefined,
};

const taskReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'TASK_LOADED':
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case 'TASK_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'TASK_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'TASK_ASSIGN_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'TASK_ASSIGN_LOADED':
            return {
                ...state,
                taskAssigns: action.payload,
                loading: false,
            };
        case 'TASK_ASSIGN_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'TASK_DETAIL_LOADED':
            return {
                ...state,
                taskDetail: action.payload,
                loading: false,
            };
        case 'TASK_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'TASK_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default taskReducer;
