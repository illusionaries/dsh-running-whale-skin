# dsh-running-whale-skin

浅色模式下，把对话底部运行状态（“深度求索中，用时 …”）旁边的小鲸鱼动画换成自定义动图；
深色模式保持官方默认小鲸鱼。

![浅色模式运行状态动画预览](https://raw.githubusercontent.com/illusionaries/dsh-running-whale-skin/main/assets/preview.gif)

> 预览：浅色模式下“深度求索中，用时 …”左侧的动画（实际显示尺寸约 14×14 px）。

## 做了什么

- 只注入一段样式表（Client half），不改官方包、不需要重启。
- 选择器：`body:not([data-ds-dark-theme]) [data-chat-running] span[class*="runningWhaleAnimated"]`
  - `body:not([data-ds-dark-theme])` = 仅浅色主题；
  - `[data-chat-running]` = 整行运行状态；
  - `[class*="runningWhaleAnimated"]` = 官方那段“APNG 当 mask”的动画层（类名带构建 hash，所以用子串匹配）。
- 覆盖掉官方 `mask` 后，直接把 `assets/whale-64.gif`（已内联为 data URL）作为 `background-image` 显示。

## 边界

- 深色模式、无障碍减弱动效（`prefers-reduced-motion: reduce`）、强制颜色模式下都不改动：
  减弱动效时官方显示静态小鲸鱼 SVG，这是有意的。
- 文案“深度求索中，用时 …”没有改动。

## 安装

从 npm 安装（推荐）：

```sh
dsh plugin --profile desktop add dsh-running-whale-skin
```

用 Web 版 profile 的话把 `--profile desktop` 换成 `--profile web`。装完刷新页面即可生效，
不需要重启 Harness。

从本地目录安装（开发、改图调试时用）：

```sh
dsh plugin --profile desktop add link:/path/to/dsh-running-whale-skin
```

也可以在 Harness 的插件管理（Settings → Plugins）里选择本地目录安装。

## 维护

素材 `d390aebd17906b20ab95aaa5c08e4329.gif` → 裁到内容外接框 → 64×64 / 36 帧 / 20ms 的 GIF（`assets/whale-64.gif`）。
改图后运行下面任一命令重新生成内联了图片的 `client.js`：

```sh
npm run build          # 或 node tools/build-client.mjs
```

`npm publish` 前会自动跑一次同样的构建（`prepublishOnly`），保证发布产物和素材一致。

## License

MIT，见 [LICENSE](./LICENSE)。动画素材来源与处理过程见 [PROVENANCE.md](./PROVENANCE.md)。
