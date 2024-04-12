import { FC, useCallback, useState, KeyboardEvent, useRef } from "react";
import { useData } from "./context";
import { Badge, Button, Checkbox, Input, Popover, Tooltip } from "antd";
import { TodoItem, TodoItemLevel } from "./type";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { CalendarOutlined, CarryOutOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ListItemDescription: FC<{ item: TodoItem }> = ({ item }) => {
	const { check, changeLevel, changeValue, changeDaily, deleteItem } = useData();
	const [editing, setEditing] = useState(false)
	const typing = useRef(false)
	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (typing.current) {
			return
		}
		switch (e.key) {
			case "Enter":
			case "Escape":
				// @ts-expect-error value
				changeValue(item.id, e.target.value);
				setEditing(false)
				break
		}
	}, [changeValue, item.id])
	return (
		<div className="flex gap-4 h-8 items-center">
			<HappyProvider>
				<Checkbox checked={item.checked} onChange={(e) => check(item.id, e.target.checked)} />
			</HappyProvider>
			{editing && <Input
				autoComplete="off"
				autoCapitalize="off"
				autoCorrect="off"
				defaultValue={item.value}
				onCompositionStart={() => (typing.current = true)}
				onCompositionEnd={() => (typing.current = false)}
				onKeyDown={onKeyDown} autoFocus onBlur={() => setEditing(false)} />}
			{!editing && <span onDoubleClick={() => setEditing(true)} className={classNames(item.checked && "decoration-line-through", "color-gray truncate flex-1 w-0")}>{item.value}</span>}
			{!editing && item.daily && <Tooltip title='每日任务，0 点重置'><CarryOutOutlined className="color-gray" /></Tooltip>}
			{!editing && <Popover
				placement="right"
				trigger={"click"}
				content={
					<div className="flex items-center flex-col gap-2">
						<div className="flex gap-2">
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
						<Tooltip title='删除'>
							<Button className="color-gray" size="small" type="text" onClick={() => deleteItem(item.id)} icon={<DeleteOutlined />} />
						</Tooltip>
						<Tooltip title={item.daily ? '取消每日任务' : '每日任务'}>
							<Button className="color-gray" size="small" type="text" onClick={() => changeDaily(item.id, !item.daily)} icon={item.daily ? <CarryOutOutlined /> : <CalendarOutlined />} />
						</Tooltip>
					</div>
				}
			>
				<Button className="flex h-min items-center shrink-0" size="small" type="text">
					{item.level == TodoItemLevel.high && <Badge color="red" />}
					{item.level == TodoItemLevel.mid && <Badge color="yellow" />}
					{item.level == TodoItemLevel.low && <Badge color="blue" />}
				</Button>
			</Popover>}
		</div>
	);
};

export const TodoList = () => {
	const { list, onDragEnd } = useData();
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => <div
					className="overflow-y-auto -mx-60px"
					{...provided.droppableProps}
					ref={provided.innerRef}
				>
					{list.map((item, index) => (
						<Draggable key={item.id} draggableId={item.id} index={index}>
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									key={item.id}
									className={classNames("px-60px group py-2 user-select-none", snapshot.isDragging && 'shadow rounded-4px bg-white')}
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
