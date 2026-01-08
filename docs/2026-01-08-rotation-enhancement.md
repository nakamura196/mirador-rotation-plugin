# mirador-rotation-plugin 機能拡張

## 概要

mirador-rotation-pluginに以下の機能を追加しました：

1. 90度単位の回転ボタン
2. URLパラメータによるマニフェスト・回転角度の指定
3. UIの改善（リセットボタンのアイコン変更）
4. ヘルプ機能（使い方を説明するダイアログ）

## 新機能の詳細

### 1. 90度単位の回転ボタン

従来は1度単位のスライダーのみでしたが、90度単位で素早く回転できるボタンを追加しました。

#### 実装内容

`src/plugins/MiradorRotation.js` に以下の変更を加えました：

```javascript
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

// 90度回転のハンドラー
const handleRotate90 = (direction) => {
  const newRotation = rotation + (direction * 90);
  updateViewport(windowId, { rotation: newRotation });
};
```

UIには2つのボタンを追加：
- **左回転ボタン**: 反時計回りに90度回転
- **右回転ボタン**: 時計回りに90度回転

#### 翻訳対応

`src/translations.js` に英語・日本語の翻訳を追加：

```javascript
{
  en: {
    rotateLeft: 'Rotate 90° left',
    rotateRight: 'Rotate 90° right',
  },
  ja: {
    rotateLeft: '左に90度回転',
    rotateRight: '右に90度回転',
  },
}
```

### 2. URLパラメータ対応

デモページでURLパラメータからマニフェストと回転角度を指定できるようになりました。

#### 対応パラメータ

| パラメータ | 説明 | 区切り文字 |
| --------- | ---- | --------- |
| `manifest` | IIIFマニフェストURL | `;`（セミコロン） |
| `rotation` | 初期回転角度（度） | `;`（セミコロン） |

#### 使用例

```
# 単一マニフェスト
?manifest=https://example.com/manifest.json&rotation=180

# 複数マニフェスト（同じ回転角度）
?manifest=url1;url2&rotation=90

# 複数マニフェスト（異なる回転角度）
?manifest=url1;url2&rotation=90;180
```

#### 実装内容

`demo/src/index.js` の主な変更：

```javascript
const params = new URLSearchParams(window.location.search);
const manifestParam = params.get('manifest');
const rotationParam = params.get('rotation');
const rotations = rotationParam ? rotationParam.split(';').map(Number) : [];

const createWindows = () => {
  if (manifestParam) {
    const manifestUrls = manifestParam.split(';');
    return manifestUrls.map((url, index) => ({
      manifestId: url,
      rotationEnabled: true,
      rotationOpen: true,
      initialViewerConfig: {
        // 対応するインデックスの回転角度、なければ最初の値、それもなければ0
        rotation: rotations[index] ?? rotations[0] ?? 0,
      },
    }));
  }
  // デフォルトの処理...
};
```

### 3. リセットボタンのアイコン変更

回転ボタンとの区別をつけるため、リセットボタンのアイコンを変更しました。

| 変更前 | 変更後 |
| ------ | ------ |
| `ReplaySharpIcon` | `RestartAltIcon` |

`ReplaySharpIcon`は回転を連想させるデザインだったため、より「リセット」を明確に示す`RestartAltIcon`に変更しました。

### 4. ヘルプ機能

プラグイン内に「?」ボタンを追加し、クリックすると使い方を説明するダイアログが表示されます。

#### 実装内容

MUIのDialogコンポーネントを使用して、各コントロールの説明を表形式で表示します。

```javascript
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

// ヘルプダイアログの状態管理
const [helpOpen, setHelpOpen] = useState(false);

// ヘルプボタン
<MiradorMenuButton
  aria-label={t('help')}
  onClick={() => setHelpOpen(true)}
>
  <HelpOutlineIcon />
</MiradorMenuButton>
```

#### ダイアログの内容

| アイコン | 説明 |
| ------- | ---- |
| RotateLeftIcon | 反時計回りに90度回転 |
| RotateRightIcon | 時計回りに90度回転 |
| LinearScaleIcon | 回転角度を微調整（-180°〜180°） |
| RestartAltIcon | 回転を0°にリセット |

#### 翻訳対応

```javascript
{
  en: {
    help: 'Help',
    helpTitle: 'Rotation Controls',
    helpRotateLeft: 'Rotate 90° counter-clockwise',
    helpRotateRight: 'Rotate 90° clockwise',
    helpSlider: 'Fine-tune rotation angle (-180° to 180°)',
    helpReset: 'Reset rotation to 0°',
  },
  ja: {
    help: 'ヘルプ',
    helpTitle: '回転コントロール',
    helpRotateLeft: '反時計回りに90度回転',
    helpRotateRight: '時計回りに90度回転',
    helpSlider: '回転角度を微調整（-180°〜180°）',
    helpReset: '回転を0°にリセット',
  },
}
```

## コントロール一覧

現在のプラグインは以下のコントロールを提供します：

| コントロール | アイコン | 機能 |
| ----------- | ------- | ---- |
| 左に90度回転 | `RotateLeftIcon` | 反時計回りに90度回転 |
| 右に90度回転 | `RotateRightIcon` | 時計回りに90度回転 |
| 角度スライダー | `LinearScaleIcon` | -180度〜180度の範囲で1度単位の調整 |
| リセット | `RestartAltIcon` | 回転を0度に戻す |
| ヘルプ | `HelpOutlineIcon` | 使い方ダイアログを表示 |

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
| --------- | -- | --------- | ---- |
| `rotationEnabled` | boolean | false | プラグインの表示を有効化 |
| `rotationOpen` | boolean | false | 回転コントロールをデフォルトで開く |
| `initialViewerConfig.rotation` | number | 0 | 初期回転角度 |

## まとめ

今回の機能拡張により、mirador-rotation-pluginの使い勝手が向上しました：

- **90度回転ボタン**: 書籍や文書の向きを素早く修正可能に
- **URLパラメータ**: 外部からの呼び出しや共有が容易に
- **UIの改善**: 直感的に操作しやすいアイコンに変更
- **ヘルプ機能**: 初めてのユーザーでも使い方がすぐに分かる

これらの機能により、IIIF画像の回転操作がより効率的に行えるようになりました。
