import { ReactNode } from "react";

type DropdownProps = {
    children: ReactNode;
    firsttext?: string;
    secondtext?: string;
    firstevent?: () => void;
    secondevent: () => void;
};

const Dropdown = ({ children, firsttext, secondtext, firstevent, secondevent }: DropdownProps) => {
    return (
        <div className="relative">
            <div className="absolute top-0 right-10 z-50 bg-white shadow-custom rounded-[.8rem]">
                <div className="px-[4.4rem] py-[3.6rem]">
                    <div className="cursor-pointer flex items-center mb-[2.4rem] whitespace-nowrap" onClick={firstevent}>
                        <div
                            className="overflow-hidden aspect-[1/1] w-[1.8rem] mr-[.6rem] "
                        >
                            <img src="/src/assets/icon/icon-scissors.svg" alt="Scissors Icon" className="w-full h-full object-cover" />
                        </div>
                        <div>{firsttext}</div>
                    </div>
                    <div className="cursor-pointer flex items-center" onClick={secondevent}>
                        <div
                            className="overflow-hidden aspect-[1/1] w-[1.8rem] mr-[.6rem]"
                        >
                            <img src="/src/assets/icon/icon-trashcan.svg" alt="Trashcan Icon" className="w-full h-full object-cover" />
                        </div>
                        <div>{secondtext}</div>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
