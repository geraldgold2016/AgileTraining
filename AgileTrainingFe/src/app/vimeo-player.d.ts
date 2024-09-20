declare module '@vimeo/player' {
    import { EventEmitter } from 'events';

    interface VimeoPlayerOptions {
        id?: number;
        url?: string;
        width?: number;
        loop?: boolean;
        autoplay?: boolean;
        autopause?: boolean;
        muted?: boolean;
    }

    interface VimeoEvent {
        duration: number;
        percent: number;
        seconds: number;
    }

    export default class Player extends EventEmitter 
    {
        constructor(element: HTMLElement | string, options?: VimeoPlayerOptions);
        play(): Promise<void>;
        pause(): Promise<void>;
        setCurrentTime(seconds: number): Promise<number>;
        getCurrentTime(): Promise<number>;
        setPlaybackRate(speed: number): Promise<number>;
        getDuration(): Promise<number>; 
        getPaused(): Promise<boolean>
        setVolume(volume: number): Promise<number>;
        getVolume(): Promise<number>;
        setMuted(muted: boolean): Promise<boolean>;
        getMuted(): Promise<number>;
        requestFullscreen(): Promise<void>;
        exitFullscreen(): Promise<void>;
        getFullscreen(): Promise<boolean>;
        on(event: 'loaded', callback: (data: VimeoEvent) => void): void;
        on(event: 'ended', callback: (data: VimeoEvent) => void): void;
        on(event: 'timeupdate', callback: (data: VimeoEvent) => void): void;
    }
}
