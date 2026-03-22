import { useState, useCallback } from 'react';
import { detectCrisisKeywords } from '../services/crisisDetector';

export function useCrisisDetection() {
  const [crisisDetected, setCrisisDetected] = useState(false);

  const scanText = useCallback((text: string) => {
    const detected = detectCrisisKeywords(text);
    setCrisisDetected(detected);
    return detected;
  }, []);

  const acknowledge = useCallback(() => {
    setCrisisDetected(false);
  }, []);

  return { crisisDetected, scanText, acknowledge };
}
