import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Navigation } from './Navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export const MainLayout = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navigation Sidebar */}
      <Navigation open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Header with Mobile Menu Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileNavOpen(true)}
              sx={{ ml: 1 }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flex: 1 }}>
            <Header />
          </Box>
        </Box>

        {/* Page Content */}
        <Box component="main" sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};
