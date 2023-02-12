// assets
import { IconBucketDroplet, IconDashboard, IconBrandChrome, IconBox, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBucketDroplet, IconDashboard, IconBrandChrome, IconBox, IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Usage',
            type: 'item',
            url: '/usage',
            icon: icons.IconBucketDroplet,
            breadcrumbs: false
        },
        {
            id: 'model',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'sample-page',
            title: 'AI Graph',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
