'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  Eye, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Tag, 
  Leaf, 
  Bird, 
  Waves, 
  Cpu, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface GalleryItem {
  id: string;
  name: string;
  category: string;
  categoryKey: 'all' | 'flora' | 'fauna' | 'mangrove' | 'inovasi';
  location: string;
  badge: string;
  description: string;
  coverImage: string;
  detailImages: string[];
  stats?: string;
}

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'item-0',
    name: 'Taman Kehati Ring 1 PLTGU',
    category: 'Flora & Lanskap',
    categoryKey: 'flora',
    location: 'Kawasan Konservasi Ring 1',
    badge: '137 Spesies',
    description: 'Kawasan konservasi flora seluas 17.7 hektar dengan keanekaragaman pohon langka dan endemik yang dikelola secara berkelanjutan.',
    coverImage: '/images/kehati-showcase/taman-kehati.jpg',
    detailImages: [
      '/images/kehati-showcase/taman-kehati.jpg',
      '/images/gallery/product-1.webp',
      '/images/gallery/product-1-detail-1.webp',
      '/images/gallery/product-1-detail-2.webp',
    ],
    stats: '23.670 Batang Flora Terpantau'
  },
  {
    id: 'item-1',
    name: 'Biowing Connect & Avifauna',
    category: 'Fauna & Satwa',
    categoryKey: 'fauna',
    location: 'Zona Suaka Burung Ring 1 & 2',
    badge: '52 Spesies Satwa',
    description: 'Sistem regenerasi hayati alami berbantu satwa burung lokal dan pemantauan 1.122 individu aves di area penyangga.',
    coverImage: '/img/laporan/2026/biowing-connect-system.png',
    detailImages: [
      '/img/laporan/2026/biowing-connect-system.png',
      '/images/kehati-showcase/suaka-fauna.jpg',
      '/images/gallery/product-2.webp',
      '/images/gallery/product-2-detail-1.webp',
    ],
    stats: '1.122 Individu Aves Teridentifikasi'
  },
  {
    id: 'item-2',
    name: 'Restorasi Mangrove Pesisir',
    category: 'Ekosistem Pesisir',
    categoryKey: 'mangrove',
    location: 'Pesisir Desa Lontar, Kec. Tirtayasa',
    badge: '19.000 Bibit',
    description: 'Rehabilitasi pesisir pantai kritis dengan penanaman kumulatif 19.000 pohon Rhizophora apiculata bersama DLH Kab. Serang.',
    coverImage: '/images/kehati-showcase/restorasi-mangrove.jpg',
    detailImages: [
      '/images/kehati-showcase/restorasi-mangrove.jpg',
      '/img/laporan/2026/penanaman-mangrove-2026.png',
      '/images/gallery/product-3.webp',
      '/images/gallery/product-3-detail-1.webp',
    ],
    stats: '0.45 Ha Tutupan Mangrove Lestari'
  },
  {
    id: 'item-3',
    name: 'C-Flora Smart Watering IoT',
    category: 'Inovasi Sirkular',
    categoryKey: 'inovasi',
    location: 'Nursery & Kebun Pembibitan',
    badge: 'Smart IoT',
    description: 'Sistem otomasi penyiraman cerdas berbasis sensor kelembaban tanah dan sirkularitas air kondensat ramah energi.',
    coverImage: '/img/laporan/2026/sustainable-cycle-smart-watering.png',
    detailImages: [
      '/img/laporan/2026/sustainable-cycle-smart-watering.png',
      '/images/kehati-showcase/nursery-pembibitan.jpg',
      '/images/gallery/product-4.webp',
      '/images/gallery/product-4-detail-1.webp',
    ],
    stats: '100% Efisiensi Air Kondensat'
  },
  {
    id: 'item-4',
    name: 'Suaka Flora Pohon Pelangi & Langka',
    category: 'Flora & Lanskap',
    categoryKey: 'flora',
    location: 'Taman Edukasi Kehati',
    badge: 'Flora Endemik',
    description: 'Koleksi pohon langka bernilai konservasi tinggi seperti Eucalyptus deglupta, Pohon Gaharu, Angsana, dan Mahoni.',
    coverImage: '/images/kehati-showcase/koridor-hijau.jpg',
    detailImages: [
      '/images/kehati-showcase/koridor-hijau.jpg',
      '/images/gallery/product-5.webp',
      '/images/gallery/product-5-detail-1.webp',
      '/images/gallery/product-5-detail-2.webp',
    ],
    stats: 'Indeks Keanekaragaman H\' 3.374'
  },
  {
    id: 'item-5',
    name: 'Eco Pond & Wetland Konservasi',
    category: 'Ekosistem Air',
    categoryKey: 'inovasi',
    location: 'Kolam Konservasi Ring 1',
    badge: 'Sirkular Air',
    description: 'Wetland alami penyaring air yang menjadi mikrohabitat beragam ikan lokal, capung, dan amfibi penyangga keseimbangan lingkungan.',
    coverImage: '/images/kehati-showcase/eco-pond.jpg',
    detailImages: [
      '/images/kehati-showcase/eco-pond.jpg',
      '/img/laporan/2026/Kolam-Nila.png',
      '/images/gallery/product-6.webp',
      '/images/gallery/product-6-detail-1.webp',
    ],
    stats: 'Kualitas Air Baku Baku Mutu Kelas II'
  },
  {
    id: 'item-6',
    name: 'Apotek Hidup & Tanaman Obat',
    category: 'Pemberdayaan Masyarakat',
    categoryKey: 'flora',
    location: 'Kawasan Binaan Masyarakat',
    badge: 'Pemberdayaan',
    description: 'Budidaya tanaman obat keluarga (TOGA) bersama kelompok tani binaan CSR PLTGU Cilegon untuk kemandirian herbal.',
    coverImage: '/img/laporan/2026/Apotek-hidup.png',
    detailImages: [
      '/img/laporan/2026/Apotek-hidup.png',
      '/images/gallery/product-7.webp',
      '/images/gallery/product-7-detail-1.webp',
      '/images/gallery/product-7-detail-2.webp',
    ],
    stats: '45+ Varietas Tanaman Obat Herbal'
  },
  {
    id: 'item-7',
    name: 'Kompleks PLTGU Cilegon 740 MW',
    category: 'Infrastruktur Hijau',
    categoryKey: 'inovasi',
    location: 'Margasari, Puloampel, Banten',
    badge: 'PROPER Emas',
    description: 'Pembangkit listrik tenaga gas uap modern berteknologi tinggi yang beroperasi berdampingan harmonis dengan kelestarian alam.',
    coverImage: '/images/pltgu-cilegon-2.png',
    detailImages: [
      '/images/pltgu-cilegon-2.png',
      '/images/pembangkit.JPG',
      '/images/gallery/product-8.webp',
      '/images/gallery/product-8-detail-1.webp',
    ],
    stats: '740 MW Listrik Bersih Rendah Emisi'
  },
];

