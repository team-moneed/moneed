import { useEffect } from "react";

export default function SnackBar({
  message,
  setsnackbar,
  position,
  type
}: {
  message: string;
  setsnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  position: 'top' | 'bottom';
  type: 'normal' | 'action' | 'cancel';
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setsnackbar(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setsnackbar]);

  const snackbarTheme = {
    normal: "--moneed-gray-7",
    action: "--moneed-blue-light",
    cancel: "--moneed-red-light",
  };

  const snackbarText = {
    normal: "--moneed-white",
    action: "--moneed-blue",
    cancel: "--moneed-red",
  };

  return (
    <div
      className={`bg-[var(${snackbarTheme[type]})] fixed z-80 flex h-[4rem] py-[.8rem] w-[90%] max-w-[73rem] rounded-[1rem] opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] items-center justify-center 
      ${position === "top" ? "top-[4rem] animate-snackbar-top" : "bottom-[7rem] left-[2rem] lg:left-[35rem] animate-snackbar-bottom"}
      `}
    >
      <p className={`text-[1.4rem] font-[600] text-[var(${snackbarText[type]})]`}>
        {message}
      </p>
    </div>
  );
}
