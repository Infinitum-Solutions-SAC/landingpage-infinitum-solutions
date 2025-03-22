import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Text } from 'troika-three-text';
import { getAllSaasTools } from '@/utils/calculatorUtils';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface ThreeDToolSelectorProps {
  selectedTools: string[];
  onToolToggle: (toolName: string) => void;
}

const ThreeDToolSelector = ({ selectedTools, onToolToggle }: ThreeDToolSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    controls?: OrbitControls;
    toolObjects?: Map<string, THREE.Group>;
    raycaster?: THREE.Raycaster;
    mouse?: THREE.Vector2;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = 400; // Altura fija para la visualización

    // Configuración básica de Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controles de órbita para interactuar con la escena
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    
    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Raycaster para interacción
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Mapa para almacenar objetos 3D de herramientas
    const toolObjects = new Map<string, THREE.Group>();

    // Crear objetos 3D para cada herramienta
    const tools = getAllSaasTools();
    const radius = 8; // Radio de la esfera en la que se colocarán los objetos
    
    tools.forEach((tool, index) => {
      // Calcular posición en una esfera
      const phi = Math.acos(-1 + (2 * index) / tools.length);
      const theta = Math.sqrt(tools.length * Math.PI) * phi;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Crear un grupo para contener la herramienta
      const toolGroup = new THREE.Group();
      toolGroup.position.set(x, y, z);
      toolGroup.userData = { name: tool.name, cost: tool.cost };
      
      // Esfera para la herramienta
      const geometry = new THREE.SphereGeometry(0.7, 16, 16);
      const isSelected = selectedTools.includes(tool.name);
      const material = new THREE.MeshPhongMaterial({ 
        color: isSelected ? 0x3b82f6 : 0xcccccc,
        emissive: isSelected ? 0x1e40af : 0x000000,
        emissiveIntensity: isSelected ? 0.3 : 0,
        shininess: 30
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      toolGroup.add(sphere);
      
      // Crear texto para el nombre de la herramienta
      const textMesh = new Text();
      textMesh.text = tool.name;
      textMesh.fontSize = 0.3;
      textMesh.color = 0x333333;
      textMesh.anchorX = 'center';
      textMesh.anchorY = 'middle';
      textMesh.position.y = -1;
      textMesh.sync();
      
      toolGroup.add(textMesh);
      scene.add(toolGroup);
      toolObjects.set(tool.name, toolGroup);
    });
    
    // Guardar referencia a objetos importantes
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      toolObjects,
      raycaster,
      mouse
    };

    // Función de animación
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      sceneRef.current.animationId = animationId;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Iniciar animación
    animate();
    setIsLoading(false);
    
    // Evento para detectar clics en herramientas
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calcular posición del mouse normalizada
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;
      
      // Lanzar rayo desde la cámara
      raycaster.setFromCamera(mouse, camera);
      
      // Obtener todos los objetos que intersectan con el rayo
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      if (intersects.length > 0) {
        // Buscar el objeto padre que contiene los datos de la herramienta
        let object = intersects[0].object;
        while (object.parent && !object.userData.name) {
          object = object.parent;
        }
        
        if (object.userData.name) {
          onToolToggle(object.userData.name);
        }
      }
    };
    
    // Evento para redimensionar el canvas cuando cambia el tamaño de la ventana
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    
    window.addEventListener('resize', handleResize);
    containerRef.current.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick);
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Limpiar recursos
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      scene.children.forEach(child => {
        if (child instanceof THREE.Group) {
          child.children.forEach(c => {
            if (c instanceof THREE.Mesh) {
              c.geometry.dispose();
              if (c.material instanceof THREE.Material) {
                c.material.dispose();
              }
            }
          });
        }
      });
      
      renderer.dispose();
    };
  }, []);

  // Actualizar el color de las esferas cuando cambia la selección
  useEffect(() => {
    if (sceneRef.current.toolObjects) {
      sceneRef.current.toolObjects.forEach((group, toolName) => {
        const isSelected = selectedTools.includes(toolName);
        const sphere = group.children[0] as THREE.Mesh;
        
        if (sphere && sphere.material instanceof THREE.MeshPhongMaterial) {
          sphere.material.color.set(isSelected ? 0x3b82f6 : 0xcccccc);
          sphere.material.emissive.set(isSelected ? 0x1e40af : 0x000000);
          sphere.material.emissiveIntensity = isSelected ? 0.3 : 0;
        }
      });
    }
  }, [selectedTools]);

  const resetCamera = () => {
    if (sceneRef.current.camera && sceneRef.current.controls) {
      sceneRef.current.camera.position.set(0, 0, 15);
      sceneRef.current.controls.reset();
    }
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="w-full h-[400px] rounded-lg overflow-hidden shadow-inner"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-costwise-blue"></div>
          </div>
        )}
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur"
        onClick={resetCamera}
      >
        <RefreshCw className="h-4 w-4 mr-1" /> Centrar
      </Button>
      <div className="mt-2 text-center text-sm text-gray-500">
        Haz clic en una herramienta para seleccionarla o deseleccionarla
      </div>
    </div>
  );
};

export default ThreeDToolSelector;
