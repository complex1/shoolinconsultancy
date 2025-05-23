'use client';

import React from 'react';
import Image from 'next/image';

interface FilePreviewProps {
  file: {
    filepath: string;
    mimetype: string;
    filename: string;
    altText?: string | null;
    title?: string | null;
  };
  className?: string;
  height?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, className = 'h-[250px]', height }) => {
  const { filepath, mimetype, filename, altText, title } = file;
  
  // Check file type
  const isImage = mimetype.startsWith('image/');
  const isPDF = mimetype === 'application/pdf';
  const isVideo = mimetype.startsWith('video/');
  const isAudio = mimetype.startsWith('audio/');
  
  // Get file extension to display
  const getFileExtension = () => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE';
  };
  
  // Get icon based on mimetype
  const getFileIcon = () => {
    if (isPDF) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (isVideo) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (isAudio) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };
  
  return (
    <div className={`bg-gray-100 relative ${className}`} style={height ? { height } : {}}>
      {isImage ? (
        <Image 
          src={filepath}
          alt={altText || title || filename}
          className="object-contain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : isPDF ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
          <div className="flex flex-col items-center p-4">
            {getFileIcon()}
            <span className="mt-2 text-sm font-medium text-gray-600 truncate max-w-full">
              PDF Document
            </span>
            <a 
              href={filepath} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 px-4 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
            >
              Preview PDF
            </a>
          </div>
        </div>
      ) : isVideo ? (
        <div className="w-full h-full">
          <video 
            controls
            className="w-full h-full object-contain bg-black"
          >
            <source src={filepath} type={mimetype} />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : isAudio ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
          <div className="flex flex-col items-center p-4 w-full">
            {getFileIcon()}
            <span className="mt-2 mb-4 text-sm font-medium text-gray-600 truncate max-w-full">
              Audio File
            </span>
            <audio 
              controls
              className="w-3/4 mt-3"
            >
              <source src={filepath} type={mimetype} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200">
          <div className="flex flex-col items-center p-4">
            {getFileIcon()}
            <span className="mt-2 text-sm font-medium text-gray-600 truncate max-w-full">
              {getFileExtension()}
            </span>
            <a 
              href={filepath} 
              download={filename}
              className="mt-3 px-4 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              Download File
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
