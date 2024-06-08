import { MainLayout } from "@/layouts";
import useToastStore from "@/modules/toastInformation/store";
import useUserStore from "@/modules/userInformation/store";
import ToastMessage from "@/toast";
import s from "./Page.module.scss"
import { useEffect } from "react";

export default function Home() {

  return (
    <main>
      <MainLayout />
    </main>
  );
}
