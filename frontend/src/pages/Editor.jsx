import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { exportMarkdown } from "../utils/exportMarkdown";
import { toast } from "sonner";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};

function SortableTask({ task, id, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityStyles = {
    high: "border-l-4 border-red-500 bg-red-50",
    medium: "border-l-4 border-yellow-500 bg-yellow-50",
    low: "border-l-4 border-green-500 bg-green-50",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-xl shadow-sm flex items-start gap-3 transition hover:shadow-md ${priorityStyles[task.priority]}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 mt-1"
      >
        ☰
      </div>

      <div className="flex-1">
        <div className="font-medium">{task.title}</div>

        <div className="flex gap-3 mt-2 text-xs text-gray-600">
          <span className="px-2 py-1 rounded bg-gray-200">
            {task.type.toUpperCase()}
          </span>

          <span
            className={`px-2 py-1 rounded font-semibold ${
              task.priority === "high"
                ? "text-red-600"
                : task.priority === "medium"
                ? "text-yellow-600"
                : "text-green-600"
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="text-red-500 text-sm hover:opacity-70"
      >
        ✕
      </button>
    </div>
  );
}

export default function Editor() {
  const { state } = useLocation();
  const [spec, setSpec] = useState(state?.data);

  const sensors = useSensors(useSensor(PointerSensor));

  if (!spec) return <div className="p-6">No spec loaded.</div>;

  function deleteTask(epicIndex, storyIndex, taskIndex) {
    const updated = structuredClone(spec);

    updated.output.epics[epicIndex]
      .userStories[storyIndex]
      .tasks.splice(taskIndex, 1);

    setSpec(updated);
    toast.success("Task removed");
  }

  function handleDragEnd(event, epicIndex, storyIndex) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const updated = structuredClone(spec);
    const tasks =
      updated.output.epics[epicIndex].userStories[storyIndex].tasks;

    const oldIndex = tasks.findIndex((_, i) => i.toString() === active.id);
    const newIndex = tasks.findIndex((_, i) => i.toString() === over.id);

    updated.output.epics[epicIndex].userStories[storyIndex].tasks =
      arrayMove(tasks, oldIndex, newIndex);

    setSpec(updated);
    toast.success("Task reordered");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="bg-white/70 backdrop-blur border rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">{spec.goal}</h1>

          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Users:</strong> {spec.users}</div>
            <div><strong>Template:</strong> {spec.templateType}</div>
            <div><strong>Constraints:</strong> {spec.constraints}</div>
          </div>
        </div>

        {/* EPICS */}
        {spec.output.epics.map((epic, epicIndex) => (
          <div
            key={epicIndex}
            className="bg-white/60 backdrop-blur border rounded-2xl p-6 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">{epic.title}</h2>
              <p className="text-gray-600 text-sm mt-1">
                {epic.description}
              </p>
            </div>

            {/* USER STORIES */}
            {epic.userStories.map((story, storyIndex) => {

              // 🔥 SORT HIGH → LOW
              const sortedTasks = useMemo(() => {
                return [...story.tasks].sort(
                  (a, b) =>
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
                );
              }, [story.tasks]);

              return (
                <div
                  key={storyIndex}
                  className="bg-gradient-to-r from-white to-slate-50 border rounded-xl p-5 space-y-4"
                >
                  <div>
                    <h3 className="font-semibold">{story.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {story.description}
                    </p>
                  </div>

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(e) =>
                      handleDragEnd(e, epicIndex, storyIndex)
                    }
                  >
                    <SortableContext
                      items={sortedTasks.map((_, i) => i.toString())}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {sortedTasks.map((task, taskIndex) => (
                          <SortableTask
                            key={taskIndex}
                            id={taskIndex.toString()}
                            task={task}
                            onDelete={() =>
                              deleteTask(
                                epicIndex,
                                storyIndex,
                                taskIndex
                              )
                            }
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              );
            })}
          </div>
        ))}

        {/* Footer */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              exportMarkdown(spec);
              toast.success("Markdown exported");
            }}
            className="bg-black text-white px-5 py-2 rounded-xl"
          >
            Export Markdown
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(
                JSON.stringify(spec, null, 2)
              );
              toast.success("JSON copied");
            }}
            className="border px-5 py-2 rounded-xl"
          >
            Copy JSON
          </button>
        </div>
      </div>
    </div>
  );
}

/* 

{
    "success": true,
    "data": {
        "goal": "i want to build a game store website",
        "users": "gamers",
        "constraints": "NA",
        "templateType": "Web",
        "output": {
            "epics": [
                {
                    "title": "Game Browsing & Discovery",
                    "description": "Allows users to find games easily, browse categories, and view game details to make informed purchasing decisions.",
                    "userStories": [
                        {
                            "title": "As a gamer, I want to view a list of available games so I can see what's offered.",
                            "description": "Provide a homepage or dedicated browse page displaying a curated or comprehensive list of games.",
                            "tasks": [
                                {
                                    "title": "Build main game listing component on homepage",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement API endpoint for fetching all games",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Design and create game data schema (title, genre, price, etc.)",
                                    "type": "database",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Populate initial game data for display",
                                    "type": "database",
                                    "priority": "low"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to search for games by title or genre so I can find specific games quickly.",
                            "description": "Enable users to input keywords to find matching games.",
                            "tasks": [
                                {
                                    "title": "Build search bar UI component",
                                    "type": "frontend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Implement search API endpoint with query parameters",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Optimize database for full-text search capabilities",
                                    "type": "database",
                                    "priority": "high"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to view detailed information about a game (description, screenshots, price) so I can decide if I want to buy it.",
                            "description": "Each game should have a dedicated page with comprehensive details.",
                            "tasks": [
                                {
                                    "title": "Design and build game detail page UI",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement API endpoint for fetching single game details by ID",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Add fields for game description, screenshots/videos, system requirements, etc., to game schema",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to filter games by genre, platform, or price so I can narrow down my choices.",
                            "description": "Provide interactive filters to refine the game list.",
                            "tasks": [
                                {
                                    "title": "Build filtering UI components (checkboxes, sliders, dropdowns)",
                                    "type": "frontend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Enhance game listing API with filter parameters",
                                    "type": "backend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Add indexes to database for filterable attributes (genre, platform, price)",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Shopping Cart & Checkout",
                    "description": "Enables users to add games to a cart, proceed through checkout, and complete purchases securely.",
                    "userStories": [
                        {
                            "title": "As a gamer, I want to add games to a shopping cart so I can purchase multiple items at once.",
                            "description": "Provide a mechanism to add selected games to a temporary cart.",
                            "tasks": [
                                {
                                    "title": "Add 'Add to Cart' button on game detail and listing pages",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement API endpoint to add an item to the user's cart",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Design cart data structure in database to store user ID, game ID, and quantity",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to view and manage items in my shopping cart so I can review my selections before purchasing.",
                            "description": "A dedicated cart page where users can see, modify, or remove items.",
                            "tasks": [
                                {
                                    "title": "Build shopping cart page UI with item list, quantities, and totals",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement API endpoints for viewing cart, updating quantities, and removing items",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Update cart data structure to support quantity updates and item removal logic",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to enter my payment information securely so I can complete a purchase.",
                            "description": "Integrate a secure payment gateway for transactions.",
                            "tasks": [
                                {
                                    "title": "Build checkout form UI for entering payment details",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Integrate with a third-party payment gateway API (e.g., Stripe, PayPal)",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Handle payment processing callbacks and secure transaction logging",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Design transaction and order status schema in database",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to receive a confirmation of my purchase so I can be sure my order went through.",
                            "description": "Display an order confirmation and send an email upon successful payment.",
                            "tasks": [
                                {
                                    "title": "Design and build order confirmation page UI",
                                    "type": "frontend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Implement email notification service for purchase confirmations",
                                    "type": "backend",
                                    "priority": "high"
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "User Account & Library",
                    "description": "Provides users with personal accounts, purchase history, and access to their owned games.",
                    "userStories": [
                        {
                            "title": "As a gamer, I want to register for an account so I can save my preferences and purchase history.",
                            "description": "Allow new users to create an account with email and password.",
                            "tasks": [
                                {
                                    "title": "Build user registration form UI",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement user registration API endpoint with password hashing",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Design user schema in database (email, password hash, etc.)",
                                    "type": "database",
                                    "priority": "high"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to log in and out of my account so I can access my personalized features.",
                            "description": "Provide secure login and logout functionality.",
                            "tasks": [
                                {
                                    "title": "Build login/logout UI components",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement login/logout API endpoints with session/token management",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Securely store user session/authentication tokens",
                                    "type": "backend",
                                    "priority": "high"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to view my game library so I can access and download games I've purchased.",
                            "description": "A dedicated section where users can see all games they own.",
                            "tasks": [
                                {
                                    "title": "Build user library page UI to display owned games",
                                    "type": "frontend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Implement API endpoint to fetch games owned by the logged-in user",
                                    "type": "backend",
                                    "priority": "high"
                                },
                                {
                                    "title": "Link user purchases to their game library in the database",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        },
                        {
                            "title": "As a gamer, I want to view my past orders so I can track my purchase history.",
                            "description": "A page listing all previous transactions and their details.",
                            "tasks": [
                                {
                                    "title": "Build order history page UI",
                                    "type": "frontend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Implement API endpoint to fetch user's past orders and their statuses",
                                    "type": "backend",
                                    "priority": "medium"
                                },
                                {
                                    "title": "Ensure order history records are linked to the user's account",
                                    "type": "database",
                                    "priority": "medium"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "_id": "698e1823993ce6d6b67907e1",
        "createdAt": "2026-02-12T18:12:51.505Z",
        "updatedAt": "2026-02-12T18:12:51.505Z",
        "__v": 0
    }
}


*/
