import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';


export default function DropDownMenuUser() {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setCookie('authorization', '');
    router.push('/login');
    handleClose();
  };

  const handleProfile = () => {
    router.push('/profile');
    handleClose();
  };
  return (
    <div className='h-[32px] w-[32px]'>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon="gg:profile" width={32} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}><Icon icon="iconamoon:profile-fill" width={16} /> Meu perfil</MenuItem>
        <MenuItem sx={{  color: 'red' } } onClick={handleLogout}><Icon icon="material-symbols:logout" width={16} /> Sair da conta</MenuItem>
      </Menu>
    </div>
  )
}
