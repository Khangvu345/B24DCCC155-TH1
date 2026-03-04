declare module TodoList {
	export interface TodoItem {
		id: number;
		tieuDe: string;
		hoanThanh: boolean;
	}

	export interface State {
		danhSachTodo: TodoItem[];
	}
}
