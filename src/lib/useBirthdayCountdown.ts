"use client";

import { useSyncExternalStore } from "react";
import {
  getBirthdayCountdown,
  type BirthdayCountdownState,
} from "./birthday";

let currentSnapshot: BirthdayCountdownState | null = null;
const listeners = new Set<() => void>();
let intervalId: ReturnType<typeof setInterval> | null = null;

function notify() {
  currentSnapshot = getBirthdayCountdown(new Date());
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window !== "undefined" && intervalId === null) {
    intervalId = setInterval(notify, 1000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function getSnapshot(): BirthdayCountdownState | null {
  if (typeof window === "undefined") return null;
  if (currentSnapshot === null) {
    currentSnapshot = getBirthdayCountdown(new Date());
  }
  return currentSnapshot;
}

function getServerSnapshot(): BirthdayCountdownState | null {
  return null;
}

/**
 * Hydration-safe shared hook that ticks once per second across all subscribers.
 */
export function useBirthdayCountdown(): BirthdayCountdownState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
