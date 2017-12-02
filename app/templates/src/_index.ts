import {
  StackEntity,
  RenderMediatorSystem,
  IntervalSystem,
  InputSystem,
} from "mu-engine";

import assets from "mu-assets-loader!../assets.config.json";

document.addEventListener("DOMContentLoaded", () => {
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
