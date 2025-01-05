import { useEffect } from "react";

export default function SnackBar({
  message,
  setsnackbar,
  position,
  type,
}: {
  message: string;
  setsnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  position: 'top' | 'bottom';
  type: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setsnackbar(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setsnackbar]);

  let backgroundColor = '';
  let textColor = '';

  if (type === 'normal') {
    backgroundColor = 'bg-[--moneed-gray-7]';
    textColor = 'text-[--moneed-white';
  } else if (type === 'action') {
    backgroundColor = 'bg-[--moneed-blue-light]';
    textColor = 'text-[--moneed-blue]';
  } else if (type === 'cancel') {
    backgroundColor = 'bg-[--moneed-red-light]';
    textColor = 'text-[--moneed-red]';
  }

  return (
    <div
      className={`fixed z-80 flex h-[4rem] py-[.8rem] w-[90%] max-w-[73rem] rounded-[1rem] opacity-[97%] shadow-[0px_2px_8px_rgba(0,0,0,0.25)] items-center justify-center 
      ${position === "top" ? "top-[4rem] animate-snackbar-top" : "bottom-[7rem] left-[2rem] lg:left-[35rem] animate-snackbar-bottom"}
      ${backgroundColor}`}
    >
      <p className={`text-[1.4rem] font-[600] ${textColor}`}>
        {message}
      </p>
    </div>
  );
}
