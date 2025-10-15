import { Box, Typography, Chip } from '@mui/material';
import { useAppSelector } from '../../store';

export const Header = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
      }}
    >
      <Typography variant="h6" component="h1">
        Dashboard
      </Typography>

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
    </Box>
  );
};
