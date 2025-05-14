import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { User } from '../../types/User';

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
  onRowClick: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onRowClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => onRowClick(user)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
            >
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(user.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
