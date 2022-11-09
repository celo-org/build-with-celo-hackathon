import { useEffect, useLayoutEffect } from 'react';
/**
 * A hook for scheduling a layout effect with a fallback to a regular effect for non-browser environments (ssr)
 */

export var useIsomorphicLayoutEffect = typeof document !== 'undefined' ? useLayoutEffect : useEffect;