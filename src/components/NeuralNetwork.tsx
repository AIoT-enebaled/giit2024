import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulsePhase: number;
  layer: number;
  connections: number[];
  activation: number;
  targetActivation: number;
  baseX: number;
  baseY: number;
  angle: number;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  dataFlow: {
    progress: number;
    value: number;
    active: boolean;
  }[];
}

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    let isMouseInCanvas = false;
    let time = 0;
    let nodes: Node[] = [];
    let connections: Connection[] = [];

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createNodes = () => {
      nodes = [];
      const numNodes = 50; // Increase number of nodes
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        
        nodes.push({
          x,
          y,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          pulsePhase: Math.random() * Math.PI * 2,
          layer: Math.floor(Math.random() * 3),
          connections: [],
          activation: 0,
          targetActivation: 0,
          baseX: x,
          baseY: y,
          angle: angle
        });
      }
    };

    const createConnections = () => {
      connections = [];
      nodes.forEach((node, i) => {
        const numConnections = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < numConnections; j++) {
          const targetIndex = (i + 1 + Math.floor(Math.random() * (nodes.length - 2))) % nodes.length;
          connections.push({
            from: i,
            to: targetIndex,
            strength: 0.5 + Math.random() * 0.5,
            dataFlow: Array(3).fill(null).map(() => ({
              progress: Math.random(),
              value: Math.random(),
              active: Math.random() > 0.5
            }))
          });
          nodes[i].connections.push(connections.length - 1);
        }
      });
    };

    const updateNodes = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      nodes.forEach((node, index) => {
        // Update angle for circular motion
        node.angle = (node.angle + 0.002) % (Math.PI * 2);
        
        // Calculate target position on the circle
        const targetX = centerX + Math.cos(node.angle) * radius;
        const targetY = centerY + Math.sin(node.angle) * radius;
        
        // Add some random movement
        node.vx += (Math.random() - 0.5) * 0.2;
        node.vy += (Math.random() - 0.5) * 0.2;
        
        // Move towards target position
        node.vx += (targetX - node.x) * 0.01;
        node.vy += (targetY - node.y) * 0.01;
        
        // Apply damping
        node.vx *= 0.95;
        node.vy *= 0.95;
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Update pulse
        node.pulsePhase += 0.05;
        
        // Randomly activate nodes
        if (Math.random() < 0.01) {
          node.targetActivation = Math.random();
        }
        node.activation += (node.targetActivation - node.activation) * 0.1;
      });
    };

    const drawNodes = () => {
      ctx.save();
      nodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const size = 4 + pulse * 2;
        const alpha = 0.3 + pulse * 0.7;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.fill();
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, size * 0.5,
          node.x, node.y, size * 2
        );
        gradient.addColorStop(0, `rgba(147, 197, 253, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      ctx.restore();
    };

    const drawConnections = () => {
      ctx.save();
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        conn.dataFlow.forEach(flow => {
          if (!flow.active) return;
          
          flow.progress += 0.02;
          if (flow.progress >= 1) {
            flow.progress = 0;
            flow.active = Math.random() > 0.3;
          }
          
          const x = fromNode.x + (toNode.x - fromNode.x) * flow.progress;
          const y = fromNode.y + (toNode.y - fromNode.y) * flow.progress;
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${0.3 + flow.value * 0.7})`;
          ctx.fill();
        });
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.1)';
        ctx.stroke();
      });
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateNodes();
      drawConnections();
      drawNodes();
      
      time += 0.01;
      requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    createNodes();
    createConnections();
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createNodes();
      createConnections();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default NeuralNetwork;
