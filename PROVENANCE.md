# Provenance

## Animation asset

- Source file: `d390aebd17906b20ab95aaa5c08e4329.gif` — 360×360, GIF 89a, 36 frames, 20 ms per frame
  (720 ms loop), supplied by the package author for this plugin.
- Processing: union bounding box of the non-white pixels across all frames (plus 6% padding) →
  resized to 64×64 → shared-palette quantization (64 colors) → `assets/whale-64.gif`
  (36 frames, 20 ms per frame).
- The Client bundle embeds `assets/whale-64.gif` as a base64 `data:` URL, so the installed
  plugin fetches no external image asset.
- Redistribution: the package author confirms the right to use this artwork in the published
  package. If you redistribute the package further, verify the artwork rights yourself.

## Code

The stylesheet and plugin scaffolding are original work by the package author, released under
the MIT license in `LICENSE`.
