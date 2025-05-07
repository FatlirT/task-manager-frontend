import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import { fetchRecordById } from "../../api/fetchRecordById";

export default function TasksViewEdit() {
    const { id } = useParams<{ id: string; }>();
    const [error, setError] = useState<string | null>(null);
    const [task, setTask] = useState<Record<string, string> | null>(null);

    useEffect(() => {
        async function fetchTask() {
            try {
                if (!id) return;
                const fetchedTask = await fetchRecordById("tasks", id);
                setTask(fetchedTask.task);
            } catch (err: any) {
                setError(err.message);
            }
        }
        fetchTask();
    }, [id]);

    if (error) return <p className="text-red-600 text-center py-4">Error: {error}</p>;
    if (!task) return <p className="text-center py-4">No task found.</p>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="mb-4 flex justify-between items-center">
                <Link to="/tasks" className="text-blue-600 hover:underline text-sm">
                    ← Back to Tasks
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">{task.title}</h1>
            <TaskForm create={false} initialData={task} />


            {/* Cancel Button : isEditing === true; ===> submit wired to form action, cancel wired to disable form style */}

        </div>
    );
}
