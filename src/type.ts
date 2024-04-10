export enum TodoItemLevel {
	low,
	mid,
	high,
}
export interface TodoItem {
	value: string;
	checked: boolean;
	createTime: number;
	level: TodoItemLevel;
	id: string;
}
