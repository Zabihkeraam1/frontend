import React, { FC } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GlobalWorkerOptions } from 'pdfjs-dist';

interface PDFViewerProps {
  fileUrl: string;
  onClose: () => void; // تابع برای بستن
}

const PDFViewer: FC<PDFViewerProps> = ({ fileUrl, onClose }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => (
          <div className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 border-b border-gray-300">
            {/* دکمه بستن */}
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-600 font-semibold transition-colors"
            >
              بستن
            </button>

            {/* ابزارهای پیش‌فرض */}
            <div className="flex items-center gap-2">
              <slots.GoToFirstPage />
              <slots.GoToPreviousPage />
              <slots.CurrentPageInput />
              <slots.NumberOfPages />
              <slots.GoToNextPage />
              <slots.GoToLastPage />
              <slots.ZoomOut />
              <slots.ZoomIn />
              <slots.EnterFullScreen />
            </div>
          </div>
        )}
      </Toolbar>
    ),
  });

  // تنظیم Worker
  GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex items-center justify-center z-50"
    >
      {/* PDF Viewer */}
      <div className="w-[65%] h-[90%] bg-white shadow-lg rounded-lg overflow-hidden">
        <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
