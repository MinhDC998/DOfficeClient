
export const Routes = {
    // pages
    Presentation: { path: "/" },
    DashboardOverview: { path: "/dashboard/overview" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signin: { path: "/sign-in" },
    Signup: { path: "/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" },

    // dashboard
    User: { path: '/dashboard/user' },
    AddUser: { path: '/dashboard/user/add' },

    // Coming dispatch management
    ComingDispatchManagement: { path: '/coming-dispatch' },
    AddComingDispatch: { path: '/coming-dispatch/add' },
    ComingDispatchDetail: { path: '/coming-dispatch/:id' },

    // Out going dispatch management
    OutGoingDispatchManagement: { path: '/out-going-dispatch' },

    //Work
    WorkManagement: { path: '/work' },
    StoredWorks: { path: '/work/stored' },
    AddWork: { path: '/work/addWork' },
    WorkDetail: { path: '/work/detail/:id' },
    MyWork: { path: '/work/user/:userId' },


    //Task
    TaskManagement: { path: "/task" },
    TaskDetail: { path: '/task/detail/:id' },
    MyTask: { path: '/task/user/:userId' },

    //Meeting
    MeetingCalendar: { path: "/MeetingCalendar" },
    MeetingManager: { path: "/Meeting" },
    MeetingDetail: { path: '/meeting/detail/:id' },
    MeetingIntivation: { path: '/meeting/intivation' },
    Calendar: { path: "/Calendar" },


};