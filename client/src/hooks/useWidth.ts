import { useEffect, useState } from "react"

export const useResponsivity = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth > 768 ? false : true)

    useEffect(() => {
        const changeWidth = () => {
            if (window.innerWidth > 768) {
                setIsMobile(false)
            } else {
                setIsMobile(true)
            }
        };

        window.addEventListener("resize", changeWidth);
    })

    return isMobile;
}