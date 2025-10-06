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
 * This function should be called from within a frame processor.
 * 
 * @param frame The camera frame to analyze
 * @returns Color data with RGB values and hex string
 * 
 * @example
 * const frameProcessor = useFrameProcessor((frame) => {
 *   'worklet';
 *   const color = detectColor(frame);
 *   console.log(color.hex);
 * }, []);
 */
export const detectColor = (frame: Frame): ColorData => {
  'worklet';
  
  // The plugin is registered as "detectColor" in the native code
  // Vision Camera exposes it directly as detectColor in the worklet context
  return (global as any).detectColor(frame);
};
