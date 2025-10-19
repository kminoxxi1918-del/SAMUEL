import React, { useState, useRef, useEffect, useCallback } from 'react';
import CloseIcon from './icons/CloseIcon';
import CameraIcon from './icons/CameraIcon';
import SwitchCameraIcon from './icons/SwitchCameraIcon';

interface CameraModalProps {
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);

  const startCamera = useCallback(async (mode: 'user' | 'environment') => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please check permissions.");
      onClose();
    }
  }, [stream, onClose]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoInputs = devices.filter(device => device.kind === 'videoinput');
      if (videoInputs.length > 1) {
        setHasMultipleCameras(true);
      }
    });

    startCamera(facingMode);

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitchCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    startCamera(newFacingMode);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        onCapture(imageDataUrl);
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fadeIn">
      <div className="relative w-full max-w-lg p-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full rounded-lg"
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8">
          {hasMultipleCameras && (
            <button
              onClick={handleSwitchCamera}
              className="text-white bg-gray-800 bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-colors"
              aria-label="Switch camera"
            >
              <SwitchCameraIcon />
            </button>
          )}

          <button
            onClick={handleCapture}
            className="text-white bg-brand-gold p-5 rounded-full ring-4 ring-white ring-opacity-50 hover:bg-opacity-90 transition-all transform hover:scale-105"
            aria-label="Take picture"
          >
            <CameraIcon />
          </button>
        </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-brand-gold transition-colors"
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CameraModal;