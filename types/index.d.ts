// @ts-ignore
import _Vue, { App } from 'vue';
import './vue';

export declare function install(Vue: typeof _Vue | App): void;
export declare class FlipClock extends _Vue {
  mode: string
  initValue: string
  flipperClass: string
  flipperContainerClass: string
}

declare const _default : {
  FlipClock: FlipClock;
  install: typeof install;
  version: string;
  vueFlipClock: FlipClock
};

export default _default;
