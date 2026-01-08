import {
  getContainerId,
  getWindowConfig,
  getViewer,
  updateViewport,
  updateWindow,
} from 'mirador';
import MiradorRotation from './plugins/MiradorRotation';
import MiradorRotationMenuItem from './plugins/MiradorRotationMenuItem';
import translations from './translations';

export const miradorRotationPlugin = [
  {
    component: MiradorRotation,
    config: {
      translations,
    },
    mapDispatchToProps: {
      updateViewport,
      updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      containerId: getContainerId(state),
      enabled: getWindowConfig(state, { windowId }).rotationEnabled || false,
      open: getWindowConfig(state, { windowId }).rotationOpen || false,
      viewConfig: getViewer(state, { windowId }) || {},
    }),
    mode: 'add',
    target: 'OpenSeadragonViewer',
  },
  {
    component: MiradorRotationMenuItem,
    mapDispatchToProps: {
      updateWindow,
    },
    mapStateToProps: (state, { windowId }) => ({
      enabled: getWindowConfig(state, { windowId }).rotationEnabled || false,
    }),
    mode: 'add',
    target: 'WindowTopBarPluginMenu',
  },
];
