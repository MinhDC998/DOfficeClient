const initialState = {
    meetings: [],
    loading: false,
    attendees: [],
    attendances: [],
    meetingDetail: undefined,
};

const meetingReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MEETING_LOADED':
            return {
                ...state,
                meetings: action.payload,
                loading: false,
            };
        case 'MEETING_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'MEETING_LOADING':
            return {
                ...state,
                loading: true,
            };

        case 'ATTENDEES_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ATTENDEES_LOADED':
            return {
                ...state,
                attendees: action.payload,
                loading: false,
            };
        case 'ATTENDEES_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'ATTEND_LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'ATTEND_LOADED':
            return {
                ...state,
                attendances: action.payload,
                loading: false,
            };
        case 'ATTEND_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'MEETING_DETAIL_LOADED':
            return {
                ...state,
                meetingDetail: action.payload,
                loading: false,
            };
        case 'MEETING_DETAIL_FAILED':
            return {
                ...state,
                loading: false,
            };
        case 'MEETING_DETAIL_LOADING':
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default meetingReducer;
