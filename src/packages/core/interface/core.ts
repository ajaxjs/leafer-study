// 定义快捷按键类型
export type IHotkey = {
    hotkey: string;   // 快捷按键
    label: string;     // 快捷按键描述
    handler: (e: KeyboardEvent) => void; // 快捷按键触发事件(为空时，类初始化时中绑定)
}

export type ICoreOptions = {
    id: string;
}