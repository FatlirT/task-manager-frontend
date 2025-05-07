import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toTitleCase from "../utils/toTitleCase";

interface TaskFormProps {
    create: boolean;
    initialData?: Record<string, string>;
}

const TaskForm = ({ create, initialData }: TaskFormProps) => {
    const fields = ["id", "title", "description", "status", "due_date", "due_time"];
    const [formData, setFormData] = useState<Record<string, string>>(
        Object.fromEntries(fields.map(field => [field, ""]))
    );
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            const dateTime = initialData.due_datetime || "";
            const [date, time] = dateTime ? dateTime.split("T") : ["", ""];
            setFormData({
                ...initialData,
                due_date: date,
                due_time: time ? time.substring(0, 5) : "",
            });
        }
    }, [initialData]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const due_datetime = new Date(`${formData.due_date}T${formData.due_time}`).toISOString();
            const payload = { ...formData, due_datetime };

            const response = await fetch(`/api/tasks${create ? "" : `/${formData.id}`}`, {
                method: create ? "POST" : "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            if (response.ok) {
                const responseBody = await response.json();
                navigate(`/tasks/${responseBody.id}`);
            } else {
                console.error("Failed to submit form");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleCancel = () => {
        if (initialData) {
            const dateTime = initialData.due_datetime || "";
            const [date, time] = dateTime ? dateTime.split("T") : ["", ""];
            setFormData({
                ...initialData,
                due_date: date,
                due_time: time ? time.substring(0, 5) : "",
            });
        }
        setIsEditing(false);
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    return (
        <div className="max-w-3xl mx-auto mt-6 px-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        disabled={!isEditing}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* Status */}
                <div>
                    <fieldset className="space-y-2">
                        <legend className="text-sm font-medium text-gray-700 mb-1">Status</legend>
                        <div className="flex space-x-6">
                            {["pending", "in-progress", "complete"].map(status => (
                                <label key={status} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status}
                                        checked={formData.status === status}
                                        onChange={(e) => handleChange("status", e.target.value)}
                                        disabled={!isEditing}
                                        className="disabled:bg-gray-100"
                                    />
                                    {toTitleCase(status)}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>

                {/* Due Date/Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
                    <div className="flex gap-4">
                        <input
                            id="due_date"
                            name="due_date"
                            type="date"
                            min={getTomorrowDate()}
                            value={formData.due_date}
                            onChange={(e) => handleChange("due_date", e.target.value)}
                            disabled={!isEditing}
                            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                        />
                        <input
                            id="due_time"
                            name="due_time"
                            type="time"
                            value={formData.due_time}
                            onChange={(e) => handleChange("due_time", e.target.value)}
                            disabled={!isEditing}
                            className="w-1/2 border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex gap-4">
                    {(create || isEditing) ? (
                        <>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                            {!create && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
