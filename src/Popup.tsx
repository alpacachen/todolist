import { Create } from "./create"
import { TodoList } from "./todo-list"

export const Popup = () => {
    return <div style={{boxShadow: '0px 25px 55px -15px rgba(161.34259, 154.28384, 217.81248, 0.46)'}} className="w-518px h-80% rounded-25px bg-white px-60px py-35px gap-4 box-border flex flex-col">
        <Create />
        <TodoList />
    </div>
}