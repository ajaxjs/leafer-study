import type { App } from 'leafer-ui'
import type { IHotkey } from './core'

// 插件实例
export declare class IPluginTempl {
    constructor(app: App, options?: IPluginOption);
    static propName: string;
    static events: string[];
    static expose: string[];
    static hotkeys: IHotkey[];
    hotkeyEvent?: (name: string, e: KeyboardEvent) => void;
    hookImportBefore?: (...args: unknown[]) => Promise<unknown>;
    hookImportAfter?: (...args: unknown[]) => Promise<unknown>;
    hookSaveBefore?: (...args: unknown[]) => Promise<unknown>;
    hookSaveAfter?: (...args: unknown[]) => Promise<unknown>;
    hookTransform?: (...args: unknown[]) => Promise<unknown>;
    app?: App;
    [propName: string]: any;
}

export declare interface IPluginOption {
    [propName: string]: unknown | undefined;
}

export declare class IPluginClass2 extends IPluginTempl {
    constructor();
}
// 插件class
export declare interface IPluginClass {
    new(app: App, options?: IPluginOption): IPluginClass2;
}

export type IPluginMap = Map<string, [IPluginTempl, IPluginOption | undefined]>