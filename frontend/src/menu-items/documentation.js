// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const documentation = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://github.com/Raphael-Jin',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default documentation;
