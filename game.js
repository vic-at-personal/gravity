const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const draw_circle = point => {
  ctx.beginPath();
  ctx.arc(point.px, point.py, 1, 0, 2 * Math.PI);
  const v = Math.sqrt(point.vx*point.vx + point.vy*point.vy);
  ctx.fillStyle = `rgb(${0.03*v}, 0, ${255-0.03*v})`;
  ctx.fill();
};

const create_point = () => {
  const ang = 2 * Math.PI * Math.random();
  const mag = 500 * Math.random();
  return {
    px: canvas.width * Math.random(),
    py: canvas.height * Math.random(),
    vx: mag * Math.cos(ang),
    vy: mag * Math.sin(ang),
    ax: 0,
    ay: 0,
    m: 1,
  };
};

const g = 10000;
const dt = 0.001;

const update_point = obj => {
  obj.vx += obj.ax * dt;
  obj.vy += obj.ay * dt;
  obj.px += obj.vx * dt;
  obj.py += obj.vy * dt;
  obj.ax = 0;
  obj.ay = 0;
};

const points = [];
for (let i = 0; i < 4000; i++) {
  points.push(create_point());
}

const update_acceleration = () => {
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i+1; j < points.length; j++) {
      const dx = points[i].px - points[j].px;
      const dy = points[i].py - points[j].py;
      const d = dx*dx + dy*dy;
      points[j].ax += g * dx / d;
      points[j].ay += g * dy / d;
      points[i].ax -= g * dx / d;
      points[i].ay -= g * dy / d;
    }
  }
};

setInterval(() => {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  update_acceleration();
  for (let i = 0; i < points.length; i++) {
    draw_circle(points[i]);
  }
  for (let i = 0; i < points.length; i++) {
    update_point(points[i]);
  }
}, 17);