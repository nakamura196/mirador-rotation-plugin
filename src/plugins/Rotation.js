import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from 'mirador';
import Slider from '@mui/material/Slider';
import { styled, alpha } from '@mui/material/styles';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

const SliderContainer = styled('div')(({ small, theme: { palette } }) => ({
  backgroundColor: alpha(palette.shades.main, 0.8),
  borderRadius: 25,
  height: 150,
  marginLeft: 2,
  marginTop: 2,
  padding: [[2, 7, 2, 7]],
  position: 'absolute',
  ...(small && {
    height: 'auto',
    marginBottom: 2,
    marginTop: 48,
    padding: [[4, 2, 4, 2]],
    right: 0,
    top: 'auto',
    width: 150,
  }),
  top: 48,
  zIndex: 100,
}));

const RotationToggleButton = styled(MiradorMenuButton)(({
  theme: { palette },
  ownerState: { open },
}) => ({
  ...(open && {
    backgroundColor: `${alpha(palette.getContrastText(palette.shades.main), 0.1)} !important`,
  }),
}));

const Rotation = ({
  label, value, windowId, small = false, onChange,
}) => {
  const max = 180;
  const min = -180;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };

  const id = `${windowId}`;

  return (
    <div style={{ display: 'inline-block' }}>
      <RotationToggleButton
        id={`${id}-label`}
        aria-label={label}
        onClick={handleClick}
        aria-expanded={open}
        aria-controls={id}
        ownerState={{ open }}
      >
        <LinearScaleIcon />
      </RotationToggleButton>

      {open && (
        <SliderContainer
          id={id}
          aria-labelledby={`${id}-label`}
          className="MuiPaper-elevation4"
          small={small}
        >
          <Slider
            orientation={small ? 'horizontal' : 'vertical'}
            min={min}
            max={max}
            value={value}
            valueLabelDisplay="on"
            onChange={(e, val) => onChange(val)}
          />
        </SliderContainer>
      )}
    </div>
  );
};

Rotation.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  small: PropTypes.bool,
  value: PropTypes.number.isRequired,
  windowId: PropTypes.string.isRequired,
};

export default Rotation;
