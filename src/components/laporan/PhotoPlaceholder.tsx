'use client';

import React, { useState } from 'react';
import { Camera, Image as ImageIcon, ZoomIn, X } from 'lucide-react';

interface PhotoPlaceholderProps {
  label: string;
  captionId?: string;
  captionEn?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
  height?: string;
}

export default function PhotoPlaceholder({
  label,
  captionId,
  captionEn,
  aspectRatio = 'video',
  height = '280px',
}: PhotoPlaceholderProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Check if label is a valid image path
  const isImage = 
    label.startsWith('/') || 
    label.startsWith('http') || 
    label.endsWith('.png') || 
    label.endsWith('.jpg') || 
    label.endsWith('.jpeg') || 
    label.endsWith('.webp');

  if (isImage) {
    return (
      <>
        <div className="photo-card-box">
          <div className="photo-image-container" onClick={() => setIsZoomed(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={label} 
              alt={captionId || 'Dokumentasi Program'} 
              className="contained-photo"
            />
            <div className="photo-zoom-hint" title="Klik untuk memperbesar">
              <ZoomIn size={16} />
              <span>Perbesar</span>
            </div>
          </div>
          {captionId && (
            <div className="photo-caption-bar">
              <ImageIcon size={14} className="caption-icon" />
              <span className="caption-text">{captionId}</span>
            </div>
          )}
        </div>

        {/* Modal Lightbox Zoom */}
        {isZoomed && (
          <div className="zoom-modal-backdrop" onClick={() => setIsZoomed(false)}>
            <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="zoom-close-btn" 
                onClick={() => setIsZoomed(false)}
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={label} 
                alt={captionId || 'Dokumentasi Program'} 
                className="modal-full-img"
              />
              {captionId && <p className="modal-caption">{captionId}</p>}
            </div>
          </div>
        )}

        <style jsx>{`
          .photo-card-box {
            width: 100%;
            background-color: #ffffff;
            border-radius: 16px;
            border: 1px solid rgba(18, 44, 30, 0.1);
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
            display: flex;
            flex-direction: column;
          }

          .photo-image-container {
            position: relative;
            width: 100%;
            background-color: #f8faf9;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            min-height: 240px;
          }

          .contained-photo {
            width: 100%;
            height: auto;
            max-height: 380px;
            object-fit: contain;
            border-radius: 8px;
            transition: transform 0.25s ease;
          }

          .photo-image-container:hover .contained-photo {
            transform: scale(1.015);
          }

          .photo-zoom-hint {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background-color: rgba(18, 44, 30, 0.85);
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            opacity: 0;
            transition: opacity 0.2s ease;
            backdrop-filter: blur(4px);
          }

          .photo-image-container:hover .photo-zoom-hint {
            opacity: 1;
          }

          .photo-caption-bar {
            padding: 0.85rem 1.25rem;
            background-color: #ffffff;
            border-top: 1px solid rgba(18, 44, 30, 0.06);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          :global(.caption-icon) {
            color: var(--primary-green, #2d6a4f);
            flex-shrink: 0;
          }

          .caption-text {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--bg-dark-green, #122c1e);
            line-height: 1.4;
          }

          /* Zoom Modal */
          .zoom-modal-backdrop {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.85);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            backdrop-filter: blur(6px);
          }

          .zoom-modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .modal-full-img {
            max-width: 90vw;
            max-height: 82vh;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          }

          .modal-caption {
            color: #ffffff;
            font-size: 0.95rem;
            margin-top: 1rem;
            text-align: center;
            font-weight: 500;
          }

          .zoom-close-btn {
            position: absolute;
            top: -3rem;
            right: 0;
            background-color: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }

          .zoom-close-btn:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
        `}</style>
      </>
    );
  }

  // Fallback placeholder
  return (
    <div 
      className="photo-placeholder-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: height,
        backgroundColor: '#e8ece9',
        border: '2px dashed rgba(45, 106, 79, 0.35)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: 'rgba(45, 106, 79, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
          color: 'var(--primary-green, #2d6a4f)'
        }}
      >
        <Camera size={24} />
      </div>

      <div 
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--bg-dark-green, #122c1e)',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          fontWeight: 600,
          padding: '0.3rem 0.75rem',
          borderRadius: '6px',
          marginBottom: '0.5rem',
          letterSpacing: '0.02em'
        }}
      >
        {label}
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #57655e)', margin: 0, maxWidth: '380px' }}>
        {captionId || 'Slot foto dokumentasi lapangan (Ganti file ini di folder public/images)'}
      </p>
    </div>
  );
}

