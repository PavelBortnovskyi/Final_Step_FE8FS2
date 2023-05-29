import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'; 
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import InstallDesktopOutlinedIcon from '@mui/icons-material/InstallDesktopOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RemoveFromQueueOutlinedIcon from '@mui/icons-material/RemoveFromQueueOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


export const dropdownElements = [
    {
        id: 21,
        icon: ContactSupportOutlinedIcon,
        label: 'Topics',
        route: 'topics',
    },
    {
        id: 22,
        icon: ListAltOutlinedIcon,
        label: 'Lists',
        route: 'lists',
    },
    {
        id: 23,
        icon: PersonAddAltOutlinedIcon,
        label: 'Twitter Circle',
        route: 'members',
    },
    {
        id: 24,
        icon: VerifiedOutlinedIcon,
        label: 'Verified Orgs',
        route: 'verified_orgs_signup',
    },
    
]


export const selectElements = [
    {
        id: 831,
        label: 'Creator Studio',
        selects: [
            {
                id: 6311,
                icon: BarChartOutlinedIcon,
                label: 'Analytics',
                route: 'analytics',
            },
        ]
    },

    
    {
        id: 832,
        label: 'Professional Tools',
        selects: [
            {
                id: 7321,
                icon: RocketLaunchOutlinedIcon,
                label: 'Twitter for Professionals',
                route: 'professionals',
            },
            {
                id: 7322,
                icon: InstallDesktopOutlinedIcon,
                label: 'Twitter Ads',
                route: 'ads',
            },
            {
                id: 7323,
                icon: PaymentsOutlinedIcon,
                label: 'Monetization',
                route: 'monetization',
            },
        ]
    },
    {
        id: 833,
        label: 'Settings and Support',
        selects: [
            {
                id: 9331,
                icon: SettingsOutlinedIcon,
                label: 'Settings and privacy',
                route: 'privacy',
            },
            {
                id: 9332,
                icon: HelpOutlineOutlinedIcon,
                label: 'Help Cenyer',
                route: 'help',
            },
            {
                id: 9333,
                icon: RemoveFromQueueOutlinedIcon,
                label: 'Display',
                route: 'display',
            },
            {
                id: 9334,
                icon: AccountCircleOutlinedIcon,
                label: 'Keyboard shortcuts',
                route: 'keyboard',
            },
        ]
    },
]