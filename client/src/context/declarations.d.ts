// src/declarations.d.ts

declare module 'react-qr-code' {
    import { FC } from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
    }
  
    const QRCode: FC<QRCodeProps>;
  
    export default QRCode;
  }
  