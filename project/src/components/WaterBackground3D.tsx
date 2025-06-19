import React, { useEffect, useRef, useState } from 'react';

interface FloatingObject {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  type: 'sphere' | 'cube' | 'cylinder';
  color: string;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  isHovered: boolean;
  repelForceX: number;
  repelForceY: number;
}

const WaterBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectsRef = useRef<FloatingObject[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize floating objects
  useEffect(() => {
    const objects: FloatingObject[] = [];
    const objectCount = 20;

    for (let i = 0; i < objectCount; i++) {
      objects.push({
        id: i,
        x: Math.random() * 90 + 5, // Keep away from edges
        y: Math.random() * 90 + 5,
        z: Math.random() * 50 + 10,
        size: Math.random() * 40 + 30, // Larger sizes
        type: ['sphere', 'cube', 'cylinder'][Math.floor(Math.random() * 3)] as any,
        color: [
          'rgba(59, 130, 246, 0.7)',   // Blue - more opaque
          'rgba(147, 197, 253, 0.7)',  // Light Blue
          'rgba(99, 102, 241, 0.7)',   // Indigo
          'rgba(168, 85, 247, 0.7)',   // Purple
          'rgba(236, 72, 153, 0.7)',   // Pink
          'rgba(34, 197, 94, 0.7)',    // Green
        ][Math.floor(Math.random() * 6)],
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3,
        velocityZ: (Math.random() - 0.5) * 0.3,
        isHovered: false,
        repelForceX: 0,
        repelForceY: 0,
      });
    }

    objectsRef.current = objects;
    setIsInitialized(true);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isInitialized) return;

    const animate = () => {
      objectsRef.current = objectsRef.current.map(obj => {
        // Calculate distance from mouse
        const mouseDistance = Math.sqrt(
          Math.pow(obj.x - mouseRef.current.x, 2) + 
          Math.pow(obj.y - mouseRef.current.y, 2)
        );

        // Apply repel force if mouse is close
        const repelRadius = 20;
        let newRepelForceX = obj.repelForceX * 0.9; // Decay
        let newRepelForceY = obj.repelForceY * 0.9; // Decay

        if (mouseDistance < repelRadius) {
          const repelStrength = (repelRadius - mouseDistance) / repelRadius;
          const angle = Math.atan2(obj.y - mouseRef.current.y, obj.x - mouseRef.current.x);
          newRepelForceX += Math.cos(angle) * repelStrength * 3;
          newRepelForceY += Math.sin(angle) * repelStrength * 3;
          obj.isHovered = true;
        } else {
          obj.isHovered = false;
        }

        // Update position with physics
        let newX = obj.x + obj.velocityX + newRepelForceX;
        let newY = obj.y + obj.velocityY + newRepelForceY;
        let newZ = obj.z + obj.velocityZ;

        // Boundary collision with bounce
        if (newX <= 5 || newX >= 95) {
          obj.velocityX *= -0.7;
          newX = Math.max(5, Math.min(95, newX));
        }
        if (newY <= 5 || newY >= 95) {
          obj.velocityY *= -0.7;
          newY = Math.max(5, Math.min(95, newY));
        }
        if (newZ <= 10 || newZ >= 60) {
          obj.velocityZ *= -0.7;
          newZ = Math.max(10, Math.min(60, newZ));
        }

        // Add slight drift for floating effect
        obj.velocityX += (Math.random() - 0.5) * 0.02;
        obj.velocityY += (Math.random() - 0.5) * 0.02;
        obj.velocityZ += (Math.random() - 0.5) * 0.02;

        // Limit velocity
        obj.velocityX = Math.max(-0.8, Math.min(0.8, obj.velocityX));
        obj.velocityY = Math.max(-0.8, Math.min(0.8, obj.velocityY));
        obj.velocityZ = Math.max(-0.8, Math.min(0.8, obj.velocityZ));

        return {
          ...obj,
          x: newX,
          y: newY,
          z: newZ,
          rotationX: obj.rotationX + 1.5,
          rotationY: obj.rotationY + 1,
          rotationZ: obj.rotationZ + 0.5,
          repelForceX: newRepelForceX,
          repelForceY: newRepelForceY,
        };
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized]);

  const renderObject = (obj: FloatingObject) => {
    const scale = obj.isHovered ? 1.4 : 1;
    const opacity = obj.isHovered ? 0.9 : 0.6;
    
    const baseStyle = {
      position: 'absolute' as const,
      left: `${obj.x}%`,
      top: `${obj.y}%`,
      width: `${obj.size}px`,
      height: `${obj.size}px`,
      transform: `
        translate(-50%, -50%) 
        translateZ(${obj.z}px) 
        rotateX(${obj.rotationX}deg) 
        rotateY(${obj.rotationY}deg) 
        rotateZ(${obj.rotationZ}deg)
        scale(${scale})
      `,
      backgroundColor: obj.color,
      opacity,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(2px)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      zIndex: Math.floor(obj.z),
    };

    switch (obj.type) {
      case 'sphere':
        return (
          <div
            key={obj.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              boxShadow: obj.isHovered 
                ? '0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)' 
                : '0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)',
              background: `radial-gradient(circle at 30% 30%, ${obj.color}, ${obj.color.replace('0.7', '0.4')})`,
            }}
          />
        );
      
      case 'cube':
        return (
          <div
            key={obj.id}
            style={{
              ...baseStyle,
              borderRadius: '12px',
              boxShadow: obj.isHovered 
                ? '0 0 40px rgba(147, 197, 253, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)' 
                : '0 0 20px rgba(147, 197, 253, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)',
              background: `linear-gradient(135deg, ${obj.color}, ${obj.color.replace('0.7', '0.4')})`,
            }}
          />
        );
      
      case 'cylinder':
        return (
          <div
            key={obj.id}
            style={{
              ...baseStyle,
              borderRadius: '50% 50% 50% 50% / 25% 25% 75% 75%',
              boxShadow: obj.isHovered 
                ? '0 0 40px rgba(168, 85, 247, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)' 
                : '0 0 20px rgba(168, 85, 247, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)',
              background: `linear-gradient(45deg, ${obj.color}, ${obj.color.replace('0.7', '0.4')})`,
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.1) 0%, transparent 60%),
          linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)
        `,
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Enhanced water effect overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(59, 130, 246, 0.1) 3px,
              rgba(59, 130, 246, 0.1) 6px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(147, 197, 253, 0.1) 3px,
              rgba(147, 197, 253, 0.1) 6px
            )
          `,
          animation: 'waterFlow 25s linear infinite',
        }}
      />

      {/* Floating objects container */}
      <div 
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {objectsRef.current.map(renderObject)}
      </div>

      {/* Enhanced caustic light effects */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
            radial-gradient(ellipse at 10% 90%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)
          `,
          animation: 'causticLight 20s ease-in-out infinite',
        }}
      />

      {/* Bubble effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `bubble ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes waterFlow {
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-8px) translateX(4px); }
          50% { transform: translateY(0px) translateX(0px); }
          75% { transform: translateY(8px) translateX(-4px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        @keyframes causticLight {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1) rotate(0deg);
          }
          25% { 
            opacity: 0.4;
            transform: scale(1.2) rotate(90deg);
          }
          50% { 
            opacity: 0.3;
            transform: scale(0.8) rotate(180deg);
          }
          75% { 
            opacity: 0.5;
            transform: scale(1.1) rotate(270deg);
          }
        }
        
        @keyframes bubble {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WaterBackground3D;