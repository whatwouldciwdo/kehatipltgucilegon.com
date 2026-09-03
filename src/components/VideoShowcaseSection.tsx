'use client';

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowUpRight, X } from 'lucide-react';

interface VideoShowcaseSectionProps {
  videoSrc?: string;
  marqueeText?: string;
  badgeText?: string;
}

export default function VideoShowcaseSection({
  videoSrc = '/video/1.%20VIDEO%20EMAS%20PT%20PLN%20INDONESIA%20POWER%20PLTGU%20CILEGON%202025.mp4',
  marqueeText = 'Proper Emas 2025 • Proper Emas 2025 • Proper Emas 2025 • ',
  badgeText = 'KLIK UNTUK TONTON VIDEO • PLN IP UBP CILEGON • ',
}: VideoShowcaseSectionProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Mouse move handler for smooth magnetic cursor effect on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.18, y: y * 0.18 });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePos({ x: 0, y: 0 });
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="video-showcase-section"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        aria-label="Video Profil PT PLN Indonesia Power UBP Cilegon"
        data-reveal="fade"
      >
        {/* Background Video Layer - Runs continuously across entire height */}
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="background-video"
          />
          <div className="video-overlay" />
        </div>

        {/* Center Area with Floating Rotating Interactive Circular Badge */}
        <div className="video-interactive-center">
          <div 
            className="interactive-badge-container"
            style={{
              transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            }}
          >
            <div className={`circular-badge ${isHovering ? 'is-hovered' : ''}`}>
              {/* Rotating curved SVG text */}
              <svg viewBox="0 0 160 160" className="badge-svg-text">
                <path
                  id="textPathCircle"
                  d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="none"
                />
                <text className="rotating-text">
                  <textPath href="#textPathCircle" startOffset="0%">
                    {badgeText}
                  </textPath>
                </text>
              </svg>

              {/* Central Arrow / Action Icon */}
              <div className="badge-center-icon">
                <ArrowUpRight size={28} className="arrow-icon" strokeWidth={2.2} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Sound Toggle Control Button (Bottom-Right) */}
        <button 
          className="sound-toggle-btn"
          onClick={toggleSound}
          aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span className="sound-label">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* Running Text Marquee: 100% Transparent, Video visible behind it, No Green Box */}
        <div className="bottom-marquee-bar" aria-hidden="true">
          <div className="marquee-content">
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
            <span className="marquee-item">{marqueeText}</span>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal on Click */}
      {isModalOpen && (
        <div className="video-modal-backdrop" onClick={closeModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Tutup Video">
              <X size={24} />
            </button>
            <video
              ref={modalVideoRef}
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="modal-video-element"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .video-showcase-section {
          position: relative;
          width: 100%;
          height: 110vh;
          min-height: 820px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Video Layer & Overlays */
        .video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .background-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease;
        }

        .video-showcase-section:hover .background-video {
          transform: scale(1.03);
          filter: brightness(0.95);
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(18, 44, 30, 0.3) 0%,
            rgba(18, 44, 30, 0.08) 45%,
            rgba(18, 44, 30, 0.5) 100%
          );
          pointer-events: none;
          transition: background 0.5s ease;
        }

        .video-showcase-section:hover .video-overlay {
          background: linear-gradient(
            180deg,
            rgba(18, 44, 30, 0.4) 0%,
            rgba(18, 44, 30, 0.18) 45%,
            rgba(18, 44, 30, 0.6) 100%
          );
        }

        /* Interactive Center Area */
        .video-interactive-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
        }

        .interactive-badge-container {
          position: relative;
          z-index: 10;
          pointer-events: none;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .circular-badge {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .circular-badge.is-hovered {
          transform: scale(1.15);
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.5), 0 0 30px rgba(183, 228, 199, 0.4);
        }

        .badge-svg-text {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: rotateBadge 16s linear infinite;
        }

        .video-showcase-section:hover .badge-svg-text {
          animation-duration: 8s;
        }

        @keyframes rotateBadge {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .rotating-text {
          fill: #ffffff;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .badge-center-icon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #ffffff;
          color: var(--bg-dark-green, #122c1e);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .circular-badge.is-hovered .badge-center-icon {
          transform: scale(1.1) rotate(45deg);
          background: var(--accent-lime, #b7e4c7);
          color: #0b1f14;
        }

        .arrow-icon {
          transition: transform 0.3s ease;
        }

        /* Sound Toggle Control Button */
        .sound-toggle-btn {
          position: absolute;
          bottom: 8rem;
          right: 2.5rem;
          z-index: 20;
          background: rgba(18, 44, 30, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          border-radius: 9999px;
          padding: 0.6rem 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sound-toggle-btn:hover {
          background: var(--primary-green, #2d6a4f);
          border-color: rgba(255, 255, 255, 0.7);
          transform: scale(1.05);
        }

        /* Transparent Bottom Running Marquee Strip - Video visible directly behind */
        .bottom-marquee-bar {
          width: 100%;
          padding: 0.5rem 0 1rem 0;
          background: transparent;
          border: none;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          position: relative;
          z-index: 10;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-content {
          display: inline-flex;
          animation: marqueeScroll 45s linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .marquee-item {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(3.5rem, 7.5vw, 6.5rem);
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.9);
          padding-right: 3.5rem;
          line-height: 1;
          display: inline-block;
        }

        /* Fullscreen Video Modal */
        .video-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        .video-modal-content {
          position: relative;
          width: 100%;
          max-width: 1100px;
          aspect-ratio: 16 / 9;
          background: #000000;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .modal-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          z-index: 20;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #ffffff;
          color: #000000;
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 992px) {
          .video-showcase-section {
            height: 90vh;
            min-height: 600px;
          }

          .circular-badge {
            width: 130px;
            height: 130px;
          }

          .badge-center-icon {
            width: 46px;
            height: 46px;
          }

          .sound-toggle-btn {
            bottom: 6.5rem;
            right: 1.5rem;
            padding: 0.5rem 0.9rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .video-showcase-section {
            height: 80vh;
            min-height: 520px;
          }

          .circular-badge {
            width: 110px;
            height: 110px;
          }

          .badge-center-icon {
            width: 40px;
            height: 40px;
          }

          .rotating-text {
            font-size: 9px;
          }

          .sound-toggle-btn {
            bottom: 5.5rem;
            right: 1rem;
          }

          .marquee-item {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </>
  );
}
