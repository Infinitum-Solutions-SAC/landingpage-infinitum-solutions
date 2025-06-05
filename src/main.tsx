import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Mejorar LCP con hidratación más rápida
const container = document.getElementById("root")!;
const root = createRoot(container);

// Ocultar el loader inicial cuando React esté listo
const hideLoader = () => {
  document.body.classList.add('app-loaded');
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.style.display = 'none';
  }
};

// Renderizar de forma optimizada
root.render(<App />);

// Usar requestIdleCallback si está disponible, o setTimeout como fallback
if ('requestIdleCallback' in window) {
  requestIdleCallback(hideLoader);
} else {
  setTimeout(hideLoader, 100);
}
