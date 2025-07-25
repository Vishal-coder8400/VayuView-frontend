import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Chip, Avatar, Autocomplete } from '@mui/material';

const ShareModal = ({ open, onClose, file, users, sharedWith, setSharedWith }) => {
  // List of users in the company
  const [selectedUsers, setSelectedUsers] = useState([]);
  // Handles adding/removing users to/from the shared list
  const handleShare = () => {
    setSharedWith([...sharedWith, ...selectedUsers]);
    setSelectedUsers([]);
  };

  const handleRemoveUser = (user) => {
    setSharedWith(sharedWith.filter((u) => u._id !== user._id));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Share "{file.name}"</DialogTitle>
      <DialogContent>
         <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.name}
          value={selectedUsers}
          onChange={(event, newValue) => setSelectedUsers(newValue)}
          renderInput={(params) => <TextField {...params} label="Share with" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option._id}
                avatar={<Avatar>{option.name[0]}</Avatar>}
                label={option.name}
                {...getTagProps({ index })}
              />
            ))
          }
        />

        <div style={{ marginTop: 16 }}>
          <h4>Shared With:</h4>
          {sharedWith.map((user) => (
            <Chip
              key={user._id}
              avatar={<Avatar>{user.name[0]}</Avatar>}
              label={user.name}
              onDelete={() => handleRemoveUser(user)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleShare} color="primary" variant="contained">
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
