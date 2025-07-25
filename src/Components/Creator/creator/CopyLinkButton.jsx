import React from 'react';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyLinkButton = ({to}) => {
  const linkToCopy = window.location.href + to;

  const handleCopy = () => {
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert('Link copied to clipboard, You can publish through this link!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <Button 
      variant="contained" 
      color="primary" 
      // startIcon={<ContentCopyIcon />} 
      onClick={handleCopy}
      sx={{ borderRadius: '50px', boxShadow: 'none', width: '110px' }}
    >
      PUBLISH
    </Button>
  );
};

export default CopyLinkButton;
