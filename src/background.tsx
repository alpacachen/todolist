import { FC, ReactNode } from "react"

export const Background:FC<{children: ReactNode}> = ({children}) => {
    return <div className="bg-#DFDDF1 h-100vh w-100vw flex items-center justify-around">
        {children}
    </div>
}