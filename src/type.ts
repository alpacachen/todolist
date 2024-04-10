export enum TodoItemLevel {
	low,
	mid,
	high,
}
export interface TodoItem {
	value: string;
	checked: boolean;
	level: TodoItemLevel;
	id: string;
}
