import { NavLink } from 'react-router-dom';

import styles from 'src/styles/HeaderMenu.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'; import PersonIcon from '@mui/icons-material/Person';
import { SidebarElement } from './SidebarElement';

export const HeaderMenu = () => {
  return (
    <div>
      <nav className={styles.HeaderMenu}>
        <div className={styles.HeaderMenu__list}>

          <SidebarElement Icon={HomeIcon} text='home' />
          <SidebarElement Icon={TagIcon} text='Explore' path='explore' />
          <SidebarElement Icon={NotificationsNoneIcon} text='Notifications' path='notifications' />
          <SidebarElement Icon={MailOutlineIcon} text='Explore' path='Messages' />
          <SidebarElement Icon={BookmarkBorderOutlinedIcon} text='Bookmarks' path='bookmarks' />
          <SidebarElement Icon={TwitterIcon} text='Twitter Blue' path='twitter_blue' />
          <SidebarElement Icon={VerifiedOutlinedIcon} text='Verified Organiza...' path='verified-orgs' />
          {/* здесь нужно будет добавить в адрес ссылки логин юзера вместо profile  */}
          <SidebarElement Icon={PersonIcon} text='Profile' path='profile' />

        </div>
      </nav>

      <button>Tweet</button>

      <footer>
        <button>
          <div>
            <img src='#' alt='user_foto' />
          </div>
          <div>
            <div>Name</div>
            <div>UserName</div>
          </div>
        </button>
      </footer>
    </div>

  );
};
