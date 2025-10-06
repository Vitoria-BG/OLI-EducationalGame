// modules/vision-camera-colordetector/src/index.tsx
import type { Frame } from 'react-native-vision-camera';

// Define the expected return type for better TypeScript support
export interface ColorData {
  r: number;
  g: number;
  b: number;
  hex: string;
}

/**
 * Detects the color from the center of a camera frame.
 */
export function detectColor(frame: Frame): ColorData {
  'worklet';
  // @ts-expect-error: __detectColor is a native function injected by VisionCamera
  return __detectColor(frame);
}