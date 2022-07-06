import useWindowSize from "./useWindowSize";

const RESPONSIVE_SIZES = Object.freeze({
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
});

type ResponsiveReturnTypes = {
    isXS: boolean;
    isSM: boolean;
    isMD: boolean;
    isLG: boolean;
    isXL: boolean;
    isXXL: boolean;
};

function useResponsive(): ResponsiveReturnTypes {
    const { width } = useWindowSize();

    if (width === undefined) {
        return {
            isXS: false,
            isSM: false,
            isMD: false,
            isLG: false,
            isXL: false,
            isXXL: false,
        };
    }

    return {
        isXS: RESPONSIVE_SIZES.SM > width,
        isSM: RESPONSIVE_SIZES.SM <= width && RESPONSIVE_SIZES.MD > width,
        isMD: RESPONSIVE_SIZES.MD <= width && RESPONSIVE_SIZES.LG > width,
        isLG: RESPONSIVE_SIZES.LG <= width && RESPONSIVE_SIZES.XL > width,
        isXL: RESPONSIVE_SIZES.XL <= width && RESPONSIVE_SIZES.XXL > width,
        isXXL: RESPONSIVE_SIZES.XXL <= width,
    };
}

export default useResponsive;
