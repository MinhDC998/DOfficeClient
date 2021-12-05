export const JAVA_DATE_FORMAT = "MMM DD, YYYY HH:mm:ss A";

export const ACTIVITY_HISTORY_META_DATA_KEYS = {
    assignFor: 'Giao cho',
    addViewer: 'Thêm người xem',
    signBy: 'Ký bởi',
    forwardTo: 'Chuyển tiếp',
    reason: 'Lí do',
};

export const ACTION_ON_DISPATCH_META_DATA_KEYS = {
    CREATE : 'Tạo công văn',
    EDIT: 'Chỉnh sửa công văn',
    DELETE: 'Xóa công văn',
    FORWARD: 'Chuyển tiếp công văn',
    APPROVE: 'Phê duyệt',
    ADD_VIEWER: 'Thêm người theo dõi',
    TRINH_LANH_DAO_DON_VI: 'Trình lãnh đạo đơn vị ký',
    REJECT: 'Từ chối ký',
    GET_DOCUMENT_NUMBER: 'Lấy số công văn',
    PUBLISH: 'Xuất bản',
    ARCHIVE: 'Lưu trữ'
};


export const ROLE_META_DATA_KEYS = {
    unitLeadership: 7,
    officeLeadership: 8,
    vanThu: 3,
};

export const OFFICIAL_DISPATCH_STATUS_META_DATA_KEYS = {
    chuaXuLy: 1,
    daXuLy: 2,
    trinhLanhDaoDonViKy: 3,
    trinhLanhDaoCoQuanKy: 4,
};

export const PUBLISHED_DISPATCH_URL = `http://localhost:3000/published-dispatch/`;