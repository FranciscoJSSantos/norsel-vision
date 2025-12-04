import { useEffect, useRef } from 'react';

const EnergyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Energy lines configuration
    const lines: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
    }> = [];

    const lineCount = 15;
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

    // Animation
    const animate = () => {
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

        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = energyColor;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw energy particles
        for (let i = 0; i < 3; i++) {
          const particlePos = i / 3;
          const particleX = line.x + Math.cos(line.angle) * line.length * particlePos;
          const particleY = line.y + Math.sin(line.angle) * line.length * particlePos;

          ctx.beginPath();
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(237, 134, 38, ${line.opacity * 0.8})`;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

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
