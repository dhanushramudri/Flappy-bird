import React, { useState, useEffect, useRef } from "react";
import upperImg from "./images/upper.png";
import lowerImg from "./images/lower.png";
import birdImg from "./images/bird.png";

const birdImgSrc = birdImg;
const upperImgSrc = upperImg;
const lowerImgSrc = lowerImg;

const FlappyBirdGame = () => {
  const [bird, setBird] = useState({
    xspeed: 0,
    yspeed: 0,
    xacc: 0,
    yacc: 200,
    x: 2,
    y: 2,
    score: 0,
  });

  const [obstacles, setObstacles] = useState([
    { xspeed: -30, x: 20, y: -100 },
    { xspeed: -30, x: 75, y: -50 },
    { xspeed: -30, x: 130, y: -70 },
    { xspeed: -30, x: 20, y: 150 },
    { xspeed: -30, x: 75, y: 135 },
    { xspeed: -30, x: 130, y: 160 },
  ]);

  const [keysDown, setKeysDown] = useState({});
  const [f, setF] = useState(0);

  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const thenRef = useRef(Date.now());

  const reset = () => {
    setBird({
      ...bird,
      xspeed: 0,
      yspeed: 0,
      x: 0,
      y: 120,
      score: 0,
    });
  };

  const handleKeyDown = (e) => {
    setKeysDown((prevKeysDown) => ({
      ...prevKeysDown,
      [e.keyCode]: true,
    }));
  };

  const handleKeyUp = (e) => {
    setKeysDown((prevKeysDown) => {
      const newKeysDown = { ...prevKeysDown };
      delete newKeysDown[e.keyCode];
      return newKeysDown;
    });
    setF(0);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = (modifier) => {
      const newScore = bird.score + modifier;
      setBird((prevBird) => ({
        ...prevBird,
        score: newScore,
      }));

      if (38 in keysDown && f === 0) {
        setBird((prevBird) => ({
          ...prevBird,
          yspeed: -100,
        }));
        setF(1);
      }

      setBird((prevBird) => ({
        ...prevBird,
        x: prevBird.x + prevBird.xspeed * modifier,
        y: prevBird.y + prevBird.yspeed * modifier,
        xspeed: prevBird.xspeed + prevBird.xacc * modifier,
        yspeed: prevBird.yspeed + prevBird.yacc * modifier,
      }));

      setObstacles((prevObstacles) =>
        prevObstacles.map((obstacle) => ({
          ...obstacle,
          x: obstacle.x + obstacle.xspeed * modifier,
        }))
      );

      // Collision detection
      if (bird.y > 256) reset();
      obstacles.forEach((obstacle) => {
        if (obstacle.x < 15 && bird.y < obstacle.y + 135) reset();
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render bird
      ctx.drawImage(birdImage, bird.x, bird.y);

      // Render obstacles
      obstacles.forEach((obstacle) => {
        ctx.drawImage(upperImage, obstacle.x, obstacle.y);
        ctx.drawImage(lowerImage, obstacle.x, obstacle.y + 160);
      });

      // Render score
      ctx.fillStyle = "rgb(250, 250, 250)";
      ctx.font = "24px Helvetica";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + bird.score, 12, 32);
    };

    const mainLoop = () => {
      const now = Date.now();
      const delta = now - thenRef.current;
      update(delta / 1000);
      render();
      thenRef.current = now;
      requestRef.current = requestAnimationFrame(mainLoop);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("resize", handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const birdImage = new Image();
    birdImage.onload = () => {
      render();
      mainLoop();
    };
    birdImage.src = birdImgSrc;

    const upperImage = new Image();
    upperImage.src = upperImgSrc;

    const lowerImage = new Image();
    lowerImage.src = lowerImgSrc;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default FlappyBirdGame;
