# Kalnadai Portal 🌾

**Digital Livestock Antimicrobial Monitoring System**

A comprehensive web application for monitoring livestock antimicrobial usage across Tamil Nadu, connecting farmers, veterinarians, and government officials in a unified digital platform.

## Features

### 🔐 Authentication & Security
- Secure user registration and login with Supabase
- Role-based access control (Farmer, Veterinarian, Government Official)
- Row-Level Security (RLS) policies for data protection
- Profile management with role-specific fields

### 🌍 Multi-Language Support
- English and Tamil interface
- Seamless language switching
- Culturally appropriate design

### 👥 Role-Based Dashboards

#### Farmers
- Livestock medication tracking
- Treatment history management
- Veterinary prescription uploads
- Withdrawal period monitoring

#### Veterinarians
- Patient management
- Prescription management
- Drug usage monitoring
- Professional license tracking

#### Government Officials
- Compliance monitoring
- System-wide analytics
- Report generation
- Multi-district oversight

### 🎨 Design System
- Agricultural-themed color palette
- Responsive design for all devices
- Beautiful gradients and shadows
- Consistent component library

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Backend**: Supabase (Database, Auth, RLS)
- **Routing**: React Router
- **State Management**: React Query + Context API
- **Icons**: Lucide React

## Database Schema

### Core Tables
- `user_profiles` - User information and roles
- `FARMER DASHBOARD` - Livestock medication records
- `Veterinarian Dashboard` - Veterinary prescriptions
- `Compliance_Reports` - Government compliance monitoring

### Security Features
- Row Level Security (RLS) enabled on all tables
- User isolation based on roles and ownership
- Government officials have read access across districts

## Getting Started

1. **Authentication Setup**
   - Users can register with their role (farmer/veterinarian/government)
   - Profile automatically created on signup
   - Role-appropriate dashboard displayed

2. **For Farmers**
   - Log livestock medication usage
   - Upload prescription photos
   - Track withdrawal periods
   - Monitor treatment history

3. **For Veterinarians**
   - Manage patient records
   - Issue digital prescriptions
   - Track drug usage patterns
   - Maintain professional documentation

4. **For Government Officials**
   - Monitor compliance across districts
   - Generate reports
   - Track antimicrobial usage trends
   - Oversee system activities

---

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d885c35f-cf9a-42f7-b904-b4ca79df681a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d885c35f-cf9a-42f7-b904-b4ca79df681a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
