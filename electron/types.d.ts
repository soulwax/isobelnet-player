// File: electron/types.d.ts

export interface ElectronAPI {
  isElectron: boolean;
  platform: string;
  send: (channel: string, data: unknown) => void;
  receive: (channel: string, func: (...args: unknown[]) => void) => void;
  onMediaKey: (callback: (key: string) => void) => void;
  removeMediaKeyListener: () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
