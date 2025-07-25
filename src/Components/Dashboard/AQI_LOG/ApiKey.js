import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff, FileCopy, Api } from '@mui/icons-material';

const ApiKeyDisplay = ({ apiKey }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Hide success message after 2 seconds
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        type={isVisible ? 'text' : 'password'}
        value={apiKey}
        fullWidth

        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove border here as well
              },
            },
          }}
        InputProps={{
          readOnly: true,
          sx: { border: 'none' },
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={isVisible ? 'Hide API Key' : 'Show API Key'}>
                <IconButton onClick={toggleVisibility}>
                  {isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy API Key">
                <IconButton onClick={copyToClipboard}>
                  <FileCopy />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
      {copySuccess && (
        <div style={{ marginLeft: '10px', color: 'green' }}>
          Copied!
        </div>
      )}
    </div>
  );
};

export default ApiKeyDisplay;