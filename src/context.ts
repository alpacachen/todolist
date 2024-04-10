import constate from "constate";
import { useLocalStorage } from "usehooks-ts";
import { cloneDeep } from "lodash-es";
import { TodoItem, TodoItemLevel } from "./type";
import { v4 as uuidv4 } from "uuid";

const LOCAL_KEY = "TDL";

const generateItem = (value: string): TodoItem => ({
	value,
	id: uuidv4(),
	createTime: new Date().getTime(),
	level: TodoItemLevel.mid,
	checked: false,
});

const useHook = () => {
	const [list, setList] = useLocalStorage<TodoItem[]>(LOCAL_KEY, []);
	const save = (value: string) => {
		setList((l) => [...(l ?? []), generateItem(value)]);
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
	const sortedUnCheckedList = list.filter((o) => !o.checked).sort((a, b) => b.createTime - a.createTime);
	const sortedCheckedList = list.filter((o) => o.checked).sort((a, b) => b.createTime - a.createTime);
	const sortedList = [...sortedUnCheckedList, ...sortedCheckedList];
	return { save, deleteItem, list, changeLevel, check, total, checkedLength, sortedList };
};
export const [DataProvider, useData] = constate(useHook);
