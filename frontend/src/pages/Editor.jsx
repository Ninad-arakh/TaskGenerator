import { useLocation } from "react-router-dom";
import { useState } from "react";
import { exportMarkdown } from "../utils/exportMarkdown";
import { toast } from "sonner";
import { toast } from "sonner";
import { editTaskApi, reorderTasksApi, groupTasksApi } from "../api/specApi";
import EditorHeader from "../components/editor/EditorHeader";
import EpicCard from "../components/editor/EpicCard";
import EditorActions from "../components/editor/EditorActions";

export default function Editor() {
  const { state } = useLocation();
  const [spec, setSpec] = useState(state?.data);

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No spec loaded.
      </div>
    );
  }

  function deleteTask(epicIndex, storyIndex, taskIndex) {
    const updated = structuredClone(spec);
    updated.output.epics[epicIndex].userStories[storyIndex].tasks.splice(
      taskIndex,
      1,
    );

    setSpec(updated);
    toast.success("Task removed");
  }

  const reorderTasks = async (epicIndex, storyIndex, newTasks) => {
    try {
      const updatedSpec = { ...spec };

      updatedSpec.output.epics[epicIndex].userStories[storyIndex].tasks =
        newTasks;

      setSpec(updatedSpec);

      // Flatten task IDs for backend
      const orderedTaskIds = newTasks.map((task) => task.id);

      await reorderTasksApi(spec._id, orderedTaskIds);

      toast.success("Tasks reordered");
    } catch (err) {
      toast.error("Failed to reorder tasks");
    }
  };

  const editTask = async (epicIndex, storyIndex, taskIndex, updates) => {
    try {
      const updatedSpec = { ...spec };
      const task =
        updatedSpec.output.epics[epicIndex].userStories[storyIndex].tasks[
          taskIndex
        ];

      Object.assign(task, updates);

      setSpec(updatedSpec);

      await editTaskApi(spec._id, task.id, updates);

      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const groupTasks = async (groups) => {
    try {
      await groupTasksApi(spec._id, groups);
      toast.success("Tasks grouped");
    } catch (err) {
      toast.error("Failed to group tasks");
    }
  };    

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-indigo-300/30 blur-3xl rounded-full -top-40 -left-40" />
        <div className="absolute w-[700px] h-[700px] bg-purple-300/30 blur-3xl rounded-full bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-10">
        <EditorHeader spec={spec} />

        {spec.output.epics.map((epic, epicIndex) => (
          <EpicCard
            key={epicIndex}
            epic={epic}
            epicIndex={epicIndex}
            deleteTask={deleteTask}
            reorderTasks={reorderTasks}
          />
        ))}

        <EditorActions spec={spec} />
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
