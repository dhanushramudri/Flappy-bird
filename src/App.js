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
    //  Upper 1 bar
    var upper1Ready = false;
    var upper1Image = new Image();
    upper1Image.onload = function () {
      upper1Ready = true;
    };
    upper1Image.src = "images/upper.png";

    var upper2Ready = false;
    var upper2Image = new Image();
    upper2Image.onload = function () {
      upper2Ready = true;
    };
    upper2Image.src = "images/upper.png";
    var upper3Ready = false;
    var upper3Image = new Image();
    upper3Image.onload = function () {
      upper3Ready = true;
    };
    upper3Image.src = "images/upper.png";
    var lower1Ready = false;
    var lower1Image = new Image();
    lower1Image.onload = function () {
      lower1Ready = true;
    };
    lower1Image.src = "images/lower.png";

    var lower2Ready = false;
    var lower2Image = new Image();
    lower2Image.onload = function () {
      lower2Ready = true;
    };
    lower2Image.src = "images/lower.png";

    var lower3Ready = false;
    var lower3Image = new Image();
    lower3Image.onload = function () {
      lower3Ready = true;
    };
    lower3Image.src = "images/lower.png";
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;
