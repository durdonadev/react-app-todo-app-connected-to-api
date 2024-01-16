type Todo = {
    id: string;
    text: string;
    status: "TODO" | "INPROGRESS" | "DONE";
};

type TodoAction =
    | { type: "INIT"; payload: Todo[] }
    | { type: "ADD_TODO"; payload: Todo }
    | {
          type: "UPDATE_TODO";
          payload: { id: string; status: "TODO" | "INPROGRESS" | "DONE" };
      }
    | { type: "DELETE_TODO"; payload: { id: string } };

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    if (action.type === "INIT") {
        return action.payload;
    } else if (action.type === "ADD_TODO") {
        return [...state, action.payload];
    } else if (action.type === "UPDATE_TODO") {
        const { id, status } = action.payload;

        const updatedTodos = state.map((todo) => {
            if (todo.id === id) {
                const copy = { ...todo };
                copy.status = status;
                return copy;
            }
            return todo;
        });
        return updatedTodos;
    } else if (action.type === "DELETE_TODO") {
        return state.filter((todo) => todo.id !== action.payload.id);
    }

    return state;
};
