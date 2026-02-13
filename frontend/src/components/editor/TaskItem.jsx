import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconGripVertical,
  IconTrash,
  IconCode,
  IconServer,
  IconDatabase,
  IconCheck,
  IconEdit,
} from "@tabler/icons-react";

export default function TaskItem({ id, task, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const typeIcon = {
    frontend: <IconCode size={16} />,
    backend: <IconServer size={16} />,
    database: <IconDatabase size={16} />,
  };

  const priorityColor = {
    high: "text-red-600 bg-red-50 border-red-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    low: "text-green-600 bg-green-50 border-green-200",
  };

  function handleSave() {
    if (title.trim() && title !== task.title) {
      onEdit({ title });
    }
    setEditing(false);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-white border rounded-xl p-4 shadow-sm flex items-start gap-4 transition hover:shadow-lg hover:-translate-y-1"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 mt-1"
      >
        <IconGripVertical size={18} />
      </div>

      <div className="flex-1 space-y-2">
        {editing ? (
          <div className="flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-2 py-1 text-sm w-full"
            />
            <button onClick={handleSave}>
              <IconCheck size={18} className="text-green-600" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-800">{task.title}</div>
            <button
              onClick={() => setEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition"
            >
              <IconEdit size={16} />
            </button>
          </div>
        )}

        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 text-indigo-600 border border-indigo-100">
            {typeIcon[task.type]}
            {task.type}
          </span>

          <span
            className={`px-2 py-1 rounded border font-semibold ${priorityColor[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        {task.group && (
          <span className="px-2 py-1 rounded bg-purple-50 text-purple-600 border border-purple-100 text-xs">
            {task.group}
          </span>
        )}
      </div>

      <button
        onClick={() => {
          const groupName = prompt("Enter group name");
          if (groupName) {
            onEdit({ group: groupName });
          }
        }}
        className="text-xs text-indigo-500 hover:underline"
      >
        Group
      </button>

      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition"
      >
        <IconTrash size={18} />
      </button>
    </div>
  );
}
