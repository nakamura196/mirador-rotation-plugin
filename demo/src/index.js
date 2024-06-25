import Mirador from 'mirador/dist/es/src/index';
import { miradorRotationZoomPlugin } from '../../src';

const config = {
  id: 'demo',
  windows: [
    {
      rotationEnabled: true,
      manifestId: 'https://iiif.harvardartmuseums.org/manifests/object/299843',

    }, {
      rotationEnabled: false,
      manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
    },],
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
};

Mirador.viewer(config, [
  ...miradorRotationZoomPlugin,
]);
