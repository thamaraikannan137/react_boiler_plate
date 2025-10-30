import React from 'react';
import { 
  Box, 
  Toolbar, 
  Typography, 
  Chip, 
  IconButton, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../store';

interface HeaderProps {
  onDrawerToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isMobile && onDrawerToggle && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open navigation"
            onClick={onDrawerToggle}
            sx={{
              mr: 1
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h1" noWrap>
          Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {isAuthenticated ? (
          <Chip
            label={`Welcome, ${user?.name || 'User'}`}
            color="primary"
            variant="outlined"
          />
        ) : (
          <Chip label="Not Authenticated" variant="outlined" />
        )}
      </Box>
    </Toolbar>
  );
};
