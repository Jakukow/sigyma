# Sigyma - Your Ultimate Fitness Hub

**Sigyma** is an innovative fitness application blending modern technology with advanced workout planning. Designed for fitness enthusiasts of all levels, Sigyma empowers users to plan, track, and analyze their training sessions while discovering and reviewing gyms.

![Logo](https://i.ibb.co/56NQXkG/logo-04.jpg)

## 📱 Screenshots

**Dashboard**
![Dashboard](https://i.ibb.co/5KjDtHt/Dashboard.png)

**Exercise List**
![Exercise List](https://i.ibb.co/YWk0w3S/Exercise-List.png)

<div align="center">
  <img width="600" alt="Additional Features" src="https://github.com/user-attachments/assets/9d11a828-982b-45f3-9faf-5d74fb145724" />
</div>

## 🚀 Key Features

Sigyma offers a wide range of features to support physical development and foster a fitness community:

* **📋 Advanced Workout Plans:** Create and edit personalized training plans split by days of the week and specific sets.
* **🏋️ Exercise Database:** Build your own custom exercise list with descriptions, measurement units, and support for video/image attachments.
* **📈 Progress Tracking:**
    * Log workout sessions (weight, reps).
    * Automatic tracking of **Personal Bests** for every exercise.
    * **Weekly Streaks** to monitor training consistency and discipline.
* **🗺️ Gym Map & Reviews:**
    * Interactive map locating gyms (powered by Mapbox/Leaflet).
    * Detailed rating system across 4 categories: **Comfort, Cleanliness, Equipment, Atmosphere**.
* **🎯 Goals & Challenges:** Set weight and repetition goals for specific exercises with visual progress tracking.
* **👥 Community:** Compete with friends on leaderboards and track their activity.

## 🛠 Tech Stack

The project is built on a modern web stack ensuring high performance and scalability.

### Frontend
* **Framework:** [Next.js 14](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
* **UI Components:** Shadcn/UI (based on `@radix-ui`)
* **Animations:** Framer Motion
* **Maps:** React Leaflet / Mapbox GL / MapLibre
* **State Management:** Zustand + TanStack Query

### Backend & Database
* **Database:** PostgreSQL (Neon Database / ElectricSQL)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **API:** Hono (integrated with Next.js)
* **Validation:** Zod

### Auth & Tools
* **Authentication:** [Clerk](https://clerk.com/)
* **Forms:** React Hook Form + Resolvers
* **Drag & Drop:** `@dnd-kit` & `react-beautiful-dnd`

## 🗄️ Database Schema

The system relies on a relational database managed by Drizzle ORM. Key tables include:

* `users` - User data linked with Clerk.
* `markers` - Gym locations (geolocation).
* `reviews` - Gym reviews linked to markers.
* `trainingPlans` & `trainingPlanExercises` - Structure of workout routines.
* `workoutSession` & `workoutResults` - History of completed workouts.
* `exerciseBest` - Tracking personal records.
* `weekStreak` - Gamification and consistency tracking.

## ⚙️ Installation & Setup

To run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/sigyma.git](https://github.com/your-username/sigyma.git)
    cd sigyma
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file and fill it with necessary API keys (Database URL, Clerk Keys, Uploadthing, etc.).

4.  **Generate and Migrate Database:**
    ```bash
    npm run db:generate
    npm run db:migrate
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```


---
