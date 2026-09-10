'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  alt: string;
  href?: string;
}

interface CollegeLifeShowcaseProps {
  title?: string;
  subtitle?: string;
  items?: ShowcaseItem[];
}

const defaultKehatiItems: ShowcaseItem[] = [
  {
    id: 'wilayah-konservasi',
    title: 'KONSERVASI FLORA & FAUNA',
    subtitle: 'Wilayah Konservasi Sebesar 1,7 Ha',
    image: '/images/kehati-showcase/taman-kehati.jpg',
    alt: 'Wilayah Konservasi Flora dan Fauna Sebesar 1,7 Ha',
    href: '#kehati',
  },
  {
    id: 'restorasi-mangrove',
    title: 'RESTORASI MANGROVE',
    subtitle: 'Ekosistem Pesisir Cilegon',
    image: '/images/kehati-showcase/restorasi-mangrove.jpg',
    alt: 'Restorasi Mangrove dan Konservasi Pantai',
    href: '#kehati',
  },
  {
    id: 'suaka-fauna',
    title: 'SUAKA FAUNA',
    subtitle: 'Habitat Elang Bondol & Burung Lokal',
    image: '/images/kehati-showcase/suaka-fauna.jpg',
    alt: 'Perlindungan Fauna & Burung Lokal',
    href: '#kehati',
  },
  {
    id: 'nursery-pembibitan',
    title: 'NURSERY & PEMBIBITAN',
    subtitle: 'Pembudidayaan Pohon Langka',
    image: '/images/kehati-showcase/nursery-pembibitan.jpg',
    alt: 'Pusat Nursery & Pembiditan Pohon Langka',
    href: '#kehati',
  },
  {
    id: 'koridor-hijau',
    title: 'KORIDOR HIJAU',
    subtitle: 'Area Penyangga Lingkungan PLTGU',
    image: '/images/kehati-showcase/koridor-hijau.jpg',
    alt: 'Koridor Hijau Kawasan Pembangkit',
    href: '#kehati',
  },
  {
    id: 'eco-pond',
    title: 'ECO POND & WETLAND',
    subtitle: 'Konservasi Daur Ulang Air',
    image: '/images/kehati-showcase/eco-pond.jpg',
    alt: 'Kolam Konservasi & Daur Ulang Air Kondensat',
    href: '#kehati',
  },
];

