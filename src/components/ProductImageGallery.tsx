
import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import VideoControls from "@/components/product/VideoControls";
import { GalleryThumbnails } from "@/components/product/GalleryThumbnails";
import ImageGalleryControls from "@/components/product/ImageGalleryControls";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ArrowUpToLine } from "lucide-react";
import InfoBand from "@/components/product/InfoBand";

interface ProductImageGalleryProps {
  images: string[];
  videoIndices?: number[];
}

interface TouchPosition {
  x: number;
  y: number;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  images, 
  videoIndices = [1]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isRotated, setIsRotated] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null);
  const [thumbnailViewMode, setThumbnailViewMode] = useState<"row" | "grid">("row");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isFullscreenMode, setIsFullscreenMode] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState<number | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [compareIndex, setCompareIndex] = useState(0);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [viewHistory, setViewHistory] = useState<number[]>([0]);
  const [imageFilter, setImageFilter] = useState<string>("none");
  const [showOtherColors, setShowOtherColors] = useState<boolean>(false);
  const [showAllControls, setShowAllControls] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"default" | "immersive">("default");

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartPosition = useRef<TouchPosition | null>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [openedThumbnailMenu, setOpenedThumbnailMenu] = useState<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedTime, setBufferedTime] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const preloaded = await Promise.all(
        images.map((src) => {
          return new Promise<string>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src);
          });
        })
      );
      setPreloadedImages(preloaded);
    };

    preloadImages();
  }, [images]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      videoRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime || 0);
    const onLoadedMetadata = () => setDuration(video.duration || 0);
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBufferedTime(video.buffered.end(video.buffered.length - 1));
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('progress', onProgress);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('progress', onProgress);
    };
  }, [videoRef.current]);

  const onApiChange = useCallback((api: CarouselApi | null) => {
    if (!api) return;

    setApi(api);
    setCurrentIndex(api.selectedScrollSnap());

    api.on("select", () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      setIsRotated(0);
      setIsFlipped(false);
      setZoomLevel(1);

      setViewHistory(prev => [...prev, index]);
    });
  }, []);

  const undoLastView = useCallback(() => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop();
      const lastIndex = newHistory[newHistory.length - 1];

      if (api) {
        api.scrollTo(lastIndex);
      }

      setViewHistory(newHistory);
    }
  }, [api, viewHistory]);

  const applyFilter = useCallback((filter: string) => {
    setImageFilter(filter);

    toast({
      title: "Filter Applied",
      description: `Image filter: ${filter}`,
      duration: 2000,
    });
  }, []);

  const resetEnhancements = useCallback(() => {
    setIsRotated(0);
    setIsFlipped(false);
    setZoomLevel(1);
    setImageFilter("none");

    toast({
      title: "Image Reset",
      description: "All image modifications have been reset",
      duration: 2000,
    });
  }, []);

  const shareImage = useCallback((index: number) => {
    const image = images[index];
    if (navigator.share) {
      navigator.share({
        title: "Check out this product image",
        text: "I found this amazing product image!",
        url: image,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(image);
      toast({
        title: "Image URL Copied",
        description: "Image link copied to clipboard for sharing",
        duration: 2000,
      });
    }
  }, [images]);

  const toggleCompareMode = useCallback(() => {
    setShowCompareMode(prev => !prev);
  }, []);

  const toggleImmersiveView = useCallback(() => {
    setViewMode(prev => prev === "default" ? "immersive" : "default");

    toast({
      title: viewMode === "default" ? "Immersive View" : "Default View",
      description: viewMode === "default" ? "Showing image without distractions" : "Showing standard gallery view",
      duration: 2000,
    });
  }, [viewMode]);

  const handleThumbnailClick = useCallback((index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  }, [api]);

  const handlePrevious = useCallback(() => {
    if (api) api.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    if (api) api.scrollNext();
  }, [api]);

  const handleRotate = useCallback(() => {
    setIsRotated(prev => (prev + 90) % 360);
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const downloadImage = useCallback((index: number) => {
    const image = images[index];
    const link = document.createElement('a');
    link.href = image;
    link.download = `product-image-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Image downloaded",
      description: `Image ${index + 1} has been downloaded`,
      duration: 2000,
    });
  }, [images]);

  const copyImageUrl = useCallback((index: number) => {
    const image = images[index];
    navigator.clipboard.writeText(image);

    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);

    toast({
      title: "Image URL copied",
      description: "Image URL has been copied to clipboard",
      duration: 2000,
    });
  }, [images]);

  const toggleThumbnailViewMode = useCallback(() => {
    setThumbnailViewMode(prev => prev === "row" ? "grid" : "row");
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreenMode(prev => !prev);

    if (!isFullscreenMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isFullscreenMode]);

  const handleThumbnailMenuToggle = useCallback((index: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenedThumbnailMenu(index);
    } else if (openedThumbnailMenu === index) {
      setOpenedThumbnailMenu(null);
    }
  }, [openedThumbnailMenu]);

  const handleMenuAction = useCallback((e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    action();
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode(prev => !prev);
  }, [focusMode]);

  const handleImageClick = useCallback(() => {
    if (focusMode) {
      setFocusMode(false);
    } else {
      toggleFullscreen();
    }
  }, [focusMode, toggleFullscreen]);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      const newTime = Math.min((videoRef.current.currentTime || 0) + 10, duration);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max((videoRef.current.currentTime || 0) - 10, 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreenVideo = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenMode) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreenMode, toggleFullscreen]);

  useEffect(() => {
    if (autoScrollEnabled && api) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 3000);

      setAutoScrollInterval(interval);

      return () => {
        clearInterval(interval);
      };
    } else if (!autoScrollEnabled && autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }

    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    };
  }, [autoScrollEnabled, api]);

  const toggleAutoScroll = useCallback(() => {
    setAutoScrollEnabled(prev => !prev);
  }, [autoScrollEnabled]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col bg-transparent">
      <div className="relative w-full aspect-square overflow-hidden">
        <Carousel
          className="w-full h-full"
          opts={{
            loop: true,
          }}
          setApi={onApiChange}
        >
          <CarouselContent className="h-full">
            {images.map((source, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="flex h-full w-full items-center justify-center overflow-hidden relative">
                  {videoIndices.includes(index) ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        ref={videoRef}
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        className="w-full h-full object-contain cursor-pointer"
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          aspectRatio: '1/1', 
                          objectFit: 'cover' 
                        }}
                        onClick={toggleVideo}
                        playsInline
                        loop
                        muted={isMuted}
                        autoPlay
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="pointer-events-auto h-full w-full flex items-end">
                          <VideoControls
                            isPlaying={isPlaying}
                            isMuted={isMuted}
                            volume={volume}
                            onPlayPause={toggleVideo}
                            onMuteToggle={handleMuteToggle}
                            onVolumeChange={handleVolumeChange}
                            currentTime={currentTime}
                            duration={duration}
                            bufferedTime={bufferedTime}
                            onSeek={handleSeek}
                            onSkipForward={handleSkipForward}
                            onSkipBackward={handleSkipBackward}
                            onFullscreenToggle={handleFullscreenVideo}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      ref={index === currentIndex ? imageRef : undefined}
                      src={source}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-contain transition-transform"
                      style={{
                        transform: `
                          rotate(${isRotated}deg)
                          ${isFlipped ? 'scaleX(-1)' : ''}
                          scale(${zoomLevel})
                        `,
                        transition: "transform 0.2s ease-out",
                        filter: imageFilter !== "none"
                          ? imageFilter === "grayscale" ? "grayscale(1)"
                            : imageFilter === "sepia" ? "sepia(0.7)"
                              : imageFilter === "brightness" ? "brightness(1.2)"
                                : imageFilter === "contrast" ? "contrast(1.2)"
                                  : "none"
                          : "none"
                      }}
                      draggable={false}
                      onClick={handleImageClick}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {!videoIndices.includes(currentIndex) && (
            <ImageGalleryControls
              currentIndex={currentIndex}
              totalImages={images.length}
              isRotated={isRotated}
              isFlipped={isFlipped}
              autoScrollEnabled={autoScrollEnabled}
              focusMode={focusMode}
              isPlaying={videoIndices.includes(currentIndex) && isPlaying}
              showControls={!(focusMode || (videoIndices.includes(currentIndex) && isPlaying))}
              onRotate={handleRotate}
              onFlip={handleFlip}
              onToggleAutoScroll={toggleAutoScroll}
              onToggleFocusMode={toggleFocusMode}
            />
          )}
        </Carousel>
      </div>

      <InfoBand />

      {images.length > 1 && (
        <div className="mt-1 w-full">
          <GalleryThumbnails
            images={images}
            currentIndex={currentIndex}
            onThumbnailClick={handleThumbnailClick}
            isPlaying={isPlaying}
            videoIndices={videoIndices}
          />
        </div>
      )}

      {isFullscreenMode && !videoIndices.includes(currentIndex) && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in"
          onClick={toggleFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={toggleFullscreen}
          >
            <ArrowUpToLine className="h-5 w-5" />
          </button>
          <img 
            src={images[currentIndex]} 
            alt={`Product fullscreen image ${currentIndex + 1}`} 
            className="max-w-[90%] max-h-[90%] object-contain"
            style={{
              transform: `
                rotate(${isRotated}deg)
                ${isFlipped ? 'scaleX(-1)' : ''}
                scale(${zoomLevel})
              `,
              filter: imageFilter !== "none"
                ? imageFilter === "grayscale" ? "grayscale(1)"
                  : imageFilter === "sepia" ? "sepia(0.7)"
                    : imageFilter === "brightness" ? "brightness(1.2)"
                      : imageFilter === "contrast" ? "contrast(1.2)"
                        : "none"
                : "none"
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <ImageGalleryControls
            currentIndex={currentIndex}
            totalImages={images.length}
            isRotated={isRotated}
            isFlipped={isFlipped}
            autoScrollEnabled={autoScrollEnabled}
            focusMode={focusMode}
            variant="fullscreen"
            onRotate={(e) => {
              if (e) e.stopPropagation();
              handleRotate();
            }}
            onFlip={(e) => {
              if (e) e.stopPropagation();
              handleFlip();
            }}
            onToggleAutoScroll={toggleAutoScroll}
            onToggleFocusMode={toggleFocusMode}
            onPrevious={(e) => {
              if (e) e.stopPropagation();
              handlePrevious();
            }}
            onNext={(e) => {
              if (e) e.stopPropagation();
              handleNext();
            }}
            onDownload={(e) => {
              if (e) e.stopPropagation();
              downloadImage(currentIndex);
            }}
          />
        </div>
      )}

      {isFullscreenMode && videoIndices.includes(currentIndex) && (
        <div 
          ref={fullscreenRef}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in"
          onClick={toggleFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={toggleFullscreen}
          >
            <ArrowUpToLine className="h-5 w-5" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              className="max-w-[90%] max-h-[90%] object-contain"
              onClick={toggleVideo}
              playsInline
              loop
              muted={isMuted}
              autoPlay
              style={{ background: "black" }}
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 pointer-events-none">
              <div className="pointer-events-auto h-full w-full flex items-end">
                <VideoControls
                  isPlaying={isPlaying}
                  isMuted={isMuted}
                  volume={volume}
                  onPlayPause={toggleVideo}
                  onMuteToggle={handleMuteToggle}
                  onVolumeChange={handleVolumeChange}
                  currentTime={currentTime}
                  duration={duration}
                  bufferedTime={bufferedTime}
                  onSeek={handleSeek}
                  onSkipForward={handleSkipForward}
                  onSkipBackward={handleSkipBackward}
                  onFullscreenToggle={handleFullscreenVideo}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;