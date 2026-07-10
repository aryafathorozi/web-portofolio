import { toast as sonnerToast } from "sonner";
import React from "react";
import { CheckCircle2, AlertTriangle, Trash2, RefreshCw } from "lucide-react";

const createCyberToast = (title: string, description: string, icon: React.ReactNode, borderColor: string) => {
    return sonnerToast.custom(() =>
        React.createElement(
            "div",
            {
                style: { borderLeft: `3px solid ${borderColor}` },
                className: "w-full bg-[#030712]/95 text-white p-4 rounded-xl flex items-start gap-3 shadow-2xl border border-white/5"
            },
            [
                React.createElement("div", { key: "icon", className: "mt-0.5" }, icon),
                React.createElement("div", { key: "text", className: "flex-1 space-y-0.5" }, [
                    React.createElement("h4", { key: "title", className: "font-mono font-bold text-xs tracking-wider uppercase text-gray-200" }, title),
                    React.createElement("p", { key: "desc", className: "font-mono text-[10px] text-gray-400 leading-relaxed" }, description),
                ])
            ]
        )
    );
};

export const toast = {
    success: (message: string, description = "Database node securely deployed.") =>
        createCyberToast(message, description, React.createElement(CheckCircle2, { size: 16, className: "text-cyan-400" }), "#06b6d4"),
    update: (message: string, description = "System entry synchronized successfully.") =>
        createCyberToast(message, description, React.createElement(RefreshCw, { size: 16, className: "text-amber-400" }), "#fbbf24"),
    delete: (message: string, description = "Data reference purged from matrix.") =>
        createCyberToast(message, description, React.createElement(Trash2, { size: 16, className: "text-rose-400" }), "#f43f5e"),
    error: (message: string, description = "Process terminated due to exception.") =>
        createCyberToast(message, description, React.createElement(AlertTriangle, { size: 16, className: "text-rose-500" }), "#e11d48")
};