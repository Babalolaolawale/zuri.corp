import { useEffect, useRef, useState, useCallback } from 'react';

export function AsciiWave() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFrame(f => f + 1), 100);
    return () => clearInterval(timer);
  }, []);

  const rows = 40;
  const cols = 140;
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

  return <pre className="font-mono text-[6px] md:text-sm text-foreground/40 leading-none select-none overflow-hidden">{output}</pre>;
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
  const [clicks, setClicks] = useState(0);
  const [showSnake, setShowSnake] = useState(false);

  const handleClick = () => {
    if (clicks >= 2) {
      setShowSnake(true);
      setClicks(0);
    } else {
      setClicks(c => c + 1);
    }
  };

  return (
    <>
      <pre 
        onClick={handleClick} 
        className="font-mono text-[10px] md:text-xs leading-tight text-foreground/20 text-center select-none overflow-hidden pb-12 pt-8 cursor-pointer interactive hover:text-foreground/40 transition-colors"
      >
{`
      _             _                       
 ___ | |  _  _  _ _(_)  __  ___  _ _  _ __  
|_ / | | | || || '_| | / _|/ _ \\| '_|| '_ \\ 
/ /__| |_| || || | | || (__| (_) || |  | .__/ 
\\___| \\__,_||_||_| |_| \\___|\\___/ |_|  |_|  
`}
      </pre>
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
    </>
  );
}

function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState([{x: 10, y: 10}]);
  const [food, setFood] = useState({x: 15, y: 10});
  const [dir, setDir] = useState({x: 1, y: 0});
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowUp': if (dir.y === 0) setDir({x: 0, y: -1}); break;
        case 'ArrowDown': if (dir.y === 0) setDir({x: 0, y: 1}); break;
        case 'ArrowLeft': if (dir.x === 0) setDir({x: -1, y: 0}); break;
        case 'ArrowRight': if (dir.x === 0) setDir({x: 1, y: 0}); break;
        case 'Escape': onClose(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, onClose]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = {x: prev[0].x + dir.x, y: prev[0].y + dir.y};
        if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 15) {
          setGameOver(true);
          return prev;
        }
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({x: Math.floor(Math.random()*30), y: Math.floor(Math.random()*15)});
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  let grid = '';
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 30; x++) {
      if (snake.some(s => s.x === x && s.y === y)) grid += '█';
      else if (food.x === x && food.y === y) grid += '*';
      else grid += '·';
    }
    grid += '\\n';
  }

  return (
    <div className="fixed inset-0 z-[99999] bg-foreground text-white flex flex-col items-center justify-center font-mono cursor-default">
      <div className="mb-4 text-xs opacity-50">ZURI MAINFRAME // SNAKE_PROTOCOL // PRESS ESC TO EXIT</div>
      <pre className="border border-white/20 p-4 leading-none tracking-widest">{grid}</pre>
      {gameOver && <div className="mt-4 text-red-500 animate-pulse">GAME OVER. <button onClick={() => {setSnake([{x:10, y:10}]); setGameOver(false); setDir({x:1, y:0})}} className="text-white underline ml-2 interactive">RESTART</button></div>}
      <div className="mt-8 text-[10px] opacity-30">USE ARROW KEYS TO NAVIGATE</div>
    </div>
  );
}
