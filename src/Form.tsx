import React from "react";

type FormProps = {
    isSubmitButtonDisabled: boolean;
    todoValue: string;
    handleTodoValue: (value: string) => void;
    createTodo: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: React.FC<FormProps> = (props) => {
    const { isSubmitButtonDisabled, todoValue, handleTodoValue, createTodo } =
        props;
    return (
        <form onSubmit={createTodo}>
            <input
                placeholder="What is in your mind?"
                value={todoValue}
                onChange={(e) => handleTodoValue(e.target.value)}
            />
            <input
                value="Add Todo"
                type="submit"
                disabled={isSubmitButtonDisabled}
            />
        </form>
    );
};
