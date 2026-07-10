# TECHNOLOGIA PLATFORM - SYSTEM WORKFLOW DOCUMENT

## 1. Introduction
The Technologia Platform is an enterprise-grade, reusable Event Management System designed to handle annual technical and cultural festivals. Built for longevity, the platform ensures that future organizing committees can launch new editions, manage events, and track analytics entirely through a Content Management System (CMS) without requiring developer intervention or source code changes.

---

## 2. Role Hierarchy & Management

### The Roles
The platform utilizes strict Role-Based Access Control (RBAC) to ensure security and proper delegation of duties.

1. **Super Admin (System Owner/Core Developer)**
   - **Permissions:** Full system access. Can create/delete Fest Editions, manage global platform settings, and promote users to Admin.
   - **Reports to:** N/A (Top of hierarchy).
   
2. **Admin (Core Committee / Faculty In-Charge)**
   - **Permissions:** Full access to the current active edition. Can create events, publish announcements, issue certificates, approve final results, and manage users. Can promote users to Coordinator or Volunteer.
   - **Reports to:** Super Admin.

3. **Organizer / Faculty (Advisors)**
   - **Permissions:** High-level oversight. Can view all analytics, audit logs, and override event statuses. Usually maps to the Admin role in the system but used internally for faculty advisors.
   - **Reports to:** N/A.

4. **Coordinator (Event In-Charge)**
   - **Permissions:** Scoped access. Can edit specific assigned events, mark attendance, submit results for their events, and manage event-specific teams.
   - **Reports to:** Admin.

5. **Volunteer (Event Staff)**
   - **Permissions:** Execution-level access. Primarily uses the mobile scanner to scan QR passes, verify student registrations, and mark attendance at the venue. Cannot edit event details or publish results.
   - **Reports to:** Coordinator.

6. **Participant (Student)**
   - **Permissions:** Can view published events, register for events, form teams, view their own results, and download their own certificates.
   - **Reports to:** N/A.

7. **Visitor (Unauthenticated)**
   - **Permissions:** Can view the public landing page, read about the fest, view the public event catalog, and check the public leaderboard.

### Creation & Management Architecture
> [!TIP]
> **Architectural Recommendation:** *Top-Down Account Provisioning.* 
> Participants should register themselves via the public signup form. However, privileged accounts (Super Admin, Admin, Coordinator, Volunteer) **cannot** be self-registered. 
> **Why?** Security. Allowing users to select "I am an Admin" during signup is a massive security risk. Instead, a user registers normally as a Participant. Then, a Super Admin or Admin finds their profile in the Organizer Dashboard and manually clicks "Promote to Coordinator". This ensures zero unauthorized access.

---

## 3. Login System Architecture

> [!IMPORTANT]
> **Architectural Recommendation:** *Separation of Portals (`/login` vs `/organizer/login`).*
> 
> We strongly recommend keeping the student login (`/login`) and the organizer login (`/organizer/login`) physically separated on the frontend, even if they share the same database authentication pool on the backend.
> 
> **Why?** 
> 1. **User Experience:** Students shouldn't see confusing "Admin Portal" buttons or branding. Organizers should have a secure, professional, and isolated entry point.
> 2. **Security:** By separating the routes, our Edge Middleware (`proxy.ts`) can aggressively block any student account from even loading the `/organizer` dashboard assets, preventing them from probing admin APIs. 

**Login Workflows:**
- **Visitor / Participant:** Navigates to `/login`. Authenticates. Redirected to `/dashboard`.
- **Admin / Coordinator:** Navigates to `/organizer/login`. Authenticates. System checks role. Redirected to `/organizer`.

---

## 4. Public Website Workflow

The public face of the platform serves as a marketing tool and information hub.

**Visitor Journey:**
1. **Homepage (`/`)**: Views the hero section, active edition theme, dates, and sponsors.
2. **About (`/about`)**: Reads the history of Technologia and past editions.
3. **Events Catalog (`/events`)**: Browses the list of currently published events.
4. **Call to Action**: Visitor clicks "Register Now".
5. **Signup / Login (`/signup` | `/login`)**: Visitor creates an account or logs in.
6. **Participant Dashboard (`/dashboard`)**: Once authenticated, the public site transitions into the secure Participant Portal.

*Public Pages:* `/`, `/events`, `/about`, `/login`, `/signup`, `/leaderboard` (Public view).
*Protected Pages:* `/dashboard/*` (Requires Login), `/organizer/*` (Requires Admin/Coordinator Role).

