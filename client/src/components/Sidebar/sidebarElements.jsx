import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'; 
import PersonIcon from '@mui/icons-material/Person';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NumbersRoundedIcon from '@mui/icons-material/NumbersRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StormIcon from '@mui/icons-material/Storm';
// import VerifiedIcon from '@mui/icons-material/Verified';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';


export const mainSidebarElements = [
    {
        id: 0,
        icon: HomeOutlinedIcon,
        iconActive: HomeIcon,
        label: 'Home',
        route: '/',
    },
    {
        id: 1,
        icon: TagIcon,
        iconActive: NumbersRoundedIcon,
        label: 'Explore',
        route: 'explore',
    },
    {
        id: 2,
        icon: NotificationsNoneIcon,
        iconActive: NotificationsRoundedIcon,
        label: 'Notifications',
        route: 'notifications',
    },
    {
        id: 3,
        icon: MailOutlineIcon,
        iconActive: EmailRoundedIcon,
        label: 'Messages',
        route: 'messages',
    },
    {
        id: 35,
        icon: ListAltOutlinedIcon,
        iconActive: BallotRoundedIcon,
        label: 'Lists',
        route: 'lists',
    },
    {
        id: 4,
        icon: BookmarkBorderOutlinedIcon,
        iconActive: BookmarkRoundedIcon,
        label: 'Bookmarks',
        route: 'bookmarks',
    },
    {
        id: 5,
        icon: TwitterIcon,
        iconActive: StormIcon,
        label: 'Twitter Blue',
        route: 'twitter_blue',
    },
    // {
    //     id: 6,
    //     icon: VerifiedOutlinedIcon,
    //     iconActive: VerifiedIcon,
    //     label: 'Verified Organiza...',
    //     route: 'verified-orgs',
    // },
    {
        id: 7,
        icon: Person2OutlinedIcon,
        iconActive: PersonIcon,
        label: 'Profile',
        route: 'profile',
    },
    {
        id: 8,
        icon: BookmarkBorderOutlinedIcon,
        iconActive: SettingsOutlinedIcon,
        label: 'Settings',
        route: 'settings',
    },
    
]





