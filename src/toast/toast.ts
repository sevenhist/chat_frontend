import useToastStore, { MessageType } from "@/modules/toastInformation/store";
import { FC } from "react";

// 'use client'
export const toast = ({type, message, id}: MessageType) => {
    const { addMessage } = useToastStore.getState();
    addMessage({type, message, id});
}
