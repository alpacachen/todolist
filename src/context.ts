import constate from "constate";
import { useLocalStorage } from "usehooks-ts";
import { cloneDeep, isNil } from "lodash-es";
import { TodoItem, TodoItemLevel } from "./type";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { isBefore, startOfToday } from 'date-fns'

const LOCAL_KEY = "TDL";

const generateItem = (value: string): TodoItem => ({
	value,
	id: uuidv4(),
	level: TodoItemLevel.mid,
	checked: false,
});

const useHook = () => {
	useEffect(() => {
		// 每次检查列表，如果是每日任务，且完成时间是昨天，那么就重置
		const list = JSON.parse(window.localStorage.getItem(LOCAL_KEY) ?? "[]")
		const res = list.map((o: TodoItem) => {
			if (o.daily && o.completedTime) {
				if (isBefore(o.completedTime, startOfToday())) {
					return {
						...o,
						checked: false,
						completedTime: undefined
					}
				}
				return o
			}
			return o
		})
		window.localStorage.setItem(LOCAL_KEY, JSON.stringify(res))
	}, [])
	const [list, setList] = useLocalStorage<TodoItem[]>(LOCAL_KEY, []);
	const save = (value: string) => {
		setList((l) => [generateItem(value), ...(l ?? [])]);
	};
	const check = (id: string, checked: boolean) => {
		const res = cloneDeep(list);
		const target = res.find((o) => o.id == id);
		if (target) {
			target.checked = checked;
			if (target.daily) {
				target.completedTime = Date.now()
			}
			setList(res);
		}
	};
	const total = list.length;
	const checkedLength = list.filter((o) => o.checked).length;
	const deleteItem = (id: string) => {
		setList((r) => r.filter((o) => o.id !== id));
	};
	const changeProp = useCallback(<K extends keyof TodoItem>(id: string, prop: K, value: TodoItem[K]) => {
		const res = cloneDeep(list);
		const target = res.find((o) => o.id == id);
		if (target) {
			target[prop] = value;
			setList(res);
		}
	}, [list, setList]);
	const changeLevel = (id: string, level: TodoItemLevel) => {
		changeProp(id, 'level', level)
	};
	const changeValue = (id: string, value: string) => {
		changeProp(id, 'value', value)
	}

	const changeDaily = (id: string, value: boolean) => {
		changeProp(id, 'daily', value)
	}

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

	return { save, deleteItem, list, changeValue, changeDaily, changeLevel, check, total, checkedLength, onDragEnd };
};
export const [DataProvider, useData] = constate(useHook);
