// assets
import { IconDashboard, IconBrandChrome, IconBox, IconHelp } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBrandChrome, IconBox, IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'model',
            title: 'AI Model',
            type: 'item',
            url: '/ai-model',
            icon: icons.IconBox,
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
