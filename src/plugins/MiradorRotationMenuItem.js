import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import { useTranslation } from 'mirador';

const MiradorRotationMenuItem = ({
  enabled = true,
  handleClose,
  updateWindow,
  windowId,
}) => {
  const { t } = useTranslation();

  const handleClickOpen = () => {
    handleClose();
    updateWindow(windowId, { rotationEnabled: !enabled });
  };

  return (
    <MenuItem onClick={handleClickOpen}>
      <ListItemIcon>
        <TuneSharpIcon />
      </ListItemIcon>
      <ListItemText>
        { enabled ? t('hide') : t('show') }
      </ListItemText>
    </MenuItem>
  );
};

MiradorRotationMenuItem.propTypes = {
  enabled: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default MiradorRotationMenuItem;
