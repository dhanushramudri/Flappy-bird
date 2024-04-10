import React, { useRef, useEffect } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const bgImageRef = useRef(null);
  const birdImageRef = useRef(null);
  const upper1ImageRef = useRef(null);
  const upper2ImageRef = useRef(null);
  const upper3ImageRef = useRef(null);
  const lower1ImageRef = useRef(null);
  const lower2ImageRef = useRef(null);
  const lower3ImageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "yellow";

    bgImageRef.current = new Image();
    bgImageRef.current.onload = function () {
      ctx.drawImage(bgImageRef.current, 0, 0);
    };
    bgImageRef.current.src = "images/background.png";

    birdImageRef.current = new Image();
    birdImageRef.current.onload = function () {
      ctx.drawImage(birdImageRef.current, 2, 2);
    };
    birdImageRef.current.src = "./images/bird.png";

    upper1ImageRef.current = new Image();
    upper1ImageRef.current.onload = function () {
      ctx.drawImage(upper1ImageRef.current, 20, -100);
    };
    upper1ImageRef.current.src = "./images/upper.png";

    upper2ImageRef.current = new Image();
    upper2ImageRef.current.onload = function () {
      ctx.drawImage(upper2ImageRef.current, 75, -50);
    };
    upper2ImageRef.current.src = "./images/upper.png";

    upper3ImageRef.current = new Image();
    upper3ImageRef.current.onload = function () {
      ctx.drawImage(upper3ImageRef.current, 130, -70);
    };
    upper3ImageRef.current.src = "./images/upper.png";

    lower1ImageRef.current = new Image();
    lower1ImageRef.current.onload = function () {
      ctx.drawImage(lower1ImageRef.current, 20, 150);
    };
    lower1ImageRef.current.src = "./images/lower.png";

    lower2ImageRef.current = new Image();
    lower2ImageRef.current.onload = function () {
      ctx.drawImage(lower2ImageRef.current, 75, 135);
    };
    lower2ImageRef.current.src = "./images/lower.png";

    lower3ImageRef.current = new Image();
    lower3ImageRef.current.onload = function () {
      ctx.drawImage(lower3ImageRef.current, 130, 160);
    };
    lower3ImageRef.current.src = "./images/lower.png";
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default App;
