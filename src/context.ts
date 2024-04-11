import constate from "constate";
import { useLocalStorage } from "usehooks-ts";
import { cloneDeep, isNil } from "lodash-es";
import { TodoItem, TodoItemLevel } from "./type";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";

const LOCAL_KEY = "TDL";

const generateItem = (value: string): TodoItem => ({
	value,
	id: uuidv4(),
	level: TodoItemLevel.mid,
	checked: false,
});

const useHook = () => {
	const [list, setList] = useLocalStorage<TodoItem[]>(LOCAL_KEY, []);
	const save = (value: string) => {
		setList((l) => [generateItem(value), ...(l ?? [])]);
	};
	const check = (id: string, checked: boolean) => {
		const res = cloneDeep(list);
		const target = res.find((o) => o.id == id);
		if (target) {
			target.checked = checked;
			setList(res);
		}
	};
	const total = list.length;
	const checkedLength = list.filter((o) => o.checked).length;
	const deleteItem = (id: string) => {
		setList((r) => r.filter((o) => o.id !== id));
	};
	const changeLevel = (id: string, level: TodoItemLevel) => {
		const res = cloneDeep(list);
		const target = res.find((o) => o.id == id);
		if (target) {
			target.level = level;
			setList(res);
		}
	};

	const onDragEnd = useCallback((result: DropResult) => {
		const { source, destination } = result
		const sourceIndex = source.index
		const destinationIndex = destination?.index
		if (isNil(destinationIndex)) {
			return
		}
		const res = cloneDeep(list)
		const [removed] = res.splice(sourceIndex, 1)
		res.splice(destinationIndex, 0, removed)
		setList(res)
	}, [list, setList])

	return { save, deleteItem, list, changeLevel, check, total, checkedLength, onDragEnd };
};
export const [DataProvider, useData] = constate(useHook);
