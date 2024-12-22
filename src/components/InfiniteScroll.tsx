import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";

interface Props {
    isLastPage: boolean; //마지막 페이지인지
    fetch: () => void; // 페이지 하단에 도달시 실행할 함수
}

const InfiniteScroll = (props: Props) => {
    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 30
        ) {
            if (!props.isLastPage) {
                props.fetch();
            }
        }
    }, [props]);

    const debounce = (func: Function, delay: number) => {
        let timeoutId: any = null;
        return (...args: any[]) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    useEffect(() => {
        const debouncedHandleScroll = debounce(handleScroll, 300); // 300ms 지연
        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="w-full flex justify-center py-4">
            {props.isLastPage ? (
                <span className="text-white">--End--</span>
            ) : (
                <BeatLoader loading={true} color="#C0FF00" />
            )}
        </div>
    );
};

export default InfiniteScroll;