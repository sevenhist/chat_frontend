'use client'
import React, { useState, useEffect, FC } from "react";
import s from "./ToastMessage.module.scss";
import useToastStore, { MessageType } from "@/modules/toastInformation/store";

const ToastMessage: FC<MessageType> = ({type, message, id}) => {
  const [hideMessage, setHideMessage] = useState(false);
  
  // useEffect(() => {
  //   const showTimer = setTimeout(() => {
  //     setHideMessage(true); 
  //   }, 1600); 

  //   return () => clearTimeout(showTimer);
  // }, [type, message, id]);
  
  return (
    <div className={`${hideMessage ? s.not_show : ''} ${s.show} ${s[`show-${type}`]}`}>
      <div className={s[`toast-${type}`]}>{message}</div>
    </div>
  );
};

export default ToastMessage;
