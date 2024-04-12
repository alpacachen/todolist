import { useRef, useState } from "react"
import { useData } from "./context"
import { Create } from "./create"
import { TodoList } from "./todo-list"
import { useEventListener } from "usehooks-ts"

export const Popup = () => {
    const { width, setWidth } = useData()
    const [start, setStart] = useState<number>()

    const resizeRef = useRef<HTMLDivElement>(null)
    useEventListener('mousedown', (e) => {
        setStart(e.clientX)
    }, resizeRef)
    useEventListener('mousemove', (e) => {
        if (start) {
            setWidth((w) => w + (e.movementX) * 2)
            setStart(s => s ?? 0 + e.movementX)
        }
    })
    useEventListener('mouseup', () => {
        setStart(undefined)
    })
    return <div style={{ width, boxShadow: '0px 25px 55px -15px rgba(161.34259, 154.28384, 217.81248, 0.46)' }} className="h-80% rounded-25px bg-white px-60px py-35px gap-4 box-border flex relative flex-col">
        <Create />
        <TodoList />
        <div
            ref={resizeRef}
            style={{ height: 'calc(100% - 60px)' }} className="w-5px -right-5px cursor-col-resize absolute top-0 bottom-0 m-auto "></div>
    </div>
}