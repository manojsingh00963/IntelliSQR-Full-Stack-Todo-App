import React from "react";


const TodoList: React.FC<any> = ({ todos, onUpdate, onDelete, onToggle }) => {
    return (
        <ul className="space-y-3">
            {todos?.map((t: any) => (
                <li
                    key={t._id}
                    className="border p-4 rounded flex justify-between items-center bg-gray-50"
                >
                    <div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => onToggle(t._id)}
                                className="h-4 w-4"
                            />
                            <strong className={t.completed ? "line-through text-gray-500" : "text-gray-900"}>
                                {t.title}
                            </strong>
                        </div>


                        {t.description && (
                            <p className="text-gray-600 text-sm ml-6">{t.description}</p>
                        )}
                    </div>


                    <div className="flex gap-3">
                        <button
                            onClick={() => onUpdate(t._id, { title: t.title + " (edited)" })}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </button>


                        <button
                            onClick={() => onDelete(t._id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};


export default TodoList;