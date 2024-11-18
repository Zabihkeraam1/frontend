// import React, { FC } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import '@react-pdf-viewer/full-screen/lib/styles/index.css';
// import '@react-pdf-viewer/search/lib/styles/index.css';
// import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
// import { searchPlugin} from '@react-pdf-viewer/search';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // ایمپورت pdfjs و GlobalWorkerOptions
// import { GlobalWorkerOptions } from 'pdfjs-dist';

// interface PDFViewerProps {
//   fileUrl: string;
// }

// const PDFViewer: FC<PDFViewerProps> = ({ fileUrl }) => {
//   const fullScreenPluginInstance = fullScreenPlugin();
//   const searchPluginInstance = searchPlugin();
//   const zoomPluginInstance = zoomPlugin();
//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     sidebarTabs: () => [],
//   });

//   // آدرس Worker را به صورت مستقیم تنظیم می‌کنیم
//   GlobalWorkerOptions.workerSrc = '/public/pdf.worker.min.js';

//   return (
//     <div className="pdf-viewer-container">
//       <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
//         <Viewer
//           fileUrl={fileUrl}
//           plugins={[
//             fullScreenPluginInstance,
//             searchPluginInstance,
//             zoomPluginInstance,
//             defaultLayoutPluginInstance,
//           ]}
//         />
//       </Worker>
//     </div>
//   );
// };

// export default PDFViewer;

import React, { FC } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GlobalWorkerOptions } from 'pdfjs-dist';

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: FC<PDFViewerProps> = ({ fileUrl }) => {
  const fullScreenPluginInstance = fullScreenPlugin();
  const searchPluginInstance = searchPlugin();
  const zoomPluginInstance = zoomPlugin();

  // تنظیم پلاگین برای غیرفعال کردن دانلود و باز کردن فایل
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* اینجا ابزارهای نوار ابزار را به صورت JSX رندر می‌کنیم */}
            {/* <slots.ToggleSidebarButton />  دکمه باز و بسته کردن نوار کناری */}
            <slots.GoToFirstPage />
            <slots.GoToPreviousPage />
            <slots.CurrentPageInput />
            <slots.NumberOfPages />
            <slots.GoToNextPage />
            <slots.GoToLastPage />
            <slots.ZoomOut />
            <slots.ZoomIn />
            <slots.EnterFullScreen />
            {/* حذف دکمه‌های دانلود و باز کردن فایل */}
            {/* <slots.Download /> */}
            {/* <slots.Open /> */}
          </div>
        )}
      </Toolbar>
    ),
  });

  // آدرس Worker را به صورت مستقیم تنظیم می‌کنیم
  GlobalWorkerOptions.workerSrc = '/public/pdf.worker.min.js';

  return (
    <div className="pdf-viewer-container" style={{ height: '100vh', position: 'relative' }}>
      <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
        <Viewer
          fileUrl={fileUrl}
          plugins={[
            fullScreenPluginInstance,
            searchPluginInstance,
            zoomPluginInstance,
            defaultLayoutPluginInstance,
          ]}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
