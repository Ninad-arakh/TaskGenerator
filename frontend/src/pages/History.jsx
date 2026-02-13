import { useEffect, useState } from "react";
import { getHistory } from "../api/specService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import HistoryHeader from "../components/history/HistoryHeader";
import HistoryCard from "../components/history/HistoryCard";
import HistoryEmpty from "../components/history/HistoryEmpty";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await getHistory();
        setHistory(res?.data || []);
      } catch (err) {
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  function openSpec(item) {
    navigate("/editor", { state: { data: item } });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-indigo-300/30 blur-3xl rounded-full -top-40 -left-40" />
        <div className="absolute w-[700px] h-[700px] bg-purple-300/30 blur-3xl rounded-full bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-10">
        <HistoryHeader />

        {loading && (
          <div className="text-center text-gray-500">Loading history...</div>
        )}

        {!loading && history.length === 0 && <HistoryEmpty />}

        {!loading && history.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {history.slice(0, 10).map((item) => (
              <HistoryCard
                key={item._id}
                item={item}
                onOpen={() => openSpec(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* 
  {
    "success": true,
    "data": [
        {
            "_id": "698e1823993ce6d6b67907e1",
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
                        ]
                    }
                ]
            },
            "createdAt": "2026-02-12T18:12:51.505Z",
            "updatedAt": "2026-02-12T18:12:51.505Z",
            "__v": 0
        },
        {
            "_id": "698e16f7993ce6d6b67907df",
            "goal": "To Build a fitness Tracker webapp",
            "users": "regular peoples",
            "constraints": "",
            "templateType": "web",
            "output": {
                "epics": [
                    {
                        "title": "User Account & Profile Management",
                        "description": "Enable users to register, log in, manage their personal information, and securely access their fitness data.",
                        "userStories": [
                            {
                                "title": "As a new user, I want to register for an account",
                                "description": "Users should be able to create a new account with email and password.",
                                "tasks": [
                                    {
                                        "title": "Design registration UI/UX",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Implement registration form and client-side validation",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Create user registration API endpoint",
                                        "type": "backend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Implement password hashing and user data storage",
                                        "type": "backend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Design users table schema",
                                        "type": "database",
                                        "priority": "high"
                                    }
                                ]
                            },
                            {
                                "title": "As a returning user, I want to log in to my account",
                                "description": "Users should be able to authenticate and access their dashboard.",
                                "tasks": [
                                    {
                                        "title": "Design login UI/UX",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Implement login form and client-side validation",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Create login API endpoint and JWT token generation",
                                        "type": "backend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Implement session management/JWT handling on frontend",
                                        "type": "frontend",
                                        "priority": "high"
                                    }
                                ]
                            },
                            {
                                "title": "As a user, I want to manage my profile information",
                                "description": "Users should be able to update their name, height, weight, and other personal details.",
                                "tasks": [
                                    {
                                        "title": "Design user profile page UI/UX",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Implement profile display and edit forms",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Create API endpoints for retrieving and updating user profile",
                                        "type": "backend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Update users table schema for additional profile fields",
                                        "type": "database",
                                        "priority": "medium"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "title": "Workout Logging & Management",
                        "description": "Allow users to log various types of workouts, view their history, and make edits or deletions.",
                        "userStories": [
                            {
                                "title": "As a user, I want to log a new workout",
                                "description": "Users should be able to record details for different workout types (e.g., run, weightlifting, cycling).",
                                "tasks": [
                                    {
                                        "title": "Design 'Add Workout' form UI/UX with dynamic fields for workout types",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Implement workout logging form and client-side validation",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Create API endpoint for adding a new workout",
                                        "type": "backend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Design workouts table schema (type, duration, distance, calories, etc.)",
                                        "type": "database",
                                        "priority": "high"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        "title": "Progress & Data Visualization",
                        "description": "Enable users to track their fitness progress over time through visual representations and summaries.",
                        "userStories": [
                            {
                                "title": "As a user, I want to view my progress with charts and graphs",
                                "description": "Users need visual representations of metrics like total distance, calories burned, or weight lifted over time.",
                                "tasks": [
                                    {
                                        "title": "Design dashboard/progress tracking UI with chart components",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Integrate charting library (e.g., Chart.js, Recharts)",
                                        "type": "frontend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Create API endpoints to aggregate workout data for charting",
                                        "type": "backend",
                                        "priority": "high"
                                    },
                                    {
                                        "title": "Develop database queries for generating aggregated data sets",
                                        "type": "database",
                                        "priority": "high"
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        "title": "Goal Setting & Tracking",
                        "description": "Allow users to set personal fitness goals and monitor their progress towards achieving them.",
                        "userStories": [
                            {
                                "title": "As a user, I want to set a new fitness goal",
                                "description": "Users should be able to define specific goals (e.g., run a 5k, lift 100kg, lose 5lbs).",
                                "tasks": [
                                    {
                                        "title": "Design 'Set Goal' form UI/UX with various goal types",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Implement goal creation form with client-side validation",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Create API endpoint for adding a new goal",
                                        "type": "backend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Design goals table schema (type, target value, start date, end date, status)",
                                        "type": "database",
                                        "priority": "medium"
                                    }
                                ]
                            },
                            {
                                "title": "As a user, I want to track my progress towards my goals",
                                "description": "Users need to see how close they are to reaching their set goals.",
                                "tasks": [
                                    {
                                        "title": "Design goals tracking dashboard widget",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                    {
                                        "title": "Implement progress bars or indicators for goals",
                                        "type": "frontend",
                                        "priority": "medium"
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
            "createdAt": "2026-02-12T18:07:51.950Z",
            "updatedAt": "2026-02-12T18:07:51.950Z",
            "__v": 0
        },
    ]
}

*/
