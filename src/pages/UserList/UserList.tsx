import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  updateUser,
  selectUsers,
} from '../../features/users/usersSlice';
import {
  Container,
  Button,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserTable from '../../components/UserTable/UserTable';
import UserDialog from '../../components/UserDialog/UserDialog';
import { useFetchRandomUser } from '../../hooks/useFetchRandomUser';
import { User } from '../../types/User';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers) as User[];

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');

  const { fetchRandomUser, loading } = useFetchRandomUser();

  useEffect(() => {
    if (users.length === 0) {
      for (let i = 0; i < 3; i++) {
        fetchRandomUser();
      }
    }
  }, [dispatch, users.length, fetchRandomUser]);

  const handleAddUser = () => {
    fetchRandomUser();
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditedAddress(user.address);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAddress(event.target.value);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      dispatch(
        updateUser({
          id: selectedUser.id,
          updates: { address: editedAddress },
        })
      );
    }
    handleDialogClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ maxWidth: '1200px !important' }}>
        <h1>User List</h1>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{ mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Add User'}
        </Button>

        <UserTable users={users} onDelete={handleDeleteUser} onRowClick={handleRowClick} />

        <UserDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          selectedUser={selectedUser}
          editedAddress={editedAddress}
          onAddressChange={handleAddressChange}
          onSave={handleSaveUser}
        />
      </Container>
    </ThemeProvider>
  );
};

export default UserList;
