import React from 'react';
import Button from '@material-ui/core';

import classes from './Button.css';

const MyButton = ({ label }) => <Button ClassName={classes.button}>{label}</Button>;

export default MyButton;
