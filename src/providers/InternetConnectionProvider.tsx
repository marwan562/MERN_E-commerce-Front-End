"use client";

import { ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getNetworkAction } from "@/toolkit/Network/networkSlice";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const InternetConnecationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const addToastOffline = () => {
    toast({
      title: (
        <div className="flex items-center">
          <WifiOff className="mr-2" />
          <span className="first-letter:capitalize">You&apos;re Offline.</span>
        </div>
      ),
      description: "Please make sure you'r internet connection.",
      action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      duration: 8000,
    });
  };

  function addToastOnline() {
    toast({
      title: (
        <div className="flex items-center">
          <Wifi className="mr-2" />
          <span className="first-letter:capitalize">You&apos;re Online.</span>
        </div>
      ),
      description: "Please evry time check internet connection.",
      action: <ToastAction altText="Goto schedule to undo">Ok</ToastAction>,
      duration: 8000,
    });
  }

  useEffect(() => {
    window.addEventListener("offline", () => {
      addToastOffline();
      dispatch(getNetworkAction(false));
      push("/internet");
    });

    window.addEventListener("online", () => {
      addToastOnline();
      dispatch(getNetworkAction(true));
    });

    return () => {
      removeEventListener("online", () => {
        dispatch(getNetworkAction(true));
      });
      removeEventListener("offline", () => {
        dispatch(getNetworkAction(false));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <>{children}</>;
};

export default InternetConnecationProvider;
