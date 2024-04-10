import { FC } from "react";
import { useData } from "./context";
import { Badge, Button, Checkbox, Popover } from "antd";
import { TodoItem, TodoItemLevel } from "./type";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { DeleteFilled } from "@ant-design/icons";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ListItemDescription: FC<{ item: TodoItem }> = ({ item }) => {
	const { check, changeLevel, deleteItem } = useData();
	return (
		<div className="flex gap-4">
			<HappyProvider>
				<Checkbox checked={item.checked} onChange={(e) => check(item.id, e.target.checked)} />
			</HappyProvider>
			<span className={classNames(item.checked && "decoration-line-through", "truncate flex-1 w-0")}>{item.value}</span>
			<span className="w-0 overflow-hidden group-hover:w-auto">
				<Button size="small" type="text" onClick={() => deleteItem(item.id)} icon={<DeleteFilled />} />
			</span>
			<Popover
				placement="right"
				trigger={"click"}
				content={
					<div className="flex gap-4">
						<Button
							onClick={() => {
								changeLevel(item.id, TodoItemLevel.high);
							}}
							size="small"
							type="text"
						>
							<Badge color="red" />
						</Button>
						<Button
							onClick={() => {
								changeLevel(item.id, TodoItemLevel.mid);
							}}
							size="small"
							type="text"
						>
							<Badge color="yellow" />
						</Button>
						<Button
							onClick={() => {
								changeLevel(item.id, TodoItemLevel.low);
							}}
							size="small"
							type="text"
						>
							<Badge color="blue" />
						</Button>
					</div>
				}
			>
				<Button className="flex h-min items-center shrink-0" size="small" type="text">
					{item.level == TodoItemLevel.high && <Badge color="red" />}
					{item.level == TodoItemLevel.mid && <Badge color="yellow" />}
					{item.level == TodoItemLevel.low && <Badge color="blue" />}
				</Button>
			</Popover>
		</div>
	);
};

export const TodoList = () => {
	const { list } = useData();
	return (
		<DragDropContext onDragEnd={console.log}>
			<Droppable droppableId="droppable">
				{(provided) => <div
					className="overflow-y-auto"
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{list.map((item, index) => (
						<Draggable key={item.id} draggableId={item.id} index={index}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									key={item.id}
									className={classNames("hover:bg-gray-100 px-4 py-2 user-select-none", snapshot.isDragging && 'bg-gray-100')}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									style={provided.draggableProps.style}
								>
									<ListItemDescription item={item} />
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}
				</div>
				}
			</Droppable>
		</DragDropContext>
	);
};
