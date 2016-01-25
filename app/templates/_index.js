import Immutable from "immutable";
import Mu from "mu-engine";
import <%= name.constant %> from "./<%= name.kebab %>";

Mu.Ready().then(() => {
  let canvas = document.getElementById("mu-canvas");

  Mu.Canvas(canvas, Mu.Canvas.Settings());
  Mu.Input(canvas);

  Mu.Interval(<%= name.constant %>(), 30, Mu.runState);
});
