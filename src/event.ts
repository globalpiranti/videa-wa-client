import EventEmitter from "events";
import WaEvent from "./types/WaEvent";

const createEventEmitter = <T extends keyof WaEvent>() => {
  const emitter = new EventEmitter();

  return {
    on(event: T, listener: WaEvent[T]) {
      emitter.on(event as string, listener);
      return () => emitter.off(event as string, listener);
    },
    emit(event: T, ...args: Parameters<WaEvent[T]>) {
      emitter.emit(event as string, ...args);
    },
  };
};

export default createEventEmitter();
