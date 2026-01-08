# mirador-rotation

![Node.js CI](https://github.com/nakamura196/mirador-rotation-plugin/actions/workflows/node.js.yml/badge.svg)

`mirador-rotation` is a [Mirador 4](https://github.com/projectmirador/mirador) plugin that enables the rotation of images at any angle.

<img src="assets/demo.gif" width="100%" title="Mirador rotation example">

## 🌐 Website

[Visit the demo page](https://nakamura196.github.io/mirador-rotation-plugin/) to try it out.

## 📖 Configuration

Several configuration options are available on windows that use mirador-rotation.

| Configuration     | type    | default | description                   |
| ----------------- | ------- | ------- | ----------------------------- |
| `rotationEnabled` | boolean | false   | Enable the plugin to be shown |
| `rotationOpen`    | boolean | false   | Open the rotation controls by default |

Example configuration:

```javascript
const config = {
  id: "demo",
  windows: [
    {
      rotationEnabled: true,
      rotationOpen: true,
      initialViewerConfig: {
        rotation: 90,
      },
      manifestId: "https://dl.ndl.go.jp/api/iiif/1286201/manifest.json",
    },
  ],
};
```

## 🎮 Features

The plugin provides the following rotation controls:

| Control | Description |
| ------- | ----------- |
| Rotate Left (90°) | Rotate the image 90 degrees counter-clockwise |
| Rotate Right (90°) | Rotate the image 90 degrees clockwise |
| Fine-tuning Slider | Adjust rotation angle in 1-degree increments (-180° to 180°) |
| Reset | Reset rotation to 0 degrees |
| Help | Show a dialog explaining how to use the controls |

## 🔗 Demo URL Parameters

The demo page supports the following URL parameters:

| Parameter  | Description | Example |
| ---------- | ----------- | ------- |
| `manifest` | IIIF manifest URL(s), separated by `;` for multiple | `?manifest=https://example.com/manifest.json` |
| `rotation` | Initial rotation angle(s) in degrees, separated by `;` for multiple | `?rotation=90` |

### Examples

Single manifest with rotation:
```
?manifest=https://example.com/manifest.json&rotation=180
```

Multiple manifests with the same rotation:
```
?manifest=https://example.com/m1.json;https://example.com/m2.json&rotation=90
```

Multiple manifests with different rotations:
```
?manifest=https://example.com/m1.json;https://example.com/m2.json&rotation=90;180
```

## 📖 Installing `mirador-rotation`

`mirador-rotation` requires an instance of Mirador 4. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [live demo's index.js](https://github.com/nakamura196/mirador-rotation-plugin/blob/main/demo/src/index.js) for an example of importing the `mirador-rotation` plugin and configuring the adapter.

## 📣 Contribute

Mirador's development, design, and maintenance is driven by community needs and ongoing feedback and discussion. Join us at our regularly scheduled community calls, on [IIIF slack #mirador](http://bit.ly/iiif-slack), or the [mirador-tech](https://groups.google.com/forum/#!forum/mirador-tech) and [iiif-discuss](https://groups.google.com/forum/#!forum/iiif-discuss) mailing lists. To suggest features, report bugs, and clarify usage, please submit a GitHub issue.

## 🏅 Sponsors

[Become a sponsor](https://opencollective.com/mirador-rotation-plugin#sponsor)
