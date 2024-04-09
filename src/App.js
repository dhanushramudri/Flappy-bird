import React, { useRef, useEffect } from "react";
import skyImage from "./images/sky.jpg";

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "yellow";

    const skyImg = new Image();
    skyImg.src = skyImage;

    skyImg.onload = () => {
      const scaleWidth = canvas.width / skyImg.width;
      const scaleHeight = canvas.height / skyImg.height;
      const scale = Math.max(scaleWidth, scaleHeight);
      const width = skyImg.width * scale;
      const height = skyImg.height * scale;

      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      ctx.drawImage(skyImg, x, y, width, height);
    };

    var birdReady = false;
    var birdImage = new Image();
    birdImage.onload = function () {
      birdReady = true;
    };
    birdImage.src = "./images/bird.png";
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
