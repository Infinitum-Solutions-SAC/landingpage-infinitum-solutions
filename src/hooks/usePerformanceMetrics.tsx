import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });

  useEffect(() => {
    // Solo en desarrollo para monitoreo
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            setMetrics(prev => ({ 
              ...prev, 
              lcp: Math.round(entry.startTime) 
            }));
            console.log('🎯 LCP:', Math.round(entry.startTime) + 'ms');
            break;
            
          case 'first-contentful-paint':
            setMetrics(prev => ({ 
              ...prev, 
              fcp: Math.round(entry.startTime) 
            }));
            console.log('🚀 FCP:', Math.round(entry.startTime) + 'ms');
            break;
            
          case 'layout-shift':
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
            if (!layoutShiftEntry.hadRecentInput) {
              setMetrics(prev => ({ 
                ...prev, 
                cls: (prev.cls || 0) + layoutShiftEntry.value 
              }));
            }
            break;
            
          case 'first-input':
            const fidEntry = entry as PerformanceEntry & { processingStart: number };
            setMetrics(prev => ({ 
              ...prev, 
              fid: Math.round(fidEntry.processingStart - fidEntry.startTime) 
            }));
            console.log('⚡ FID:', Math.round(fidEntry.processingStart - fidEntry.startTime) + 'ms');
            break;
        }
      });
    });

    // Observar métricas críticas
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-contentful-paint', 'layout-shift', 'first-input'] });

    // Medir TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      setMetrics(prev => ({ ...prev, ttfb: Math.round(ttfb) }));
      console.log('🌐 TTFB:', Math.round(ttfb) + 'ms');
    }

    return () => observer.disconnect();
  }, []);

  return metrics;
};

// Componente para mostrar métricas en desarrollo
export const PerformanceMonitor: React.FC = () => {
  const metrics = usePerformanceMetrics();

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') return null;

  const getScoreColor = (metric: string, value: number | null) => {
    if (value === null) return 'text-gray-500';
    
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'text-green-500' : value <= 4000 ? 'text-yellow-500' : 'text-red-500';
      case 'fcp':
        return value <= 1800 ? 'text-green-500' : value <= 3000 ? 'text-yellow-500' : 'text-red-500';
      case 'fid':
        return value <= 100 ? 'text-green-500' : value <= 300 ? 'text-yellow-500' : 'text-red-500';
      case 'cls':
        return value <= 0.1 ? 'text-green-500' : value <= 0.25 ? 'text-yellow-500' : 'text-red-500';
      case 'ttfb':
        return value <= 800 ? 'text-green-500' : value <= 1800 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">📊 Core Web Vitals</div>
      <div className="space-y-1">
        <div className={`flex justify-between ${getScoreColor('lcp', metrics.lcp)}`}>
          <span>LCP:</span>
          <span>{metrics.lcp ? `${metrics.lcp}ms` : '⏳'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('fcp', metrics.fcp)}`}>
          <span>FCP:</span>
          <span>{metrics.fcp ? `${metrics.fcp}ms` : '⏳'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('fid', metrics.fid)}`}>
          <span>FID:</span>
          <span>{metrics.fid ? `${metrics.fid}ms` : '⏳'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('cls', metrics.cls)}`}>
          <span>CLS:</span>
          <span>{metrics.cls ? metrics.cls.toFixed(3) : '⏳'}</span>
        </div>
        <div className={`flex justify-between ${getScoreColor('ttfb', metrics.ttfb)}`}>
          <span>TTFB:</span>
          <span>{metrics.ttfb ? `${metrics.ttfb}ms` : '⏳'}</span>
        </div>
      </div>
      <div className="mt-2 text-xs opacity-70">
        🟢 Bueno • 🟡 Necesita mejora • 🔴 Pobre
      </div>
    </div>
  );
};
