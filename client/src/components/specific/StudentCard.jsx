import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StudentCard = ({ student }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{student.name}</Typography>
        <Typography variant="body2">Email: {student.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
