import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TuneSharpIcon from '@mui/icons-material/TuneSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { styled, alpha } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useElementSize } from '@custom-react-hooks/use-element-size';
import mergeRefs from 'merge-refs';
import { MiradorMenuButton, useTranslation } from 'mirador';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Rotation from './Rotation';

const SizeContainer = styled('div')(() => ({
  position: 'static !important',
}));

/** Styles for withStyles HOC */
const Root = styled('div')(({ small, theme: { palette } }) => {
  const backgroundColor = palette.shades.main;
  const foregroundColor = palette.getContrastText(backgroundColor);
  const border = `1px solid ${alpha(foregroundColor, 0.2)}`;
  const borderImageRight = 'linear-gradient('
    + 'to bottom, '
    + `${alpha(foregroundColor, 0)} 20%, `
    + `${alpha(foregroundColor, 0.2)} 20% 80%, `
    + `${alpha(foregroundColor, 0)} 80% )`;
  const borderImageBottom = borderImageRight.replace('to bottom', 'to right');
  return {
    backgroundColor: alpha(backgroundColor, 0.8),
    borderBottom: small ? border : 'none',
    borderImageSource: small ? borderImageBottom : borderImageRight,
    borderRadius: 25,
    display: 'flex',
    flexDirection: small ? 'column' : 'row',
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 999,
  };
});

const ControlContainer = styled('div')(({ small }) => ({
  border: 0,
  borderImageSlice: 1,
  display: 'flex',
  flexDirection: small ? 'column' : 'row',
}));

const MiradorRotation = ({
  enabled = true,
  open = true,
  innerRef = null,
  updateViewport,
  updateWindow,
  viewer = {},
  viewConfig = {},
  windowId,
}) => {
  const [isSmallDisplay, setIsSmallDisplay] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const { t } = useTranslation();

  const {
    rotation = 0,
  } = viewConfig;

  const toggleState = () => {
    updateWindow(windowId, { rotationOpen: !open });
  };

  const handleChange = (param) => (value) => {
    updateViewport(windowId, { [param]: value });
  };

  const handleReset = () => {
    const viewConfigReset = {
      rotation: 0,
    };
    updateViewport(windowId, viewConfigReset);
  };

  const handleRotate90 = (direction) => {
    const newRotation = rotation + (direction * 90);
    updateViewport(windowId, { rotation: newRotation });
  };

  const [sizeRef, size] = useElementSize();

  useEffect(() => {
    setIsSmallDisplay(size.width && size.width < 480);
  }, [size.width]);

  if (!viewer || !enabled) return <SizeContainer ref={mergeRefs(innerRef, sizeRef)} />;

  const toggleButton = (
    <div style={{ border: 0, borderImageSlice: 1 }}>
      <MiradorMenuButton
        aria-expanded={open}
        aria-haspopup
        aria-label={t('collapse', { context: open ? 'open' : 'close' })}
        onClick={toggleState}
      >
        {open ? <CloseSharpIcon /> : <TuneSharpIcon />}
      </MiradorMenuButton>
    </div>
  );

  return (
    <SizeContainer ref={mergeRefs(innerRef, sizeRef)}>
      <Root className="MuiPaper-elevation4" small={isSmallDisplay}>
        {isSmallDisplay && toggleButton}
        {open && (
          <>
            <ControlContainer small={isSmallDisplay}>
              <MiradorMenuButton
                aria-label={t('rotateLeft')}
                onClick={() => handleRotate90(-1)}
              >
                <RotateLeftIcon />
              </MiradorMenuButton>
              <MiradorMenuButton
                aria-label={t('rotateRight')}
                onClick={() => handleRotate90(1)}
              >
                <RotateRightIcon />
              </MiradorMenuButton>
              <Rotation
                label={t('progress')}
                value={rotation}
                windowId={windowId}
                onChange={handleChange('rotation')}
                small={isSmallDisplay}
              />
              <MiradorMenuButton
                aria-label={t('revert')}
                onClick={handleReset}
              >
                <RestartAltIcon />
              </MiradorMenuButton>
              <MiradorMenuButton
                aria-label={t('help')}
                onClick={() => setHelpOpen(true)}
              >
                <HelpOutlineIcon />
              </MiradorMenuButton>
            </ControlContainer>
            <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
              <DialogTitle sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                {t('helpTitle')}
                <IconButton onClick={() => setHelpOpen(false)} size="small">
                  <CloseSharpIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell><RotateLeftIcon /></TableCell>
                      <TableCell>{t('helpRotateLeft')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><RotateRightIcon /></TableCell>
                      <TableCell>{t('helpRotateRight')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><LinearScaleIcon /></TableCell>
                      <TableCell>{t('helpSlider')}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><RestartAltIcon /></TableCell>
                      <TableCell>{t('helpReset')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </>
        )}
        {!isSmallDisplay && toggleButton}
      </Root>
    </SizeContainer>
  );
};

MiradorRotation.propTypes = {
  enabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
  open: PropTypes.bool,
  updateViewport: PropTypes.func.isRequired,
  updateWindow: PropTypes.func.isRequired,
  viewConfig: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  viewer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  windowId: PropTypes.string.isRequired,
};

export const TestableRotation = MiradorRotation;

export default MiradorRotation;
