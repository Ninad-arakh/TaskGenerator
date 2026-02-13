import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import TaskItem from "./TaskItem";
import { IconBook } from "@tabler/icons-react";

export default function StoryCard({
  story,
  epicIndex,
  storyIndex,
  deleteTask,
  reorderTasks,
  editTask,
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const validTasks = Array.isArray(story?.tasks)
    ? story.tasks.filter((task) => task && task.id)
    : [];

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = validTasks.findIndex((t) => t.id === active.id);
    const newIndex = validTasks.findIndex((t) => t.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newTasks = arrayMove(validTasks, oldIndex, newIndex);

    reorderTasks(epicIndex, storyIndex, newTasks);
  }

  return (
    <div className="bg-linear-to-br from-white to-slate-50  border border-gray-400/50 rounded-2xl md:p-6 space-y-5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={validTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {validTasks.map((task, index) => (
              <TaskItem
                key={task.id}
                id={task.id}
                task={task}
                onDelete={() => deleteTask(epicIndex, storyIndex, task.id)}
                onEdit={(updates) =>
                  editTask(epicIndex, storyIndex, task.id, updates)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
