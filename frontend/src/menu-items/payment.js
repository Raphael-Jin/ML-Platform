// assets
import { IconCoin } from '@tabler/icons';

// constant
const icons = { IconCoin };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const payment = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'payment',
            title: 'Payment',
            type: 'item',
            url: '/payment',
            icon: icons.IconCoin,
            breadcrumbs: false
        }
    ]
};

export default payment;
