import { Link, useNavigate } from "react-router-dom";
import { fetchPaginatedRecords } from "../../api/fetchPaginatedRecords";
import patchTaskStatus from "../../api/updateRecordByID";
import toTitleCase from "../../utils/toTitleCase";
import { useEffect, useState } from "react";

export default function TasksList() {
    const [error, setError] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Record<string, any>[] | null>(null);
    const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadTasks() {
            try {
                const fetchedTasks = await fetchPaginatedRecords("tasks");
                setTasks(fetchedTasks.tasks);
            } catch (err: any) {
                setError(err.message);
            }
        }
        loadTasks();
    }, []);

    const handleStatusChange = (id: string) => {
        setEditingStatusId(id);
        setNewStatus(""); // reset selection to default
    };

    const confirmStatusChange = async (id: string) => {
        try {
            await patchTaskStatus(id, newStatus);
            setTasks(prevTasks =>
                prevTasks?.map(task =>
                    task.id === id ? { ...task, status: newStatus } : task
                ) || []
            );
            setEditingStatusId(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (error) return <p className="text-red-500 font-semibold">Error: {error}</p>;
    if (!tasks) return <p className="text-gray-600">Loading tasks...</p>;

    const fields = tasks.length > 0 ? Object.keys(tasks[0]) : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tasks</h1>
                <Link
                    to="new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Create New Task
                </Link>
            </div>

            {tasks.length === 0 ? (
                <p className="text-gray-600">There are currently no tasks.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                {fields.map(field => (
                                    <th
                                        key={field}
                                        className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                                    >
                                        {toTitleCase(field)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr
                                    key={task.id}
                                    className="border-t hover:bg-gray-50 transition"
                                    onClick={() => navigate(`/tasks/${task.id}`)}
                                >
                                    {fields.map(field => (
                                        <td
                                            key={field}
                                            className={`px-4 py-2 text-sm ${field !== "description" ? "whitespace-nowrap" : ""
                                                }`}
                                        >
                                            {field === "status" ? (
                                                editingStatusId === task.id ? (
                                                    <div
                                                        className="flex items-center gap-2"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <select
                                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                                            value={newStatus || task.status}
                                                            onChange={e => setNewStatus(e.target.value)}
                                                        >
                                                            <option value="Not Started">Not Started</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                        <button
                                                            type="button"
                                                            onClick={() => confirmStatusChange(task.id)}
                                                            className="text-green-600 text-lg font-bold"
                                                        >
                                                            ✓
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="flex items-center gap-2"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            handleStatusChange(task.id);
                                                        }}
                                                    >
                                                        <span>{task.status}</span>
                                                        <span className="text-blue-500 text-sm underline">
                                                            Edit
                                                        </span>
                                                    </div>
                                                )
                                            ) : (
                                                <span>{task[field]}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
