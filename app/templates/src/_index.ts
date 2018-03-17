import {
  Assets,
  StackEntity,
  RenderMediatorSystem,
  IntervalSystem,
  InputSystem,
} from "mu-engine";

import assetsConfig from "mu-assets-loader!../assets.config.json";

document.addEventListener("DOMContentLoaded", () => {
  const assets = new Assets({
    preload: true,
    assets: assetsConfig,
  });
  const canvas = document.getElementById("stage");

  if (canvas != null) {
    const stack = new StackEntity();

    InputSystem(stack, { canvas: canvas });
    IntervalSystem(stack, { fps: 60 });
    RenderMediatorSystem(stack, {
      canvas: canvas as HTMLCanvasElement,
      assets: assets,
      width: 800,
      height: 600,
    });
  }
});
