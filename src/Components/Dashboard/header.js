import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, ButtonGroup, Box } from '@mui/material';

const Header = () => {
  const [selectedFilter, setSelectedFilter] = useState('Last Week');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Handle filter change logic here
  };

  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent', borderRadius: '8px', boxShadow: 'none', padding: '8px' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: 'black' }}>
          Overview
        </Typography>
        <Box>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button 
              style={{ backgroundColor: selectedFilter === 'Last Week' ? '#1976d2' : 'white', color: selectedFilter === 'Last Week' ? 'white' : 'black' }}
              onClick={() => handleFilterChange('Last Week')}
            >
              Last Week
            </Button>
            <Button 
              style={{ backgroundColor: selectedFilter === 'Last Month' ? '#1976d2' : 'white', color: selectedFilter === 'Last Month' ? 'white' : 'black' }}
              onClick={() => handleFilterChange('Last Month')}
            >
              Last Month
            </Button>
            <Button 
              style={{ backgroundColor: selectedFilter === 'Last Year' ? '#1976d2' : 'white', color: selectedFilter === 'Last Year' ? 'white' : 'black' }}
              onClick={() => handleFilterChange('Last Year')}
            >
              Last Year
            </Button>
          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
