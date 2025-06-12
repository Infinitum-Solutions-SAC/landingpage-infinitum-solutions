import { useEffect } from 'react';

export const useLCPOptimization = () => {
  useEffect(() => {
    // Precargar recursos críticos LCP
    const criticalResources = [
      '/assets/images/hardware/firewall.webp'
    ];

    criticalResources.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Observer para detectar el elemento LCP
    let lcpObserver: PerformanceObserver | null = null;
    
    if ('PerformanceObserver' in window) {
      lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        // Log para debugging
        console.log('LCP detected:', {
          value: lastEntry?.startTime,
          element: lastEntry?.element,
          url: lastEntry?.url
        });
      });

      try {
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP observer not supported');
      }
    }

    // Optimizar fonts para reducir layout shifts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }

    return () => {
      if (lcpObserver) {
        lcpObserver.disconnect();
      }
    };
  }, []);

  // Función para marcar cuando el elemento LCP ha sido cargado
  const markLCPLoaded = () => {
    performance.mark('lcp-element-loaded');
  };

  return { markLCPLoaded };
};

export const useCLSOptimization = () => {
  useEffect(() => {
    // Observer para detectar layout shifts
    let clsObserver: PerformanceObserver | null = null;
    
    if ('PerformanceObserver' in window) {
      clsObserver = new PerformanceObserver((entryList) => {
        let clsScore = 0;
        
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        });

        if (clsScore > 0) {
          console.warn('CLS detected:', {
            score: clsScore,
            threshold: clsScore > 0.1 ? 'POOR' : clsScore > 0.05 ? 'NEEDS IMPROVEMENT' : 'GOOD'
          });
        }
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // Prevenir layout shifts causados por scrollbar
    const hasScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
    if (hasScrollbar) {
      document.documentElement.style.setProperty('--scrollbar-width', '15px');
    }

    return () => {
      if (clsObserver) {
        clsObserver.disconnect();
      }
    };
  }, []);
};
