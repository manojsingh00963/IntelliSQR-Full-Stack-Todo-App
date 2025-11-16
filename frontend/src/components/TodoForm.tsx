import React from "react";
import { useForm } from "react-hook-form";


const TodoForm: React.FC<{ onSubmit: (d: any) => void }> = ({ onSubmit }) => {
    const { register, handleSubmit, reset } = useForm();


    const submit = (data: any) => {
        onSubmit(data);
        reset();
    };


    return (
        <form onSubmit={handleSubmit(submit)} className="flex gap-2 mb-4">
            <input
                {...register("title")}
                placeholder="Todo title"
                className="flex-1 border p-2 rounded"
            />
            <input
                {...register("description")}
                placeholder="Description"
                className="flex-1 border p-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add
            </button>
        </form>
    );
};


export default TodoForm;