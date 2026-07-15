'use strict';

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
}

export default function ScrollRevealSection({ children }: ScrollRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to dimensions, scale, and border radius
  // We want the expansion to happen in the middle of the scroll range
  const width = useTransform(scrollYProgress, [0.1, 0.45], ["92%", "100%"]);
  const height = useTransform(scrollYProgress, [0.1, 0.45], ["88vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.45], ["32px", "0px"]);
  const scale = useTransform(scrollYProgress, [0.1, 0.45], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1], ["10vh", "0vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.08], [0.8, 1]);

  return (
    <div 
      ref={containerRef} 
      className="reveal-wrapper"
      style={{
        height: '140vh', // Provides scroll distance for the animation
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#0a140f', // Very dark green background visible behind the card
      }}
    >
      {/* Sticky container that keeps the section centered while scrolling/expanding */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <motion.div
          className="reveal-card"
          style={{
            width,
            height,
            borderRadius,
            scale,
            y,
            opacity,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'var(--bg-cream)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
