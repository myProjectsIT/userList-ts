import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { User } from '../../types/User';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
  editedAddress: string;
  onAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onClose,
  selectedUser,
  editedAddress,
  onAddressChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {selectedUser && (
          <>
            <TextField
              disabled
              label="Username"
              value={selectedUser.username}
              fullWidth
              margin="dense"
              variant="filled"
            />
            <TextField
              disabled
              label="Sex"
              value={selectedUser.sex}
              fullWidth
              margin="dense"
              variant="filled"
            />
            <TextField
              label="Address"
              value={editedAddress}
              onChange={onAddressChange}
              fullWidth
              margin="dense"
            />
            <TextField
              disabled
              label="Name"
              value={selectedUser.name}
              fullWidth
              margin="dense"
              variant="filled"
            />
            <TextField
              disabled
              label="Email"
              value={selectedUser.email}
              fullWidth
              margin="dense"
              variant="filled"
            />
            <TextField
              disabled
              label="Birthday"
              value={selectedUser.birthday}
              fullWidth
              margin="dense"
              variant="filled"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
