
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Tool = {
  name: string;
  icon: string;
};

type FloatingIconsProps = {
  tools: Tool[];
};

const FloatingIcons = ({ tools }: FloatingIconsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create randomized positions for icons
  const icons = tools.map((tool, index) => {
    const delay = Math.random() * 5;
    const duration = 10 + Math.random() * 10; // Between 10-20s for full animation
    const x = Math.random() * 80 - 40; // Range: -40px to 40px
    const y = Math.random() * 60 - 30; // Range: -30px to 30px
    
    return {
      tool,
      animationProps: {
        y: [y, -y, y],
        x: [x, -x, x],
        transition: {
          repeat: Infinity,
          duration,
          delay,
          ease: "easeInOut",
        }
      }
    };
  });

  return (
    <div ref={containerRef} className="relative h-32 w-full overflow-hidden my-6">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute inline-flex items-center justify-center bg-white rounded-full p-2 shadow-md"
          initial={{ scale: 0.8 }}
          animate={item.animationProps}
          style={{
            left: `${20 + (index * 60 / icons.length)}%`,
            top: '50%',
          }}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <span className="text-xs text-center font-medium text-gray-700">{item.tool.name.split(' ')[0]}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