export default function GridToPreviewGallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'flora' | 'fauna' | 'mangrove' | 'inovasi'>('all');
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);
  const [modalActiveImgIdx, setModalActiveImgIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftPreviewRef = useRef<HTMLDivElement>(null);
  const rightPreviewRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLLIElement | null)[]>([]);

  const activeProductRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const leftTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const rightTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const leftGalleryLoopRef = useRef<gsap.core.Timeline | null>(null);
  const rightGalleryLoopRef = useRef<gsap.core.Timeline | null>(null);

  const filteredItems = defaultGalleryItems;

  const categories = [
    { key: 'all', label: t('Semua Koleksi', 'All Collection'), icon: <Sparkles size={16} />, count: 8 },
    { key: 'flora', label: t('Flora & Taman Kehati', 'Flora & Kehati Park'), icon: <Leaf size={16} />, count: 3 },
    { key: 'fauna', label: t('Fauna & Biowing', 'Fauna & Biowing'), icon: <Bird size={16} />, count: 1 },
    { key: 'mangrove', label: t('Restorasi Mangrove', 'Mangrove Restoration'), icon: <Waves size={16} />, count: 1 },
    { key: 'inovasi', label: t('Inovasi & Kawasan', 'Innovation & Facility'), icon: <Cpu size={16} />, count: 3 },
  ];

  // Helper to build timeline for a preview controller
  const buildPreviewTimeline = useCallback((
    containerEl: HTMLElement,
    targetProducts: (HTMLLIElement | null)[],
    clippedEl: HTMLElement
  ) => {
    const { width, height } = containerEl.getBoundingClientRect();
    const vw = window.innerWidth / 100;
    const armWidthVw = 5;
    const armWidthPx = armWidthVw * vw;

    const armWidth = {
      x: width > 0 ? (armWidthPx / width) * 100 : 10,
      y: height > 0 ? (armWidthPx / height) * 100 : 10,
    };

    const widthInVw = width > 0 ? width / vw : 50;
    const heightInVw = height > 0 ? height / vw : 50;
    const shrinkVw = 5;

    const scaleFactor = {
      x: widthInVw > 0 ? (widthInVw - shrinkVw) / widthInVw : 0.95,
      y: heightInVw > 0 ? (heightInVw - shrinkVw) / heightInVw : 0.95,
    };

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut', duration: 0.45 } })
      .addLabel('preview', 0)
      .addLabel('products', 0)
      .to(containerEl, { opacity: 1, pointerEvents: 'auto' }, 'preview')
      .to(containerEl, { scaleX: scaleFactor.x, scaleY: scaleFactor.y, transformOrigin: 'center center' }, 'preview')
      .to(
        targetProducts.filter(Boolean),
        {
          opacity: 0.15,
          x: (i) => (i % 2 === 0 ? '2vw' : '-2vw'),
          y: (i) => (i < 2 ? '2vw' : '-2vw'),
        },
        'products'
      )
      .fromTo(
        clippedEl,
        {
          clipPath: `polygon(
            ${50 - armWidth.x / 2}% 0%,
            ${50 + armWidth.x / 2}% 0%,
            ${50 + armWidth.x / 2}% ${50 - armWidth.y / 2}%,
            100% ${50 - armWidth.y / 2}%,
            100% ${50 + armWidth.y / 2}%,
            ${50 + armWidth.x / 2}% ${50 + armWidth.y / 2}%,
            ${50 + armWidth.x / 2}% 100%,
            ${50 - armWidth.x / 2}% 100%,
            ${50 - armWidth.x / 2}% ${50 + armWidth.y / 2}%,
            0% ${50 + armWidth.y / 2}%,
            0% ${50 - armWidth.y / 2}%,
            ${50 - armWidth.x / 2}% ${50 - armWidth.y / 2}%
          )`,
        },
        {
          clipPath: `polygon(
            50% 0%,
            50% 0%,
            50% 50%,
            100% 50%,
            100% 50%,
            50% 50%,
            50% 100%,
            50% 100%,
            50% 50%,
            0% 50%,
            0% 50%,
            50% 50%
          )`,
        },
        'preview'
      );

    return tl;
  }, []);

  // Setup GSAP Timelines on Mount and Resize
  const setupTimelines = useCallback(() => {
    if (window.innerWidth < 900) return;

    if (leftTimelineRef.current) leftTimelineRef.current.kill();
    if (rightTimelineRef.current) rightTimelineRef.current.kill();

    const leftEl = leftPreviewRef.current;
    const rightEl = rightPreviewRef.current;
    if (!leftEl || !rightEl) return;

    const leftClipped = leftEl.querySelector<HTMLElement>('.masked-preview');
    const rightClipped = rightEl.querySelector<HTMLElement>('.masked-preview');

    if (leftClipped) {
      // Left Preview shows when hovering right-side products (2, 3, 6, 7)
      const rightProducts = [productRefs.current[2], productRefs.current[3], productRefs.current[6], productRefs.current[7]];
      leftTimelineRef.current = buildPreviewTimeline(leftEl, rightProducts, leftClipped);
    }

    if (rightClipped) {
      // Right Preview shows when hovering left-side products (0, 1, 4, 5)
      const leftProducts = [productRefs.current[0], productRefs.current[1], productRefs.current[4], productRefs.current[5]];
      rightTimelineRef.current = buildPreviewTimeline(rightEl, leftProducts, rightClipped);
    }
  }, [buildPreviewTimeline]);

  useEffect(() => {
    setupTimelines();

    const handleResize = () => {
      setupTimelines();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (leftTimelineRef.current) leftTimelineRef.current.kill();
      if (rightTimelineRef.current) rightTimelineRef.current.kill();
      if (leftGalleryLoopRef.current) leftGalleryLoopRef.current.kill();
      if (rightGalleryLoopRef.current) rightGalleryLoopRef.current.kill();
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [setupTimelines]);

  // Start image crossfade loop inside preview
  const startGalleryLoop = (container: HTMLElement, itemIdx: number, isLeft: boolean) => {
    const loopRef = isLeft ? leftGalleryLoopRef : rightGalleryLoopRef;
    if (loopRef.current) loopRef.current.kill();

    const images = Array.from(container.querySelectorAll<HTMLImageElement>(`img[data-id="${itemIdx}"]`));
    if (images.length === 0) return;

    const allImgs = Array.from(container.querySelectorAll<HTMLImageElement>('.product-preview__images img'));
    gsap.set(allImgs, { opacity: 0 });
    gsap.set(images[0], { opacity: 1 });

    if (images.length > 1) {
      const tl = gsap.timeline({ repeat: -1 });
      images.forEach((img) => {
        tl.set(images, { opacity: 0 })
          .set(img, { opacity: 1 })
          .to(img, { duration: 0, opacity: 1 }, '+=1.0');
      });
      loopRef.current = tl;
    }
  };

  const handleProductMouseEnter = (index: number) => {
    if (window.innerWidth < 900) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      activeProductRef.current = index;
      const isLeft = index % 4 === 0 || index % 4 === 1;
      const targetContainer = isLeft ? rightPreviewRef.current : leftPreviewRef.current;
      const targetTimeline = isLeft ? rightTimelineRef.current : leftTimelineRef.current;

      if (!targetContainer || !targetTimeline) return;

      const item = filteredItems[index];
      if (!item) return;

      // Update text in preview container
      const titleEl = targetContainer.querySelector('.product-title');
      const categoryEl = targetContainer.querySelector('.product-category');
      const badgeEl = targetContainer.querySelector('.product-badge');
      if (titleEl) titleEl.textContent = item.name;
      if (categoryEl) categoryEl.textContent = `${item.category} • ${item.location}`;
      if (badgeEl) badgeEl.textContent = item.badge;

      // Start animations
      targetTimeline.play();
      startGalleryLoop(targetContainer, index, !isLeft);
    }, 80);
  };

  const handleProductMouseLeave = () => {
    if (window.innerWidth < 900) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (activeProductRef.current !== null) {
      const isLeft = activeProductRef.current % 4 === 0 || activeProductRef.current % 4 === 1;
      const targetTimeline = isLeft ? rightTimelineRef.current : leftTimelineRef.current;
      const loopRef = isLeft ? rightGalleryLoopRef : leftGalleryLoopRef;

      if (targetTimeline) targetTimeline.reverse();
      if (loopRef.current) loopRef.current.kill();

      activeProductRef.current = null;
    }
  };

  const openLightbox = (item: GalleryItem) => {
    setModalItem(item);
    setModalActiveImgIdx(0);
  };

  const closeModal = () => {
    setModalItem(null);
  };

  return (
    <div className="grid-preview-wrapper" ref={containerRef}>
      {/* Category Tabs */}
      <nav className="gallery-categories-bar" aria-label="Kategori Galeri">
        <div className="categories-list">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as any)}
                className={`category-pill-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-label">{cat.label}</span>
                <sup className="cat-count">{cat.count}</sup>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Grid & Interactive Dynamic Preview Stage */}
      <div className="products-stage">
        {/* 4x2 Grid of 8 Gallery Items */}
        <ul className="products__grid">
          {filteredItems.map((item, idx) => {
            const isMatchCategory = activeCategory === 'all' || item.categoryKey === activeCategory;

            return (
              <li
                key={item.id}
                ref={(el) => { productRefs.current[idx] = el; }}
                className={`product-card-item ${!isMatchCategory ? 'is-dimmed' : ''}`}
                data-index={idx}
                onMouseEnter={() => handleProductMouseEnter(idx)}
                onMouseLeave={handleProductMouseLeave}
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); } }}
                aria-label={`Lihat detail ${item.name}`}
              >
                <div className="product-image-container">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="product-main-img"
                    loading="lazy"
                  />
                  <div className="product-card-badge">{item.badge}</div>
                  <div className="product__hover-overlay">
                    <div className="hover-cta-pill">
                      <Eye size={16} />
                      <span>{t('Eksplorasi Detail', 'Explore Detail')}</span>
                    </div>
                  </div>
                </div>

                <div className="product-meta-mobile">
                  <span className="mobile-meta-kicker">{item.category}</span>
                  <h3 className="mobile-meta-title">{item.name}</h3>
                  <span className="mobile-meta-loc">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Dynamic Dual Preview Containers (Left & Right) */}
        <div className="products__preview" aria-hidden="true">
          {/* Left Preview Container (Reveals when hovering on right-side items) */}
          <div className="product-preview --left" ref={leftPreviewRef}>
            <div className="product-preview__images">
              {filteredItems.map((item, itemIdx) => {
                const isRightItem = itemIdx % 4 === 2 || itemIdx % 4 === 3;
                if (!isRightItem) return null;
                return item.detailImages.map((imgUrl, imgIdx) => (
                  <img
                    key={`${item.id}-${imgIdx}`}
                    data-id={itemIdx}
                    src={imgUrl}
                    alt={item.name}
                    className="preview-img-layer"
                  />
                ));
              })}
            </div>

            <div className="product-preview__details">
              <div className="preview-info-left">
                <span className="product-category">Flora & Konservasi</span>
                <p className="product-title">Judul Objek Konservasi</p>
              </div>
              <div className="preview-info-right">
                <span className="product-badge">Status</span>
              </div>
            </div>

            <div className="product-preview__inside masked-preview" />
          </div>

          {/* Right Preview Container (Reveals when hovering on left-side items) */}
          <div className="product-preview --right" ref={rightPreviewRef}>
            <div className="product-preview__images">
              {filteredItems.map((item, itemIdx) => {
                const isLeftItem = itemIdx % 4 === 0 || itemIdx % 4 === 1;
                if (!isLeftItem) return null;
                return item.detailImages.map((imgUrl, imgIdx) => (
                  <img
                    key={`${item.id}-${imgIdx}`}
                    data-id={itemIdx}
                    src={imgUrl}
                    alt={item.name}
                    className="preview-img-layer"
                  />
                ));
              })}
            </div>

            <div className="product-preview__details">
              <div className="preview-info-left">
                <span className="product-category">Flora & Konservasi</span>
                <p className="product-title">Judul Objek Konservasi</p>
              </div>
              <div className="preview-info-right">
                <span className="product-badge">Status</span>
              </div>
            </div>

            <div className="product-preview__inside masked-preview" />
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {modalItem && (
        <div className="gallery-lightbox-modal" role="dialog" aria-modal="true">
          <div className="modal-backdrop" onClick={closeModal} />

          <div className="modal-content-panel">
            <button className="modal-close-btn" onClick={closeModal} aria-label="Tutup Detail">
              <X size={22} />
            </button>

            <div className="modal-body-grid">
              {/* Left Column: Big Interactive Carousel Image Slider */}
              <div className="modal-slider-col">
                <div className="modal-main-img-wrap">
                  <img
                    src={modalItem.detailImages[modalActiveImgIdx] || modalItem.coverImage}
                    alt={modalItem.name}
                    className="modal-active-img"
                  />
                  <div className="modal-img-counter">
                    {modalActiveImgIdx + 1} / {modalItem.detailImages.length}
                  </div>

                  {modalItem.detailImages.length > 1 && (
                    <>
                      <button
                        className="slider-arrow-btn prev"
                        onClick={() => setModalActiveImgIdx((prev) => (prev > 0 ? prev - 1 : modalItem.detailImages.length - 1))}
                        aria-label="Foto Sebelumnya"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className="slider-arrow-btn next"
                        onClick={() => setModalActiveImgIdx((prev) => (prev < modalItem.detailImages.length - 1 ? prev + 1 : 0))}
                        aria-label="Foto Selanjutnya"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {modalItem.detailImages.length > 1 && (
                  <div className="modal-thumbnails-row">
                    {modalItem.detailImages.map((thumb, idx) => (
                      <button
                        key={idx}
                        className={`modal-thumb-btn ${idx === modalActiveImgIdx ? 'active' : ''}`}
                        onClick={() => setModalActiveImgIdx(idx)}
                      >
                        <img src={thumb} alt={`Thumbnail ${idx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Conservation Metadata & Narrative */}
              <div className="modal-info-col">
                <div className="modal-badge-row">
                  <span className="modal-category-badge">{modalItem.category}</span>
                  <span className="modal-status-badge">{modalItem.badge}</span>
                </div>

                <h2 className="modal-title">{modalItem.name}</h2>

                <div className="modal-loc-row">
                  <MapPin size={16} className="loc-icon" />
                  <span>{modalItem.location}</span>
                </div>

                <p className="modal-description">{modalItem.description}</p>

                {modalItem.stats && (
                  <div className="modal-stats-card">
                    <Info size={18} className="stats-icon" />
                    <div>
                      <span className="stats-label">{t('Capaian Konservasi', 'Conservation Metric')}</span>
                      <strong className="stats-val">{modalItem.stats}</strong>
                    </div>
                  </div>
                )}

                <div className="modal-action-row">
                  <a href="/laporan/2026" className="modal-link-btn">
                    <span>{t('Lihat di Laporan Kehati 2026', 'View in 2026 Report')}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .grid-preview-wrapper {
          width: 100%;
          position: relative;
          background-color: #faf9f6;
          padding: 2.5rem 0 6rem 0;
          overflow: hidden;
        }

        /* Categories Bar */
        .gallery-categories-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 2.5rem;
          padding: 0 1.5rem;
        }

        .categories-list {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          justify-content: center;
          background: rgba(18, 44, 30, 0.04);
          padding: 0.4rem 0.5rem;
          border-radius: 50px;
          border: 1px solid rgba(18, 44, 30, 0.08);
        }

        .category-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: #57655e;
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          min-height: 40px;
        }

        .category-pill-btn:hover {
          color: #122c1e;
          background: rgba(255, 255, 255, 0.6);
        }

        .category-pill-btn.active {
          background: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(18, 44, 30, 0.15);
        }

        .cat-icon {
          display: flex;
          align-items: center;
        }

        .cat-count {
          font-size: 0.7em;
          opacity: 0.8;
          font-weight: 700;
        }

        /* Stage Area */
        .products-stage {
          position: relative;
          min-height: 82svh;
          width: 100%;
          padding: 0 clamp(1.5rem, 4vw, 5rem);
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .products__grid,
        .products__preview {
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          row-gap: clamp(1.5rem, 3vw, 3.5rem);
          column-gap: clamp(1.5rem, 3vw, 3.5rem);
          box-sizing: border-box;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .products__grid {
          position: relative;
          z-index: 1;
        }

        .products__preview {
          position: absolute;
          inset: 0;
          padding: 0 clamp(1.5rem, 4vw, 5rem);
          height: 100%;
          width: 100%;
          pointer-events: none;
          z-index: 3;
        }

        /* Individual Card Item */
        .product-card-item {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .product-card-item.is-dimmed {
          opacity: 0.25;
        }

        .product-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 8px;
          overflow: hidden;
          background-color: #e5e3dc;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
        }

        .product-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card-item:hover .product-main-img {
          transform: scale(1.05);
        }

        .product-card-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(18, 44, 30, 0.8);
          backdrop-filter: blur(8px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 4px;
          letter-spacing: 0.04em;
          z-index: 2;
        }

        .product__hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(18, 44, 30, 0.4);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 3;
        }

        .product-card-item:hover .product__hover-overlay {
          opacity: 1;
        }

        .hover-cta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #ffffff;
          color: #122c1e;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.55rem 1.1rem;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transform: translateY(6px);
          transition: transform 0.25s ease;
        }

        .product-card-item:hover .hover-cta-pill {
          transform: translateY(0);
        }

        .product-meta-mobile {
          display: none;
          flex-direction: column;
          margin-top: 0.85rem;
        }

        .mobile-meta-kicker {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green, #2d6a4f);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.2rem;
        }

        .mobile-meta-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #122c1e;
          line-height: 1.3;
          margin-bottom: 0.35rem;
        }

        .mobile-meta-loc {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: #64748b;
        }

        /* Dual Preview Boxes */
        .product-preview {
          height: 100%;
          width: 100%;
          position: relative;
          grid-column: auto / span 2;
          grid-row: 1 / span 2;
          opacity: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
        }

        .product-preview.--left {
          grid-column: 1 / span 2;
        }

        .product-preview.--right {
          grid-column: 3 / span 2;
        }

        .product-preview__inside {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          background: #faf9f6;
        }

        .product-preview__images {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          background: #122c1e;
        }

        .preview-img-layer {
          grid-column: 1;
          grid-row: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .product-preview__details {
          z-index: 5;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 2.25rem 2rem 1.75rem 2rem;
          background: linear-gradient(to top, rgba(18, 44, 30, 0.95) 0%, rgba(18, 44, 30, 0.6) 60%, transparent 100%);
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #ffffff;
          box-sizing: border-box;
        }

        .preview-info-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          max-width: 80%;
        }

        .product-category {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-lime, #b7e4c7);
        }

        .product-title {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: 1.55rem;
          font-weight: 700;
          line-height: 1.25;
          margin: 0;
          color: #ffffff;
        }

        .product-badge {
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          padding: 0.4rem 0.9rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #ffffff;
          backdrop-filter: blur(8px);
          white-space: nowrap;
        }

        /* Lightbox Modal */
        .gallery-lightbox-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(18, 44, 30, 0.85);
          backdrop-filter: blur(10px);
        }

        .modal-content-panel {
          position: relative;
          z-index: 2;
          background: #ffffff;
          border-radius: 16px;
          max-width: 1080px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(18, 44, 30, 0.08);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #122c1e;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: #122c1e;
          color: #ffffff;
        }

        .modal-body-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          padding: 2.5rem;
        }

        .modal-slider-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-main-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          background: #122c1e;
        }

        .modal-active-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-img-counter {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.65);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 50px;
        }

        .slider-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #122c1e;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .slider-arrow-btn.prev {
          left: 1rem;
        }

        .slider-arrow-btn.next {
          right: 1rem;
        }

        .slider-arrow-btn:hover {
          background: #122c1e;
          color: #ffffff;
        }

        .modal-thumbnails-row {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }

        .modal-thumb-btn {
          width: 72px;
          height: 54px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          background: #e5e3dc;
          padding: 0;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .modal-thumb-btn.active {
          border-color: var(--primary-green, #2d6a4f);
          transform: scale(1.05);
        }

        .modal-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .modal-info-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .modal-badge-row {
          display: flex;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .modal-category-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.75rem;
          background: rgba(45, 106, 79, 0.1);
          color: var(--primary-green, #2d6a4f);
          border-radius: 4px;
        }

        .modal-status-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          background: rgba(18, 44, 30, 0.08);
          color: #122c1e;
          border-radius: 4px;
        }

        .modal-title {
          font-family: var(--font-outfit), system-ui, sans-serif;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          color: #122c1e;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .modal-loc-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .modal-description {
          font-size: 1rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 1.75rem;
        }

        .modal-stats-card {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: #f8f7f2;
          border: 1px solid rgba(18, 44, 30, 0.08);
          border-radius: 10px;
          padding: 1rem 1.25rem;
          margin-bottom: 2rem;
        }

        .stats-icon {
          color: var(--primary-green, #2d6a4f);
          margin-top: 2px;
        }

        .stats-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748b;
          margin-bottom: 0.15rem;
        }

        .stats-val {
          font-size: 0.95rem;
          color: #122c1e;
        }

        .modal-action-row {
          display: flex;
        }

        .modal-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.6rem;
          background: var(--bg-dark-green, #122c1e);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .modal-link-btn:hover {
          background: var(--primary-green, #2d6a4f);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(45, 106, 79, 0.25);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .products-stage {
            min-height: auto;
            padding: 0 1.25rem;
          }

          .products__preview {
            display: none;
          }

          .products__grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            gap: 1.5rem;
          }

          .product-meta-mobile {
            display: flex;
          }

          .modal-body-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem;
            gap: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .gallery-categories-bar {
            padding: 0 1rem;
          }

          .categories-list {
            width: 100%;
            border-radius: 16px;
            gap: 0.4rem;
          }

          .category-pill-btn {
            font-size: 0.8rem;
            padding: 0.45rem 0.85rem;
          }

          .products__grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }

          .modal-content-panel {
            max-height: 95vh;
            border-radius: 12px;
          }

          .gallery-lightbox-modal {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
