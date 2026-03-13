# 🚗 Roadside Assistance Web Application

A modern **location-based roadside assistance platform** that connects drivers with **nearby mechanics for on-site vehicle services**. The application allows users experiencing vehicle breakdowns to quickly locate and request help from the closest available mechanic through an **interactive map interface**.

Built with **Next.js, TailwindCSS, MongoDB, and Leaflet**, the platform provides real-time location visualization, efficient service discovery, and a responsive user experience across devices.

---

## 🚀 Features

### 📍 Location-Based Mechanic Discovery
- Detects user location to find nearby mechanics
- Displays mechanics on an interactive **Leaflet map**
- Helps users quickly identify the closest service provider

### 🧰 Roadside Service Requests
- Users can send **on-site service requests**
- Mechanics can respond to nearby service calls
- Reduces waiting time during emergencies

### 🗺️ Interactive Map Interface
- Real-time map visualization of available mechanics
- Marker-based UI for easy navigation
- Distance-based service suggestions

### 📱 Responsive UI
- Clean and modern interface built with **TailwindCSS**
- Fully responsive design for **mobile, tablet, and desktop**

### 🗄️ Database Management
- **MongoDB** stores user information, mechanic profiles, and service requests
- Efficient backend communication via **Next.js API routes**

---

## 🧩 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js |
| Styling | TailwindCSS |
| Database | MongoDB |
| Maps | Leaflet |
| Backend | Next.js API Routes |

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/roadside-assistance-app.git
cd roadside-assistance-app
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env.local file in the root directory and add:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_MAP_API_KEY=your_map_key_if_required
4. Start Development Server
npm run dev

Open your browser and navigate to:

http://localhost:3000
📂 Project Structure
/app
/components
/pages
/pages/api
/lib
/styles
/public

components/ → Reusable UI components

pages/ → Application pages

pages/api/ → Backend API endpoints

lib/ → Database connection and helper functions

styles/ → Global styles and Tailwind configuration

public/ → Static assets

🎯 Future Improvements

Real-time mechanic availability tracking

In-app messaging between users and mechanics

Online payment integration

Ratings and reviews for mechanics

Push notifications for service updates

🤝 Contributing

Contributions are welcome.
Feel free to fork the repository and submit a pull request.

📄 License

This project is licensed under the MIT License.

👨‍💻 Author
Jay Patel
Dhruv Sarvaiya
Dev Shyara
Rupesh Chaudhary
