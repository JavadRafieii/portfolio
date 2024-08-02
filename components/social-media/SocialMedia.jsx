import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const socialMedia = [
    { id: 1, icon: <LinkedInIcon sx={{ fontSize: 20 }} />, link: "" },
    { id: 2, icon: <GitHubIcon sx={{ fontSize: 20 }} />, link: "" },
    { id: 3, icon: <EmailIcon sx={{ fontSize: 20 }} />, link: "" },
    { id: 4, icon: <CallIcon sx={{ fontSize: 20 }} />, link: "" },
];

function SocialMedia() {
    return (
        socialMedia.map(item => (
            <li>
                <a href={item.link} className="flex items-center justify-center w-[40px] h-[40px] border-primary-purple border-[1px] rounded-full text-primary-purple transition-[.5s] hover:bg-primary-purple hover:text-primary-light-gray">{item.icon}</a>
            </li>
        ))
    );
}

export default SocialMedia;