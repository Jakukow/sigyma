"use client";
import React, { useState, useEffect } from "react";

type CircularProgressProps = {
  size?: number;
  value: number;
  maxValue: number;
  unit?: string;
  strokeWidth?: number;
  color?: string;
  duration?: number;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 120,
  value,
  maxValue,
  unit = "",
  strokeWidth = 10,
  color = "#a593f3",
  duration = 500,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [offset, setOffset] = useState(0);

  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Obliczanie wartości procentowej progresu na podstawie aktualnej wartości i maksymalnej
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    // Animacja progresu
    const progressOffset = (1 - percentage / 100) * circumference;
    setOffset(progressOffset);

    let startValue = 0;
    const increment = value / (duration / 10); // zwiększamy wartość co 10ms

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(startValue));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [value, maxValue, percentage, circumference, duration]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="text-gray-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className="transition-all duration-300 ease-in-out"
        strokeWidth={strokeWidth}
        stroke={color}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx={center}
        cy={center}
        style={{
          transition: "stroke-dashoffset 0.5s ease-in-out",
          transformOrigin: "50% 50%",
        }}
      />
      <text
        x="50%"
        y="45%"
        dy=".3em"
        textAnchor="middle"
        className="text-xl font-semibold text-gray-700"
      >
        {`${displayValue}${unit}`}
      </text>
      <text
        x="50%"
        y="60%"
        dy=".3em"
        textAnchor="middle"
        className="text-sm text-gray-500"
      >
        {`/ ${maxValue}${unit}`}
      </text>
    </svg>
  );
};

export default CircularProgress;
