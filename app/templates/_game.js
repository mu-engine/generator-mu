import Mu from "mu-engine";
import <%= name.constant %>State from "./states/<%= name.kebab %>-state";

export default function <%= name.constant %>() {
  return [ Mu.Engine(), Mu.Stack().unshift(<%= name.constant %>State()) ];
};
