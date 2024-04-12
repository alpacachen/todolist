export enum TodoItemLevel {
	low,
	mid,
	high,
}
export interface TodoItem {
	value: string;
	daily?: boolean;
	completedTime?: number;
	checked: boolean;
	level: TodoItemLevel;
	id: string;
}
