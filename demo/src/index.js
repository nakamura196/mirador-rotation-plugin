import Mirador from 'mirador';
import { miradorRotationPlugin } from '../../src';

// Parse URL parameters
const params = new URLSearchParams(window.location.search);
const manifestParam = params.get('manifest');
const rotationParam = params.get('rotation');
const rotations = rotationParam ? rotationParam.split(';').map(Number) : [];
const showAttribution = params.get('attribution') === 'true';
const language = params.get('lang') || 'en';

// Create windows from manifest parameter or use default
const createWindows = () => {
  if (manifestParam) {
    const manifestUrls = manifestParam.split(';');
    return manifestUrls.map((url, index) => ({
      initialViewerConfig: {
        rotation: rotations[index] ?? rotations[0] ?? 0,
      },
      manifestId: url,
      rotationEnabled: true,
      rotationOpen: true,
      sideBarOpen: showAttribution,
      sideBarPanel: showAttribution ? 'attribution' : undefined,
    }));
  }

  // Default manifest
  const xywh = '9554.0,8213.0,1000,1000';
  const spl = xywh.split(',');
  const boxToZoom = {
    height: Number(spl[3]),
    width: Number(spl[2]),
    x: Number(spl[0]),
    y: Number(spl[1]),
  };
  const zoomCenter = {
    x: boxToZoom.x + boxToZoom.width / 2,
    y: boxToZoom.y + boxToZoom.height / 2,
  };

  return [{
    canvasId: 'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/187cc82d-11e6-9912-9dd4-b4cca9b10970/canvas/p2',
    initialViewerConfig: {
      rotation: rotations.length > 0 ? rotations[0] : 180,
      x: zoomCenter.x,
      y: zoomCenter.y,
      zoom: 1 / Math.max(boxToZoom.width, boxToZoom.height),
    },
    manifestId: 'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/187cc82d-11e6-9912-9dd4-b4cca9b10970/manifest',
    rotationEnabled: true,
    rotationOpen: true,
    sideBarOpen: showAttribution,
    sideBarPanel: showAttribution ? 'attribution' : undefined,
  }];
};

const config = {
  id: 'demo',
  language,
  theme: {
    palette: {
      primary: {
        main: '#1967d2',
      },
    },
  },
  windows: createWindows(),
};

Mirador.viewer(config, [
  ...miradorRotationPlugin,
]);