---

## 5. Participant Workflow

This is the end-to-end journey of a student interacting with the fest.

1. **Registration**: Student fills out `/signup` (Name, Email, Password, Roll Number, Department).
2. **Verification**: System sends an OTP/Magic Link to their college email. Student verifies. (Prevents fake accounts).
3. **Login**: Student logs in.
4. **Dashboard**: Student lands on `/dashboard` (Mission Control). They see their PR points, upcoming registered events, and a quick-access QR code.
5. **Joining Events**: Student navigates to "Browse Events". They click "Register" on an individual event. 
6. **Team Creation**: If the event is a Team Event, the system prompts them to "Create Team" or "Join Team via Code".
7. **QR Pass**: Upon successful registration, a unique encrypted QR code is generated in their `/dashboard/qr` tab.
8. **Fest Day (Attendance)**: Student arrives at the venue. Shows QR code on their phone. Volunteer scans it to mark them "Present".
9. **Results**: After the event, the dashboard updates. If they won, PR points are automatically credited to their profile.
10. **Certificates**: A dynamically generated PDF certificate (Participation or Winner) unlocks in `/dashboard/certificates`.
11. **Logout**: Student disconnects.

---

## 6. Organizer & Edition Management Workflow

The platform is designed to handle multiple years (Editions) without losing data.

### Edition Lifecycle
1. **Creation**: Super Admin creates "Technologia 2027" (Draft).
2. **Setup**: Admins configure the theme, dates, and departments for the new edition.
3. **Activation**: Super Admin marks the edition as "Active". The website instantly updates to show 2027 branding.
4. **Archiving**: Once the fest is over, Super Admin marks it as "Archived". 
5. **Viewing Old Editions**: Visitors can go to `/archive/2026` to see past events and leaderboards.

### Organizer Provisioning
1. The new Core Committee registers standard student accounts.
2. The previous year's Super Admin (or Faculty) promotes the new Core Committee members to `admin` in the database.
3. The new Admins log into `/organizer/login` and begin promoting their Coordinators and Volunteers.

---

## 7. Event Workflow

The lifecycle of an event from inception to conclusion.

1. **Drafting**: Admin clicks "New Event" in the Organizer Dashboard. Fills out title, venue, dates, capacity, and rules. Status is `draft`.
2. **Publishing**: Admin changes status to `published`. The event appears on the public website and student dashboards.
3. **Registration Window**: Students register. The system automatically halts registrations if `registration_limit` is reached.
4. **Registration Closes**: Admin manually toggles `is_registration_open` to false, or the system auto-closes it 1 hour before the event.
5. **Execution & Attendance**: Event begins. Volunteers use the platform's built-in QR Scanner to scan student passes and mark attendance.
6. **Results Submission**: Event ends. Coordinator inputs the winners (1st, 2nd, 3rd) into the system.
7. **Result Verification**: Admin reviews the submitted results and clicks "Lock Results".
8. **Distribution**: Locking the results automatically triggers PR Point distribution, updates the Leaderboard, and unlocks Certificates for the participants.
9. **Archiving**: Event is tied to the current Edition. When the Edition is archived, the Event is archived with it.

---

## 8. Committee Management

How human resources are managed within the system:

- **Faculty / Core Committee**: Hold `admin` roles. They manage global settings, oversee all events, and handle disciplinary actions.
- **Developers**: Hold `super_admin` roles. They monitor system health and handle DB migrations if necessary.
- **Volunteers / PR / Photo / Design**: Hold `volunteer` or `coordinator` roles. 
  - *Recommendation:* Create a dedicated "Committee" table to assign badges (e.g., "Design Team 2026") that display on their public profiles, separate from their system access `role`.

---

## 9. Dashboard Structure

> [!TIP]
> **Architectural Recommendation:** *Context-Specific Interfaces.*
> Avoid building a "one size fits all" dashboard. Different roles have vastly different goals.

**Participant Dashboard (`/dashboard`)**
- **Focus:** Personal journey and gamification.
- **Contains:** Next upcoming event countdown, PR Point balance, Quick QR Code, list of registered events, and unlocked certificates.
- **Why?** Students want fast access to their pass and their schedule.

**Organizer Dashboard (`/organizer`)**
- **Focus:** Operations, metrics, and bottlenecks.
- **Contains:** Live registration graphs, pending tasks (e.g., "3 events need result verification"), venue capacity alerts, and quick actions to publish announcements.
- **Why?** Admins need a bird's-eye view to ensure the fest is running smoothly.

