import { Routes, Route, Navigate } from "react-router-dom";
import { TasksList, TasksNew, TasksViewEdit } from "./pages/tasks";

import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function Router() {
    return (

        <Routes>
            {/* Private */}

            { /* Tasks*/}
            <Route path="/tasks" element={<ProtectedRoute><TasksList /></ProtectedRoute>} />
            <Route path="/tasks/new" element={<ProtectedRoute><TasksNew /></ProtectedRoute>} />
            <Route path="/tasks/:id" element={<ProtectedRoute><TasksViewEdit /></ProtectedRoute>} />

            { /* Taskers */}

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>

    );
}
