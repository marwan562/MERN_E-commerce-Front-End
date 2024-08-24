"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getNetworkAction } from "@/toolkit/Network/networkSlice";
import { Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const InternetConnectionProvider = ({ children }: { children: ReactNode }) => {
  const toastIdRef = useRef<string | undefined>(undefined);
  const { dismiss, toast } = useToast();
  const { network } = useAppSelector(({ network }) => network);
  const dispatch = useAppDispatch();
  const [wasOffline, setWasOffline] = useState(false);

  function addToastOffline() {
    if (toastIdRef.current) {
      dismiss(toastIdRef.current);
    }
    toastIdRef.current = toast({
      title: (
        <div className="flex items-center">
          <WifiOff className="mr-2" />
          <span className="first-letter:capitalize">You{"'"}re Offline.</span>
        </div>
      ),
      description: "Please make sure your internet connection.",
      action: <ToastAction altText="Go to schedule to undo">Ok</ToastAction>,
    })?.id as string;
  }

  function addToastOnline() {
    if (toastIdRef.current) {
      dismiss(toastIdRef.current);
    }
    toastIdRef.current = toast({
      title: (
        <div className="flex items-center">
          <Wifi className="mr-2" />
          <span className="first-letter:capitalize">You{"'"}re Online.</span>
        </div>
      ),
      description: "Please check your internet connection regularly.",
      action: <ToastAction altText="Go to schedule to undo">Ok</ToastAction>,
      duration: 10000,
    })?.id as string;
  }

  useEffect(() => {
    const handleOffline = () => dispatch(getNetworkAction(false));
    const handleOnline = () => dispatch(getNetworkAction(true));

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [dispatch]);

  useEffect(() => {
    if (network === false) {
      setWasOffline(true); 
      addToastOffline();
    } else if (network === true && wasOffline) {
      addToastOnline();
      setWasOffline(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, wasOffline]);

  return <>{children}</>;
};

export default InternetConnectionProvider;