**Super Admin Dashboard (`/admin` or hidden inside Organizer)**
- **Focus:** System health and Edition management.
- **Contains:** Edition lifecycle controls, global role management, error logs.
- **Why?** Purely technical and administrative control.

---

## 10. QR & Attendance Flow

**Security First QR Generation:**
- QR codes are generated dynamically on the client side using an encrypted payload containing the `user_id` and a time-based token.
- **Why?** Prevents students from screenshotting a QR code and sending it to a friend to mark proxy attendance.

**Scanning Flow:**
1. Volunteer opens `/organizer/scanner` on their mobile device.
2. Scans Participant's QR.
3. System verifies token validity and checks if the student is registered for the currently active event at that venue.
4. Database `attendance` table is updated with `status = present`.

---

## 11. Results & Certificate Flow

1. **Results**: Coordinators submit results. Admins verify. 
2. **Generation**: Upon verification, the system does NOT pre-generate PDF files (which consumes massive storage). 
3. **Dynamic Rendering**: Instead, when a student clicks "Download Certificate", the system dynamically renders an HTML/CSS template to a PDF, injecting their Name, Event, and Rank.
4. **Verification**: Every certificate gets a unique UUID printed on it. Anyone can go to `/verify/[uuid]` to prove the certificate is authentic.

---

## 12. PR Point Workflow (Gamification)

PR (Public Relations) Points drive department competition.

- **Calculation**: 
  - Participation = +10 Points.
  - 1st Place = +100 Points.
  - 2nd Place = +75 Points.
  - 3rd Place = +50 Points.
- **Visibility**: PR points are visible on the public leaderboard.
- **Hiding/Revealing**: 
  - *Recommendation:* Implement a "Blind Mode" 24 hours before the fest ends. Admins toggle `results_revealed = false`. The leaderboard freezes for the public, building suspense for the closing ceremony.
- **Best Department**: Sum of all PR points earned by students belonging to that department.
- **Best Student**: Individual student with the highest total PR points across all events.

---

## 13. Notification Flow

- **Sender**: Admins (Global Announcements) or Coordinators (Event-specific updates).
- **Receiver**: Participants.
- **Delivery**: 
  - **In-App**: Displayed in the `/dashboard/notifications` bell icon.
  - **Live Display**: Pushed via WebSockets to the `/live` big screen display.
  - **Email**: Critical updates (e.g., Venue changes) trigger a Supabase Edge Function to send an email via Resend/SendGrid.
- **Scheduling**: Admins can set an `expires_at` or `publish_at` timestamp on announcements for automated delivery.

---

## 14. COMPLETE PLATFORM FLOW (END-TO-END)

This is the ultimate lifecycle of a user interacting with the Technologia ecosystem.

**Phase 1: Setup (Pre-Fest)**
`Super Admin` creates Edition (2026) ➔ Promotes `Admins` ➔ Admins create `Events` (Draft) ➔ Admins publish `Events` ➔ Website goes Live.

**Phase 2: Acquisition**
`Visitor` lands on Homepage ➔ Browses Events ➔ Clicks Register ➔ Re-routes to `/signup` ➔ Enters Details ➔ Verifies Email.

**Phase 3: Engagement**
`Visitor` becomes `Participant` ➔ Logs into `/dashboard` ➔ Browses Catalog ➔ Forms Team ➔ Registers for Hackathon ➔ Receives Encrypted `QR Pass`.

**Phase 4: Execution (Fest Day)**
`Participant` arrives at Venue ➔ Shows `QR Pass` ➔ `Volunteer` logs into `/organizer/login` ➔ Opens Scanner ➔ Scans QR ➔ `Participant` is marked Present.

**Phase 5: Resolution**
Event Finishes ➔ `Coordinator` enters Top 3 into system ➔ `Admin` reviews and clicks "Lock Results".

**Phase 6: Fulfillment**
System automatically credits `PR Points` to winners ➔ Updates global `Leaderboard` ➔ Triggers in-app `Notification` to winners ➔ Unlocks dynamic `Certificates` in Participant Dashboard.

**Phase 7: Conclusion**
Fest Ends ➔ Admin toggles "Reveal Leaderboard" for closing ceremony ➔ Winning Department Announced ➔ Super Admin clicks "Archive Edition" ➔ System freezes all data ➔ Platform is clean and ready for 2027.
