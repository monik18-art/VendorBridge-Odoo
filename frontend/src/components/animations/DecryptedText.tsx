"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
  [key: string]: any;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  animateOn = 'view',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isDeciphering, setIsDeciphering] = useState(false);
  const internalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startDeciphering = () => {
      setIsDeciphering(true);
      let iteration = 0;

      interval = setInterval(() => {
        setDisplayText((prevText) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (iteration > maxIterations) return text[index];
              if (sequential && iteration > index) return text[index];
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration > maxIterations + text.length) {
          setDisplayText(text);
          setIsDeciphering(false);
          clearInterval(interval);
        }
      }, speed);
    };

    if (animateOn === 'view') {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startDeciphering();
                observer.disconnect();
            }
        });
        if (internalRef.current) observer.observe(internalRef.current);
    } else if (isHovering && !isDeciphering) {
      startDeciphering();
    }

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, sequential, isHovering, animateOn, isDeciphering]);

  return (
    <div
      ref={internalRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </div>
  );
}
