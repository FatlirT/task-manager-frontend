import { Link } from "react-router-dom";
import TaskForm from "../../components/TaskForm";

export default function TasksNew() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <Link
                    to="/tasks"
                    className="text-blue-600 hover:underline font-medium text-sm"
                >
                    ← Back to Tasks
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">Create New Task</h1>

            <TaskForm create={true} />
        </div>
    );
}
