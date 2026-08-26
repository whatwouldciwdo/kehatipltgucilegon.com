'use client';

import React from 'react';

export default function HeroAbstractBackground() {
  return (
    <div className="hero-abstract-canvas" aria-hidden="true">
      {/* Deep gradient background base */}
      <div className="canvas-base" />

      {/* Layer 1: Top-Left soft lavender / lilac sweeping rounded card */}
      <div className="layer-pill layer-top-left" />

      {/* Layer 2: Middle wide rounded card with purple-to-teal gradient */}
      <div className="layer-pill layer-middle-left" />

      {/* Layer 3: Center-Right overlapping dark slate-teal block with subtle drop shadow */}
      <div className="layer-block layer-center-main" />

      {/* Layer 4: Right deep emerald-green backdrop panel */}
      <div className="layer-panel layer-right-emerald" />

      {/* Layer 5: Bottom sweeping lavender/violet rounded frosted band */}
      <div className="layer-pill layer-bottom-sweep" />

      {/* Layer 6: Soft ambient lighting & vignette overlay */}
      <div className="canvas-ambient-lighting" />

      <style jsx>{`
        .hero-abstract-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #112822; /* Fallback deep dark green */
          z-index: 1;
          pointer-events: none;
        }

        /* Base Gradient: Violet/Lavender on left to Deep Teal and Forest Green on right */
        .canvas-base {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            115deg,
            #7c5ac2 0%,
            #5e4b8b 22%,
            #3b4d66 48%,
            #233f42 72%,
            #0f2b22 100%
          );
        }

        /* Layer 1: Top Left Violet/Lilac Band */
        .layer-top-left {
          position: absolute;
          top: -2%;
          left: -5%;
          width: 75%;
          height: 28%;
          border-radius: 0 44px 44px 0;
          background: linear-gradient(
            90deg,
            rgba(167, 139, 250, 0.95) 0%,
            rgba(186, 164, 252, 0.85) 50%,
            rgba(139, 92, 246, 0.7) 100%
          );
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
        }

        /* Layer 2: Middle-Left Deep Violet-to-Slate Card */
        .layer-middle-left {
          position: absolute;
          top: 26%;
          left: -4%;
          width: 44%;
          height: 44%;
          border-radius: 0 48px 48px 0;
          background: linear-gradient(
            135deg,
            #5a4282 0%,
            #424870 50%,
            #2d4154 100%
          );
          box-shadow: 18px 14px 40px rgba(0, 0, 0, 0.28);
          z-index: 2;
        }

        /* Layer 3: Center-Right Large Rounded Block (Forms the center focal structure) */
        .layer-center-main {
          position: absolute;
          top: 6%;
          left: 40%;
          width: 32%;
          height: 70%;
          border-radius: 52px;
          background: linear-gradient(
            160deg,
            #646b94 0%,
            #3f516d 40%,
            #263a48 100%
          );
          box-shadow: 
            -16px 20px 48px rgba(0, 0, 0, 0.35),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
          z-index: 3;
        }

        /* Layer 4: Right Deep Emerald/Teal Backdrop Panel */
        .layer-right-emerald {
          position: absolute;
          top: 0;
          right: 0;
          width: 38%;
          height: 100%;
          background: linear-gradient(
            180deg,
            #1e3842 0%,
            #133129 55%,
            #0b241c 100%
          );
          box-shadow: -24px 0 60px rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        /* Layer 5: Bottom Sweeping Lavender/Violet Rounded Band */
        .layer-bottom-sweep {
          position: absolute;
          bottom: -4%;
          left: -5%;
          width: 105%;
          height: 36%;
          border-radius: 52px 52px 0 0;
          background: linear-gradient(
            90deg,
            rgba(186, 164, 252, 0.95) 0%,
            rgba(167, 139, 250, 0.85) 30%,
            rgba(147, 125, 219, 0.7) 65%,
            rgba(65, 80, 110, 0.5) 100%
          );
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 4;
        }

        /* Layer 6: Subtle Lighting Depth & Radial Glow */
        .canvas-ambient-lighting {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 20% 30%,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 50%
          ),
          radial-gradient(
            circle at 85% 85%,
            rgba(18, 44, 30, 0.4) 0%,
            transparent 60%
          );
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 5;
        }

        @media (max-width: 992px) {
          .layer-top-left {
            width: 85%;
            height: 24%;
            border-radius: 0 32px 32px 0;
          }

          .layer-middle-left {
            width: 55%;
            height: 40%;
            border-radius: 0 36px 36px 0;
          }

          .layer-center-main {
            left: 36%;
            width: 42%;
            height: 65%;
            border-radius: 40px;
          }

          .layer-bottom-sweep {
            height: 38%;
            border-radius: 36px 36px 0 0;
          }
        }

        @media (max-width: 576px) {
          .layer-top-left {
            width: 95%;
            height: 20%;
            border-radius: 0 24px 24px 0;
          }

          .layer-middle-left {
            width: 65%;
            height: 35%;
            border-radius: 0 28px 28px 0;
          }

          .layer-center-main {
            left: 30%;
            width: 55%;
            height: 55%;
            border-radius: 32px;
          }

          .layer-bottom-sweep {
            height: 42%;
            border-radius: 28px 28px 0 0;
          }
        }
      `}</style>
    </div>
  );
}