export default function CollegeLifeShowcase({
  title = 'Kawasan & Inisiatif Kehati',
  subtitle = 'Jelajahi keanekaragaman hayati dan fasilitas konservasi lingkungan di kawasan PLTGU UBP Cilegon.',
  items = defaultKehatiItems,
}: CollegeLifeShowcaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="kehati" className="showcase-fullwidth-section" aria-label={title}>
      {/* Top subtle divider rule */}
      <div className="section-top-divider" />

      {/* Header text container */}
      <div className="showcase-header" data-reveal>
        <h2 className="showcase-title">{title}</h2>
        {subtitle && <p className="showcase-subtitle">{subtitle}</p>}
      </div>

      {/* Full-Width Carousel Track Wrapper */}
      <div className="carousel-fullwidth-wrapper" data-reveal="fade" data-reveal-delay="180">
        {/* Left & Right Frosted Glass Blur Edge Masks */}
        <div className="edge-blur-mask left-blur" aria-hidden="true" />
        <div className="edge-blur-mask right-blur" aria-hidden="true" />

        <div 
          className={`carousel-track ${hoveredId ? 'has-hover' : ''}`}
          ref={scrollContainerRef}
          role="region"
          aria-label={`${title} carousel`}
          tabIndex={0}
        >
          {items.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOther = hoveredId !== null && !isHovered;

            return (
              <div 
                key={item.id} 
                className={`carousel-item ${isHovered ? 'item-active' : ''} ${isOther ? 'item-blurred' : ''}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <a 
                  href={item.href || '#'} 
                  className="circle-card"
                  aria-label={item.title}
                >
                  <div className="circle-image-wrapper">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="circle-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="circle-text-block">
                    <span className="circle-title">{item.title}</span>
                    {item.subtitle && (
                      <span className="circle-subtitle">{item.subtitle}</span>
                    )}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="carousel-nav-controls">
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="nav-arrow-btn"
          aria-label="Scroll left"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="nav-arrow-btn"
          aria-label="Scroll right"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <style jsx>{`
        .showcase-fullwidth-section {
          background-color: var(--bg-dark-green, #122c1e);
          padding: 5rem 0 6rem 0;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .section-top-divider {
          width: 92%;
          max-width: 1300px;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.12);
          margin: 0 auto 3.5rem auto;
        }

        .showcase-header {
          text-align: center;
          padding: 0 1.5rem;
          margin-bottom: 3.5rem;
        }

        .showcase-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 0.85rem;
        }

        .showcase-subtitle {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(250, 250, 250, 0.75);
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Full Width Edge-to-Edge Carousel */
        .carousel-fullwidth-wrapper {
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          padding: 1.5rem 0;
          overflow: hidden;
        }

        /* Edge Blur Gradient Overlay */
        .edge-blur-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 10;
          pointer-events: none;
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .left-blur {
          left: 0;
          background: linear-gradient(
            to right,
            var(--bg-dark-green, #122c1e) 15%,
            rgba(18, 44, 30, 0.5) 50%,
            transparent 100%
          );
        }

        .right-blur {
          right: 0;
          background: linear-gradient(
            to left,
            var(--bg-dark-green, #122c1e) 15%,
            rgba(18, 44, 30, 0.5) 50%,
            transparent 100%
          );
        }

        /* Scrollable Track */
        .carousel-track {
          display: flex;
          gap: 2.75rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2rem 15vw;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .carousel-track::-webkit-scrollbar {
          display: none;
        }

        .carousel-item {
          flex: 0 0 auto;
          scroll-snap-align: center;
          transition: filter 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: filter, opacity, transform;
        }

        /* Subtle Soft Blur Effect on Hover */
        .carousel-item.item-blurred {
          filter: blur(2px);
          opacity: 0.68;
          transform: scale(0.98);
        }

        .carousel-item.item-active {
          filter: blur(0px);
          opacity: 1;
          transform: scale(1.05);
          z-index: 5;
        }

        .circle-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 1.25rem;
          cursor: pointer;
          outline: none;
        }

        .circle-card:focus-visible .circle-image-wrapper {
          outline: 3px solid var(--accent-lime, #b7e4c7);
          outline-offset: 4px;
        }

        .circle-image-wrapper {
          width: 210px;
          height: 210px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.35);
          overflow: hidden;
          background-color: #0b1f14;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
          position: relative;
        }

        .circle-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .circle-card:hover .circle-image-wrapper {
          border-color: var(--accent-lime, #b7e4c7);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 25px rgba(183, 228, 199, 0.3);
        }

        .circle-card:hover .circle-image {
          transform: scale(1.08);
        }

        .circle-text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
        }

        .circle-title {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          max-width: 180px;
          line-height: 1.35;
          transition: color 0.2s ease;
        }

        .circle-subtitle {
          font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
          font-size: 0.775rem;
          font-weight: 500;
          color: rgba(250, 250, 250, 0.65);
          max-width: 170px;
          line-height: 1.3;
        }

        .circle-card:hover .circle-title {
          color: var(--accent-lime, #b7e4c7);
        }

        .carousel-nav-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2.75rem;
        }

        .nav-arrow-btn {
          width: 56px;
          height: 40px;
          border-radius: 24px;
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .nav-arrow-btn:hover {
          background-color: var(--accent-lime, #b7e4c7);
          color: #122c1e;
          border-color: var(--accent-lime, #b7e4c7);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .nav-arrow-btn:active {
          transform: translateY(0);
        }

        .nav-arrow-btn:focus-visible {
          outline: 2px solid var(--primary-green, #2d6a4f);
          outline-offset: 3px;
        }

        @media (max-width: 1024px) {
          .edge-blur-mask {
            width: 100px;
          }

          .carousel-track {
            padding: 1.5rem 8vw;
            gap: 2rem;
          }

          .circle-image-wrapper {
            width: 170px;
            height: 170px;
          }
        }

        @media (max-width: 768px) {
          .showcase-fullwidth-section {
            padding: 3rem 0 4rem 0;
          }

          .edge-blur-mask {
            width: 50px;
          }

          .carousel-track {
            gap: 1.5rem;
            padding: 1rem 1.25rem;
          }

          .circle-image-wrapper {
            width: 140px;
            height: 140px;
          }

          .circle-title {
            font-size: 0.775rem;
            max-width: 130px;
          }

          .circle-subtitle {
            font-size: 0.7rem;
            max-width: 120px;
          }
        }
      `}</style>
    </section>
  );
}
