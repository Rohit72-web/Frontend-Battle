import React, { useEffect, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
}

const CursorWaterEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const animationFrameRef = useRef<number>();
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Add new ripple
      ripplesRef.current.push({
        x,
        y,
        size: 0,
        opacity: 0.6,
        id: rippleIdRef.current++
      });

      // Limit number of ripples for performance
      if (ripplesRef.current.length > 15) {
        ripplesRef.current.shift();
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        // Update ripple properties
        ripple.size += 3;
        ripple.opacity -= 0.015;

        if (ripple.opacity <= 0) {
          return false; // Remove ripple
        }

        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add inner ripple for more water-like effect
        if (ripple.size > 20) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.size - 15, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default CursorWaterEffect;