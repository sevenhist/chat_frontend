import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export enum MessageEnum {
    info = 'information',
    error = 'error',
    success = 'success'
}

export interface MessageType {
    type: MessageEnum,
    message: string,
    id: string
}

interface ToastState {
    messages: MessageType[],
    addMessage: (message: MessageType) => void,
    deleteMessage: (message: MessageType) => void,
    setMessagesToNull: () => void
}

const useToastStore = create<ToastState>()(devtools(immer((set, get) => ({
    messages: [],
    setMessagesToNull: () => set((state) => {
        state.messages = [];
    }),
    deleteMessage: (newMessage: MessageType) => set((state) => {
        state.messages = state.messages.filter((message) => message.id !== newMessage.id);
    }),
    addMessage: (newMessage: MessageType) => {
        set((state) => {
            state.messages = [newMessage, ...state.messages];
        });

        const deleteTimer = setTimeout(() => {
            get().deleteMessage(newMessage)
        }, 2000); 
        return () => clearTimeout(deleteTimer);
    },
})), { name: 'toastStore', version: 1 }))

export default useToastStore