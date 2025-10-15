import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard,
  Home,
  Info,
  Calculate,
  Palette,
  Login,
  PersonAdd,
  Settings,
} from '@mui/icons-material';
import { navigationItems, navigationConfig } from '../../config/navigation';

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  Dashboard: <Dashboard />,
  Home: <Home />,
  Info: <Info />,
  Calculate: <Calculate />,
  Palette: <Palette />,
  Login: <Login />,
  PersonAdd: <PersonAdd />,
  Settings: <Settings />,
};

interface NavigationProps {
  open?: boolean;
  onClose?: () => void;
}

export const Navigation = ({ open: controlledOpen, onClose }: NavigationProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const muiTheme = useMuiTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));

  const { navWidth, collapsedWidth } = navigationConfig;
  const navigationWidth = isCollapsed ? collapsedWidth : navWidth;

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const NavigationContent = (
    <Box
      sx={{
        width: navigationWidth,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        transition: 'width 0.25s ease-in-out',
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          minHeight: 64,
        }}
      >
        {!isCollapsed && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Your App
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={handleToggleCollapse} size="small">
            {isCollapsed ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, py: 1, overflow: 'auto' }}>
        {navigationItems.map((item) => {
          // Skip items with children (no submenu support in simple version)
          if (item.children) return null;
          
          const isActive = location.pathname === item.path;
          const icon = item.icon ? iconMap[item.icon] : null;

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              to={item.path || '#'}
              onClick={isMobile ? onClose : undefined}
              sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: 2.5,
                mx: 1,
                borderRadius: 1,
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  bgcolor: isActive ? 'primary.dark' : 'action.hover',
                },
              }}
            >
              {icon && (
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : 3,
                    justifyContent: 'center',
                    color: isActive ? 'primary.contrastText' : 'text.secondary',
                  }}
                >
                  {icon}
                </ListItemIcon>
              )}
              {!isCollapsed && (
                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  // Mobile Drawer
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={controlledOpen}
        onClose={onClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: navWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {NavigationContent}
      </Drawer>
    );
  }

  // Desktop Sidebar
  return NavigationContent;
};
