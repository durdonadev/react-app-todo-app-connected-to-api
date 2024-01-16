import React, { useEffect, useReducer, useState } from "react";
import { todoApi } from "./api/todoApi";
import { Form } from "./Form";
import { Todos } from "./Todos";
import "./App.css";
import { todoReducer } from "./todoReducer";

const App: React.FC = () => {
    const [todoInputValue, setTodoInputValue] = useState<string>("");
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        todoApi
            .getAll()
            .then((response) => {
                dispatch({
                    type: "INIT",
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleTodoInputChange = (value: string): void => {
        setTodoInputValue(value);
    };

    const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoInputValue.length < 3) {
            return;
        }

        todoApi
            .create(todoInputValue)
            .then((response) => {
                setTodoInputValue("");
                dispatch({
                    type: "ADD_TODO",
                    payload: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateStatus = (
        id: string,
        status: "TODO" | "INPROGRESS" | "DONE"
    ): void => {
        todoApi
            .updateStatus(id, status)
            .then((_) => {
                dispatch({
                    type: "UPDATE_TODO",
                    payload: {
                        id: id,
                        status: status
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteTodo = (id: string): void => {
        todoApi
            .deleteOne(id)
            .then(() => {
                dispatch({
                    type: "DELETE_TODO",
                    payload: {
                        id: id
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isSubmitButtonDisabled = !todoInputValue.length;

    return (
        <main>
            <h1>Todo App</h1>

            <Form
                isSubmitButtonDisabled={isSubmitButtonDisabled}
                todoValue={todoInputValue}
                handleTodoValue={handleTodoInputChange}
                createTodo={createTodo}
            />
            <Todos
                todos={todos}
                updateStatus={updateStatus}
                deleteTodo={deleteTodo}
            />
        </main>
    );
};

export default App;
