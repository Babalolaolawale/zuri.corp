import { useEffect, useRef, useState } from 'react';

export function AsciiHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const chars = '.:-=+*#%@';
    let mouse = { x: -1000, y: -1000 };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(26, 26, 26, 0.25)'; // Balanced visibility text color
      ctx.font = '14px monospace';
      
      const size = 20;
      const cols = Math.floor(canvas.width / size);
      const rows = Math.floor(canvas.height / size);

      const time = Date.now() * 0.001;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * size;
          const posY = y * size;
          
          const dx = mouse.x - posX;
          const dy = mouse.y - posY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const noise = Math.sin(x * 0.1 + time) + Math.cos(y * 0.1 + time);
          
          let charIdx = 0;
          if (dist < 150) {
            charIdx = Math.floor((1 - dist / 150) * chars.length);
          } else {
            charIdx = Math.floor((noise + 2) / 4 * 3);
          }
          
          charIdx = Math.max(0, Math.min(chars.length - 1, charIdx));
          
          ctx.fillText(chars[charIdx], posX, posY);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hidden md:block absolute inset-0 pointer-events-none opacity-60 z-0" />;
}

export function AsciiWave() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => f + 1), 100);
    return () => clearInterval(timer);
  }, []);

  const rows = 14;
  const cols = 40;
  let output = '';
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const ny = y / rows - 0.5;
      const nx = x / cols - 0.5;
      const dist = Math.sqrt(nx * nx + ny * ny);
      const val = Math.sin(dist * 15 - frame * 0.4);
      
      if (val > 0.6) output += '#';
      else if (val > 0.2) output += '*';
      else if (val > -0.2) output += '+';
      else if (val > -0.6) output += '-';
      else output += '.';
    }
    output += '\n';
  }

  return <pre className="font-mono text-[10px] md:text-xs text-foreground/40 leading-none select-none overflow-hidden">{output}</pre>;
}

export function AsciiNetwork() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => f + 1), 150);
    return () => clearInterval(timer);
  }, []);

  const template = [
    "  [ NODE_A ] ---------------------------> [ NODE_B ]",
    "      |                                     |       ",
    "      v                                     v       ",
    "  [ AUTH ]                              [ SETTLE ]  ",
    "      |                                     |       ",
    "      +-----------> [ LEDGER ] <------------+       "
  ];

  const positions = [
    {x: 13, y: 0}, {x: 17, y: 0}, {x: 21, y: 0}, {x: 25, y: 0}, {x: 29, y: 0}, {x: 33, y: 0}, {x: 37, y: 0}, {x: 41, y: 0},
    {x: 43, y: 1}, {x: 43, y: 2},
    {x: 43, y: 4}, 
    {x: 43, y: 5}, {x: 39, y: 5}, {x: 35, y: 5}, {x: 31, y: 5},
    {x: 19, y: 5}, {x: 15, y: 5}, {x: 11, y: 5}, {x: 7, y: 5},
    {x: 6, y: 5}, {x: 6, y: 4}, 
    {x: 6, y: 2}, {x: 6, y: 1}
  ];

  const pos = positions[frame % positions.length];
  
  let lines = [...template];
  if (lines.length > pos.y) {
    let line = lines[pos.y];
    lines[pos.y] = line.substring(0, pos.x) + '@' + line.substring(pos.x + 1);
  }

  return <pre className="font-mono text-xs md:text-sm text-foreground/60 leading-tight select-none overflow-x-auto">{lines.join('\n')}</pre>;
}

export function AsciiFooterEmblem() {
  return (
    <pre className="font-mono text-[10px] md:text-xs leading-tight text-foreground/20 text-center select-none overflow-hidden pb-12 pt-8">
{`
      _             _                       
 ___ | |  _  _  _ _(_)  __  ___  _ _  _ __  
|_ / | | | || || '_| | / _|/ _ \\| '_|| '_ \\ 
/ /__| |_| || || | | || (__| (_) || |  | .__/ 
\\___| \\__,_||_||_| |_| \\___|\\___/ |_|  |_|  
`}
    </pre>
  );
}
