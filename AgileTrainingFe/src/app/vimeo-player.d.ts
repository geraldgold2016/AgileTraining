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

    export default class Player extends EventEmitter {
        constructor(element: HTMLElement | string, options?: VimeoPlayerOptions);
        play(): Promise<void>;
        pause(): Promise<void>;
        setCurrentTime(seconds: number): Promise<number>;
        getCurrentTime(): Promise<number>;
        setVolume(volume: number): Promise<number>;
        getVolume(): Promise<number>;
        on(event: 'timeupdate', callback: (data: VimeoEvent) => void): void;
    }
}
