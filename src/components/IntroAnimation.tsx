'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './IntroAnimation.module.css';

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const initialSequenceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // We need to wait for DOM to be ready and styles applied
    const ctx = gsap.context(() => {
      const veil = veilRef.current;
      const strip = stripRef.current;
      const feature = featureRef.current;

      if (!veil || !strip || !feature) return;

      const tiles = strip.querySelectorAll(`.${styles.tile}`);

      /* Initial States */
      const tileRotations = [-10, -5, 0, 5, 10];
      const tileOffsetsX = [-80, -40, 0, 40, 80];

      gsap.set(tiles, {
        y: '18%',
        x: (i) => tileOffsetsX[i] || 0,
        rotation: (i) => tileRotations[i] || 0,
        scale: 0.72,
        opacity: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transformOrigin: '50% 50%',
      });

      /* Initial Sequence Timeline */
      const initialTl = gsap.timeline({ delay: 0.5 });
      initialTl.fromTo(initialSequenceRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      initialTl.to(initialSequenceRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '+=1.5');

      /* Main Timeline */
      const EASE = 'power3.inOut';
      // Start main timeline after initial sequence finishes (0.5 + 0.8 + 1.5 + 0.6 = 3.4)
      const tl = gsap.timeline({ delay: 3.4 });

      // 1. Tiles reveal
      tl.to(tiles, {
        y: 0,
        x: 0,
        rotation: 0,
        opacity: 1,
        scale: 0.82,
        duration: 1.1,
        stagger: 0.06,
        ease: 'power3.out',
      });

      // 2. Small settle
      tl.to(tiles, {
        scale: 0.8,
        duration: 0.35,
        stagger: 0.04,
        ease: 'power2.out',
      }, '>-0.25');

      // 3. Strip collapses
      tl.to(strip, {
        gap: '0.75vw',
        duration: 1,
        ease: EASE,
      }, 1.5);

      // 4. Tiles scale to full size
      tl.to(tiles, {
        scale: 1,
        duration: 1,
        ease: EASE,
      }, '<');

      // 5. Hide all non-feature tiles
      const others = Array.from(tiles).filter((t) => t !== feature);
      tl.to(others, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        stagger: 0.1,
        ease: EASE,
      }, 2.5);

      // 6. Feature image scales up to fill the screen
      tl.to(feature, {
        scale: 15,
        duration: 1.5,
        ease: EASE,
      }, 3.5);

      // 7. Dark veil lifts
      tl.to(veil, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: EASE,
      }, 4.5);

      // 8. Fade out and hide preloader
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          // Re-enable scrolling
          document.body.style.overflow = '';
        }
      }, '+=1.0'); // Hold the final frame for 1 second before fading out

    }, containerRef);

    return () => {
      document.body.style.overflow = ''; // Cleanup on unmount
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.stage} ref={containerRef}>
      {/* Initial Sequence */}
      <div className={styles.initialSequence} ref={initialSequenceRef}>
        <img src="/images/logo-pln-indonesiapower.png" alt="PLN Indonesia Power" className={styles.logo} />
        <h2 className={styles.initialText}>PLN INDONESIA POWER UBP CILEGON</h2>
      </div>

      {/* Dark overlay */}
      <div className={styles.veil} ref={veilRef}></div>

      {/* Image strip */}
      <div className={styles.strip} ref={stripRef}>
        <figure className={styles.tile}>
          <img src="/img/1.jpg" alt="" />
        </figure>
        <figure className={styles.tile}>
          <img src="/img/2.jpg" alt="" />
        </figure>
        <figure className={styles.tile} ref={featureRef}>
          <img src="/img/3.jpg" alt="" />
        </figure>
        <figure className={styles.tile}>
          <img src="/img/4.jpg" alt="" />
        </figure>
        <figure className={styles.tile}>
          <img src="/img/5.jpg" alt="" />
        </figure>
      </div>
    </section>
  );
}
