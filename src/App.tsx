import React, { useEffect, useState } from "react";
import { todoApi } from "./api/todoApi";
import { Form } from "./Form";
import { Todos } from "./Todos";
import "./App.css";

type Todo = {
    id: string;
    text: string;
    status: "TODO" | "INPROGRESS" | "DONE";
};

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoInputValue, setTodoInputValue] = useState<string>("");

    useEffect(() => {
        todoApi
            .getAll()
            .then((response) => {
                setTodos(response.data);
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
                setTodos((prevTodos) => {
                    return [...prevTodos, response.data];
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
                setTodos((prevTodos) => {
                    const copyTodos = prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, status } : todo
                    );
                    return copyTodos;
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
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== id)
                );
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
