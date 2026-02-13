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
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = parseInt(active.id.split("-")[2]);
    const newIndex = parseInt(over.id.split("-")[2]);

    const newTasks = arrayMove(story.tasks, oldIndex, newIndex);
    reorderTasks(epicIndex, storyIndex, newTasks);
  }

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border rounded-2xl p-6 space-y-5">
      <div className="flex items-start gap-2">
        <IconBook size={18} className="text-purple-500 mt-1" />
        <div>
          <h3 className="font-semibold text-gray-800">{story.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{story.description}</p>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={story.tasks.map((_, i) => `${epicIndex}-${storyIndex}-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {story.tasks.map((task, taskIndex) => (
              <TaskItem
                key={taskIndex}
                id={`${epicIndex}-${storyIndex}-${taskIndex}`}
                task={task}
                onDelete={() => deleteTask(epicIndex, storyIndex, taskIndex)}
                onEdit={(updates) =>
                  editTask(epicIndex, storyIndex, taskIndex, updates)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
