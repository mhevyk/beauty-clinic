import { useCallback } from "react";

import EventEmitter from "eventemitter3";

import { CUSTOM_EVENTS } from "@/constants/index";

// TODO: Remove eslint ignore
// eslint-disable-next-line
type Listener = (...args: any[]) => void;
type CustomEvent = keyof typeof CUSTOM_EVENTS;

// TODO: improve type safety
const emitter = new EventEmitter();

export default function useEventEmitter() {
  // TODO: Remove eslint ignore
  // eslint-disable-next-line
  const emit = useCallback((eventName: CustomEvent, ...args: any[]) => {
    emitter.emit(eventName, ...args);
  }, []);

  const subscribe = useCallback(
    (eventName: CustomEvent, listener: Listener) => {
      emitter.on(eventName, listener);
    },
    []
  );

  const unsubscribe = useCallback((eventName: CustomEvent) => {
    emitter.off(eventName);
  }, []);

  return { emit, subscribe, unsubscribe };
}
