import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export function ImageZoom({ src, alt, className = "", imageClassName = "" }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const uniqueId = React.useId();

  return (
    <>
      {/* Thumbnail */}
      <motion.div
        layoutId={`container-${src}-${uniqueId}`}
        onClick={() => setIsOpen(true)}
        className={`cursor-zoom-in relative group overflow-hidden ${className}`}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <motion.img
          layoutId={`img-${src}-${uniqueId}`}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <Icon icon="lucide:zoom-in" className="text-white w-6 h-6 scale-75 group-hover:scale-100 transition-transform duration-300" />
        </div>
      </motion.div>

      {/* Modal Overlay & Expanded Image */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/20 backdrop-blur-sm pointer-events-auto"
              transition={{ duration: 0.2 }}
            />

            {/* Image Container */}
            <motion.div
              layoutId={`container-${src}-${uniqueId}`}
              className="relative z-10 w-full max-w-6xl h-fit max-h-[90vh] rounded-xs overflow-hidden shadow-2xl border border-border/50 bg-secondary/10 pointer-events-auto"
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <motion.img
                layoutId={`img-${src}-${uniqueId}`}
                src={src}
                alt={alt}
                className="w-full h-full object-contain object-center cursor-zoom-out"
                onClick={() => setIsOpen(false)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="absolute top-4 right-4 p-3 bg-background/50 hover:bg-background rounded-full border border-border/50 backdrop-blur-md transition-all shadow-xl"
              >
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
