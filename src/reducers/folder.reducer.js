const defaultState = {
    folder : {},
    loading : false,
    mydocumentid : '',
    publicfolderid : '',
};

const folderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'FOLDER_LOADED':
            return {
                ...state,
                folder: action.payload,
                loading: false,
            };
        case 'FOLDER_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'FOLDER_LOADING':
            return {
                ...state,
                loading: true,
            };
        
        case 'MY_DOCUMENT_ID_LOADED':
            return {
                ...state,
                mydocumentid: action.payload,
                loading: false,
            };
        case 'MY_DOCUMENT_ID_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'MY_DOCUMENT_ID_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'PUBLIC_ID_LOADED':
            return {
                ...state,
                publicfolderid: action.payload,
                loading: false,
            };
        case 'PUBLIC_ID_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'PUBLIC_ID_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default folderReducer;
