import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';

function UserForm({ user, isEditing, onChange, onSubmit }) {
  const renderAdditionalFields = () => {
    switch (user.role) {
      case 'Teacher':
        return (
          <TextField
            label="Subject"
            variant="outlined"
            value={user.subject || ''}
            onChange={(e) => onChange('subject', e.target.value)}
            fullWidth
          />
        );
      case 'Student':
        return (
          <TextField
            label="Class ID"
            variant="outlined"
            value={user.class_id || ''}
            onChange={(e) => onChange('class_id', e.target.value)}
            fullWidth
          />
        );
      case 'Parent':
        return (
          <TextField
            label="Child's ID"
            variant="outlined"
            value={user.child_id || ''}
            onChange={(e) => onChange('child_id', e.target.value)}
            fullWidth
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        boxShadow: 3,
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        value={user.name}
        onChange={(e) => onChange('name', e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={user.email}
        onChange={(e) => onChange('email', e.target.value)}
        fullWidth
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          value={user.role || ''}
          onChange={(e) => onChange('role', e.target.value)}
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Parent">Parent</MenuItem>
        </Select>
      </FormControl>
      {renderAdditionalFields()}
      {!isEditing && (
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={user.password}
          onChange={(e) => onChange('password', e.target.value)}
          fullWidth
        />
      )}
      <Button variant="contained" color="primary" onClick={onSubmit}>
        {isEditing ? 'Update' : 'Create'}
      </Button>
    </Box>
  );
}

export default UserForm;
