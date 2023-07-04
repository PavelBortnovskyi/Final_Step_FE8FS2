import HomeIcon from '@mui/icons-material/Home';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'; 
import PersonIcon from '@mui/icons-material/Person';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import StormIcon from '@mui/icons-material/Storm';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import VerifiedIcon from '@mui/icons-material/Verified';

export const mainSidebarElementsMobile = [
    {
        id: 0,
        icon: HomeIcon,
        label: 'Home',
        route: '/',
    },
    {
        id: 1,
        icon: SearchOutlinedIcon,
        label: 'Search',
        route: 'search-user',
    },
    {
        id: 2,
        icon: NotificationsNoneIcon,
        label: 'Notifications',
        route: 'notifications',
        newNotificationBadge: true,
    },
    {
        id: 3,
        icon: MailOutlineIcon,
        label: 'Messages',
        route: 'messages',
        newMessageNotification: true,
    },
    
]

export const SidebarMobileElements = [
    {
        id: 0,
        icon: Person2OutlinedIcon,
        iconActive: PersonIcon,
        label: 'Profile',
        route: 'profile',
    },
    {
        id: 1,
        icon: TwitterIcon,
        iconActive: StormIcon,
        label: 'Twitter Blue',
        route: 'twitter_blue',
    },
    {
        id: 2,
        icon: ListAltOutlinedIcon,
        iconActive: BallotRoundedIcon,
        label: 'Lists',
        route: 'lists',
    },
    {
        id: 3,
        icon: BookmarkBorderOutlinedIcon,
        iconActive: BookmarkRoundedIcon,
        label: 'Bookmarks',
        route: 'bookmarks',
    },
    {
        id: 4,
        icon: VerifiedOutlinedIcon,
        iconActive: VerifiedIcon,
        label: 'Verified Organiza...',
        route: 'verified-orgs',
    },
]





