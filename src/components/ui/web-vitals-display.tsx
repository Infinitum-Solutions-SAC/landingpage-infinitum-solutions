import { useEffect, useState } from 'react';

interface WebVitalsMetrics {
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
}

interface WebVitalsDisplayProps {
  showMetrics?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const WebVitalsDisplay: React.FC<WebVitalsDisplayProps> = ({ 
  showMetrics = false, 
  position = 'bottom-right' 
}) => {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});
  const [isVisible, setIsVisible] = useState(showMetrics);

  useEffect(() => {
    if (!showMetrics) return;

    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;

    // Observer para LCP
    if ('PerformanceObserver' in window) {
      try {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          setMetrics(prev => ({ ...prev, lcp: lastEntry?.startTime }));
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Observer para CLS
        clsObserver = new PerformanceObserver((entryList) => {
          let clsScore = 0;
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: clsScore }));
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Observer para FID
        fidObserver = new PerformanceObserver((entryList) => {
          const firstEntry = entryList.getEntries()[0] as any;
          setMetrics(prev => ({ ...prev, fid: firstEntry?.processingStart - firstEntry?.startTime }));
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

      } catch (e) {
        console.warn('Performance observers not fully supported');
      }
    }

    // TTFB
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      setMetrics(prev => ({ ...prev, ttfb: navigation.responseStart - navigation.requestStart }));
    }

    // Hotkey para toggle (Ctrl+Shift+V)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (lcpObserver) lcpObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
      if (fidObserver) fidObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMetrics, isVisible]);

  const getMetricColor = (value: number | undefined, thresholds: [number, number]) => {
    if (value === undefined) return 'text-gray-500';
    if (value <= thresholds[0]) return 'text-green-500';
    if (value <= thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatMetric = (value: number | undefined, unit: string = 'ms') => {
    if (value === undefined) return '—';
    return unit === 's' ? `${(value / 1000).toFixed(2)}s` : `${Math.round(value)}${unit}`;
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  };

  if (!isVisible && !showMetrics) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-black/80 text-white p-3 rounded-lg font-mono text-xs backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-sm">Web Vitals</h4>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white ml-2"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span>LCP:</span>
          <span className={getMetricColor(metrics.lcp, [2500, 4000])}>
            {formatMetric(metrics.lcp, 's')}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>CLS:</span>
          <span className={getMetricColor(metrics.cls ? metrics.cls * 1000 : undefined, [100, 250])}>
            {metrics.cls ? metrics.cls.toFixed(3) : '—'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>FID:</span>
          <span className={getMetricColor(metrics.fid, [100, 300])}>
            {formatMetric(metrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>TTFB:</span>
          <span className={getMetricColor(metrics.ttfb, [800, 1800])}>
            {formatMetric(metrics.ttfb)}
          </span>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
        Ctrl+Shift+V para toggle
      </div>
    </div>
  );
};

export default WebVitalsDisplay;
