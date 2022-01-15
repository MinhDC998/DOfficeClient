const defaultState = {
    pendingDocuments : [],
    trash : [],
    loading : false,
    // selectedDocument : {},
    content: ''
};

const documentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'PENDING_DOCUMENT_LOADED':
            return {
                ...state,
                pendingDocuments: action.payload,
                loading: false,
            };
        case 'PENDING_DOCUMENT_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'PENDING_DOCUMENT_LOADING':
            return {
                ...state,
                loading: true,
            };
        
        case 'TRASH_LOADED':
            return {
                ...state,
                trash: action.payload,
                loading: false,
            };
        case 'TRASH_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'TRASH_LOADING':
            return {
                ...state,
                loading: true,
            };

        // case 'SELECTED_DOCUMENT_LOADED':
        //     return {
        //         ...state,
        //         selectedDocument: action.payload,
        //         loading: false,
        //     };
        // case 'SELECTED_DOCUMENT_FAILED':
        //     return {
        //         ...state,
        //         loading: false,
        //     };
        // case 'SELECTED_DOCUMENT_LOADING':
        //     return {
        //         ...state,
        //         loading: true,
        //     };

        case 'CONTENT_DOCUMENT_LOADED':
            return {
                ...state,
                content: action.payload,
                loading: false,
            };
        case 'CONTENT_DOCUMENT_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'CONTENT_DOCUMENT_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default documentReducer;
