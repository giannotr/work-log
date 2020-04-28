import { useState, useCallback, useEffect } from 'react';

export default function() {
	const isClient = typeof window === 'object';
	
	const getSize = useCallback(
		() => {
			return {
				width: isClient ? window.innerWidth : undefined,
				height: isClient ? window.innerHeight : undefined
			};
		},
		[isClient],
	);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    const handleResize = () => {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return windowSize;
}