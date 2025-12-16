import { useEffect, useRef } from 'react';

const EnergyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size to viewport only (not entire document)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Energy lines configuration - REDUCED from 15 to 6 for performance
    const lines: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
    }> = [];

    const lineCount = 6; // Reduced from 15
    const energyColor = '#ed8626';

    // Create initial lines
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 150 + 50,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Throttle animation to 30 FPS instead of 60 for better performance
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    // Animation
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;
      lastTime = currentTime - (deltaTime % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        // Update position
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // Wrap around edges
        if (line.x < -100) line.x = canvas.width + 100;
        if (line.x > canvas.width + 100) line.x = -100;
        if (line.y < -100) line.y = canvas.height + 100;
        if (line.y > canvas.height + 100) line.y = -100;

        // Draw energy line
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);

        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;

        ctx.lineTo(endX, endY);

        // Gradient for energy effect
        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `rgba(237, 134, 38, 0)`);
        gradient.addColorStop(0.5, `rgba(237, 134, 38, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(237, 134, 38, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // REMOVED shadowBlur for performance - it's very expensive
        // Draw single particle instead of 3
        const particleX = line.x + Math.cos(line.angle) * line.length * 0.5;
        const particleY = line.y + Math.sin(line.angle) * line.length * 0.5;

        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 134, 38, ${line.opacity * 0.8})`;
        ctx.fill();
      });
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default EnergyBackground;
