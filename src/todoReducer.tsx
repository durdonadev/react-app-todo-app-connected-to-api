import _ from "lodash";

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
    const copy = _.cloneDeep(state);
    if (action.type === "INIT") {
        return action.payload;
    } else if (action.type === "ADD_TODO") {
        copy.push(action.payload);
        return copy;
    } else if (action.type === "UPDATE_TODO") {
        const { id, status } = action.payload;

        // const updatedTodos = state.map((todo) => {
        //     if (todo.id === id) {
        //         const copy = { ...todo };
        //         copy.status = status;
        //         return copy;
        //     }
        //     return todo;
        // });
        // return updatedTodos;

        for (let i = 0; i <= copy.length; i++) {
            const todo = copy[i];
            if (todo.id === id) {
                todo.status = status;
                break;
            }
        }
        return copy;
    } else if (action.type === "DELETE_TODO") {
        return copy.filter((todo) => todo.id !== action.payload.id);
    }
    return copy;
};
