---
render_with_liquid: false
---

# Complete ReportPortal Setup & CI Integration Guide

**Author:** QtpSudhakar  
**Last Updated:** February 2026  
**Difficulty:** Intermediate to Advanced  
**Estimated Reading Time:** 45 minutes  
**Hands-On Time:** 2-3 hours

---

## What You'll Build

By the end of this guide, you will have:

- ✅ **Docker installed** and configured
- ✅ **ReportPortal running locally** with all services
- ✅ **User accounts and projects** properly configured
- ✅ **Dashboards and widgets** for test analytics
- ✅ **API tokens** for CI/CD integration
- ✅ **Playwright/Pytest tests** integrated with ReportPortal
- ✅ **GitHub Actions** automatically sending results
- ✅ **Production-ready architecture** understanding
- ✅ **Troubleshooting skills** for common issues

---

# Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [What is ReportPortal?](#2-what-is-reportportal)
3. [Why ReportPortal?](#3-why-reportportal)
4. [Understanding the Architecture](#4-understanding-the-architecture)
5. [Installing Docker](#5-installing-docker)
6. [Installing ReportPortal Locally](#6-installing-reportportal-locally)
7. [Starting & Stopping ReportPortal](#7-starting--stopping-reportportal)
8. [First Login & Initial Setup](#8-first-login--initial-setup)
9. [Managing Users](#9-managing-users)
10. [Creating Projects](#10-creating-projects)
11. [Dashboards & Widgets](#11-dashboards--widgets)
12. [Generating API Tokens](#12-generating-api-tokens)
13. [Project Structure Setup](#13-project-structure-setup)
14. [Integrating Playwright Tests](#14-integrating-playwright-tests)
15. [Integrating Pytest Tests](#15-integrating-pytest-tests)
16. [GitHub Actions Integration](#16-github-actions-integration)
17. [How Results Flow to ReportPortal](#17-how-results-flow-to-reportportal)
18. [Different Ways to Publish Results](#18-different-ways-to-publish-results)
19. [Production Architecture](#19-production-architecture)
20. [Common Issues & Fixes](#20-common-issues--fixes)
21. [Maintenance & Operations](#21-maintenance--operations)
22. [Backup Strategies](#22-backup-strategies)
23. [Security Best Practices](#23-security-best-practices)
24. [Cost Considerations](#24-cost-considerations)
25. [Real-World Example](#25-real-world-example)
26. [Practice Exercise](#26-practice-exercise)

---

# 1. Prerequisites

## System Requirements

### Minimum Specifications
- **RAM:** 8 GB (16 GB recommended for production)
- **CPU:** 4 cores (8 cores recommended)
- **Disk Space:** 20 GB free (50 GB+ for production)
- **OS:** Ubuntu 20.04+, Windows 10+, macOS 10.15+

### Software Requirements
- **Docker:** Version 20.10+
- **Docker Compose:** Version 2.0+
- **Internet Connection:** Required for initial setup
- **Browser:** Chrome, Firefox, or Edge (latest versions)

### Knowledge Prerequisites
- Basic understanding of Docker containers
- Familiarity with CI/CD concepts
- Experience with test automation (Playwright/Pytest/Selenium)
- Basic command-line skills

## Why These Requirements?

ReportPortal is a **microservices application** that runs multiple services:

| Service | Purpose | Memory Needed |
|---------|---------|---------------|
| **PostgreSQL** | Database for test data | 512 MB - 1 GB |
| **Elasticsearch** | Search and analytics | 2 GB - 4 GB |
| **RabbitMQ** | Message queue | 512 MB |
| **MinIO** | Object storage (screenshots, logs) | 512 MB |
| **API Service** | REST API backend | 1 GB - 2 GB |
| **UI Service** | Web interface | 256 MB |
| **Jobs Service** | Background processing | 512 MB |
| **Analyzer** | AI defect analysis | 1 GB - 2 GB |

**Total:** ~6-8 GB minimum, **16 GB recommended** for smooth operation.

---

# 2. What is ReportPortal?

## Simple Explanation

ReportPortal is a **centralized test automation dashboard** that collects, analyzes, and visualizes test results from all your automation frameworks.

## The Problem It Solves

### Without ReportPortal (The Pain)

```
Day 1: Tests run locally → Results in console
Day 2: Tests run on CI → Logs buried in Jenkins
Day 3: Selenium results in HTML report
Day 4: Playwright results in JSON
Day 5: API tests in Postman
```

**Result:** 5 different sources, no unified view, impossible to track trends! 😵

### With ReportPortal (The Solution)

```
Day 1-5: ALL tests → Send to ReportPortal
              ↓
         Single Dashboard
              ↓
    View trends, failures, analytics
```

**Result:** One source of truth! 🎯

## Real-World Analogy: The Hospital Reception

### Without ReportPortal
Imagine a hospital where:
- Lab results go to Lab desk
- X-ray results go to Radiology desk
- Blood test results go to Pathology desk
- **You** run between 5 desks to collect reports! 😤

### With ReportPortal
A **central reception** where:
- All reports arrive automatically
- Displayed on a single screen
- Historical records available
- Trends analyzed (e.g., "Your cholesterol improving!")

ReportPortal = **Central Reception for Test Results** 🏥

---

# 3. Why ReportPortal?

## Key Benefits

### 1. **Centralized Reporting**
- One dashboard for Playwright, Selenium, API tests
- No more scattered HTML reports
- Single source of truth

### 2. **Historical Trends**
- Compare today's results with last 100 runs
- Identify flaky tests automatically
- Track failure patterns

### 3. **AI-Powered Analysis**
- Auto-categorize failures: "Product Bug" vs "Flaky Test"
- Pattern recognition in stack traces
- Suggest similar defects

### 4. **Real-Time Visibility**
- Watch tests run LIVE
- See currently executing tests
- Instant failure notifications

### 5. **Team Collaboration**
- Developers see test results instantly
- Managers see dashboards
- QA analyzes failures with screenshots/logs

### 6. **Integration Friendly**
- Works with Jenkins, GitHub Actions, GitLab CI
- Supports Playwright, Selenium, Pytest, TestNG, JUnit
- REST API for custom integrations

## Cost Savings Example

### Before ReportPortal
- **Manual effort:** 30 mins/day analyzing scattered reports = 10 hours/month
- **Hourly rate:** $50/hour
- **Cost:** $500/month per team member

### After ReportPortal
- **Manual effort:** 5 mins/day checking single dashboard = 1.5 hours/month
- **Savings:** $425/month per person
- **10-person team:** **$4,250/month saved!** 💰

---

# 4. Understanding the Architecture

## ReportPortal Components

### High-Level View

```
┌─────────────────────────────────────────────────────┐
│                   ReportPortal                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │    UI    │  │   API    │  │  Jobs    │          │
│  │ (React)  │  │ (Java)   │  │ Service  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│       ↓             ↓              ↓                │
│  ┌──────────────────────────────────────┐          │
│  │         PostgreSQL Database          │          │
│  └──────────────────────────────────────┘          │
│       ↑                    ↑                        │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐     │
│  │ RabbitMQ │  │ Elasticsearch│  │  MinIO   │     │
│  │  Queue   │  │   Search     │  │ Storage  │     │
│  └──────────┘  └──────────────┘  └──────────┘     │
│                                                      │
└─────────────────────────────────────────────────────┘
         ↑
         │ (Sends test results via HTTP)
         │
   ┌─────────────┐
   │  Your Tests │
   │  (CI/Local) │
   └─────────────┘
```

## Component Roles

### 1. **UI Service**
- **Technology:** React web app
- **Port:** 8080
- **Purpose:** User interface for viewing reports
- **Analogy:** The **reception desk** where you view reports

### 2. **API Service**
- **Technology:** Java Spring Boot
- **Port:** 8585
- **Purpose:** REST API for receiving test results
- **Analogy:** The **intake clerk** who receives documents

### 3. **PostgreSQL**
- **Purpose:** Stores launches, tests, logs, users
- **Port:** 5432
- **Analogy:** The **filing cabinet** with all records

### 4. **Elasticsearch**
- **Purpose:** Fast search across logs and test names
- **Port:** 9200
- **Analogy:** The **index system** for quick lookups

### 5. **RabbitMQ**
- **Purpose:** Message queue for async processing
- **Port:** 5672
- **Analogy:** The **mail room** distributing tasks

### 6. **MinIO**
- **Purpose:** Object storage for screenshots, videos, attachments
- **Port:** 9000
- **Analogy:** The **photo album** storage

### 7. **Jobs Service**
- **Purpose:** Background processing (auto-analysis, cleanup)
- **Analogy:** The **night cleaning crew**

### 8. **Analyzer**
- **Purpose:** AI-powered defect classification
- **Analogy:** The **expert consultant** identifying patterns

## Data Flow: From Test to Dashboard

```
Step 1: Test runs (npx playwright test)
   ↓
Step 2: Reporter plugin captures results
   ↓
Step 3: HTTP POST to API service (port 8585)
   ↓
Step 4: API validates token & project
   ↓
Step 5: Data saved to PostgreSQL
   ↓
Step 6: RabbitMQ queues analysis job
   ↓
Step 7: Analyzer processes patterns
   ↓
Step 8: Results indexed in Elasticsearch
   ↓
Step 9: Screenshots uploaded to MinIO
   ↓
Step 10: UI fetches data and displays ✅
```

**Time:** Entire flow takes **2-5 seconds** from test completion to dashboard visibility!

---

# 5. Installing Docker

## Why Docker?

ReportPortal uses **Docker Compose** to orchestrate 8+ microservices. Docker ensures:
- ✅ Same environment everywhere (your laptop = production server)
- ✅ Easy installation (one command starts all services)
- ✅ Isolated environment (doesn't conflict with other apps)

## Ubuntu/Debian Installation

### Step 1: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Docker

```bash
# Install Docker
sudo apt install docker.io -y

# Start and enable Docker
sudo systemctl enable docker
sudo systemctl start docker

# Add your user to docker group (avoid using sudo)
sudo usermod -aG docker $USER

# Apply group changes (log out/in or use newgrp)
newgrp docker
```

### Step 3: Install Docker Compose

```bash
# Docker Compose v2 (plugin)
sudo apt install docker-compose-plugin -y
```

### Step 4: Verify Installation

```bash
# Check Docker version
docker --version
# Expected: Docker version 24.0.x

# Check Docker Compose version
docker compose version
# Expected: Docker Compose version v2.x.x

# Test Docker
docker run hello-world
# Should download and run successfully
```

## Windows Installation

### Step 1: Download Docker Desktop

Visit: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

### Step 2: Install

```powershell
# Run installer as Administrator
# Enable WSL 2 during installation
# Restart computer when prompted
```

### Step 3: Verify

```powershell
# Open PowerShell
docker --version
docker compose version
```

### Step 4: Configure Resources

1. Open Docker Desktop
2. Settings → Resources
3. Set:
   - **Memory:** 8 GB minimum
   - **CPUs:** 4 cores minimum
   - **Disk:** 50 GB

## macOS Installation

### Step 1: Download Docker Desktop

Visit: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

Choose **Apple Silicon** or **Intel** based on your Mac.

### Step 2: Install

```bash
# Drag Docker.app to Applications folder
# Open Docker from Applications
# Grant necessary permissions
```

### Step 3: Verify

```bash
docker --version
docker compose version
```

## Common Docker Issues

### Issue 1: Permission Denied

```bash
# Error: permission denied while trying to connect to the Docker daemon
# Solution:
sudo usermod -aG docker $USER
newgrp docker
```

### Issue 2: Docker Service Not Running

```bash
# Ubuntu:
sudo systemctl start docker

# Check status:
sudo systemctl status docker
```

### Issue 3: Port Already in Use

```bash
# Error: Bind for 0.0.0.0:8080 failed: port is already allocated
# Solution: Find and kill process using port
sudo lsof -i :8080
sudo kill -9 <PID>
```

---

# 6. Installing ReportPortal Locally

## Quick Start (5 Minutes)

### Step 1: Create Directory

```bash
# Create dedicated folder
mkdir ~/reportportal
cd ~/reportportal
```

### Step 2: Download docker-compose.yml

```bash
# Download official configuration
curl -LO https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml
```

**What's in docker-compose.yml?**

This file defines 8 services:
- postgres (database)
- elasticsearch (search)
- rabbitmq (queue)
- minio (storage)
- api (backend)
- ui (frontend)
- jobs
- analyzer

### Step 3: Start ReportPortal

```bash
# Start all services in background
docker compose -p reportportal up -d
```

**What happens now?**

```
[+] Running 8/8
 ✔ Container reportportal-postgres-1       Started
 ✔ Container reportportal-rabbitmq-1       Started
 ✔ Container reportportal-minio-1          Started
 ✔ Container reportportal-elasticsearch-1  Started
 ✔ Container reportportal-api-1            Started
 ✔ Container reportportal-ui-1             Started
 ✔ Container reportportal-jobs-1           Started
 ✔ Container reportportal-analyzer-1       Started
```

**Time:** First run takes **5-10 minutes** to download images (1.5 GB total).

### Step 4: Wait for Services to Be Ready

```bash
# Check all services are running
docker compose ps

# Expected output:
NAME                           STATUS
reportportal-api-1             Up (healthy)
reportportal-postgres-1        Up (healthy)
reportportal-ui-1              Up
reportportal-elasticsearch-1   Up
...
```

**Pro Tip:** Wait until you see `(healthy)` next to `api-1` and `postgres-1`.

### Step 5: Access ReportPortal

Open browser: **http://localhost:8080**

You should see the ReportPortal login screen! 🎉

## Understanding the Installation

### Where Are Files Stored?

Docker uses **volumes** to persist data:

```bash
# List volumes
docker volume ls | grep reportportal

# Volumes created:
reportportal_postgres    # Database data
reportportal_minio       # Screenshots/logs
reportportal_elastic     # Search indexes
```

**Important:** Even if you stop containers, data persists in volumes!

### Ports Used

| Service | Internal Port | External Port | Purpose |
|---------|---------------|---------------|---------|
| UI | 8080 | 8080 | Web interface |
| API | 8585 | 8585 | REST API |
| PostgreSQL | 5432 | 5432 | Database |
| MinIO | 9000 | 9000 | Object storage |
| Elasticsearch | 9200 | 9200 | Search |
| RabbitMQ | 5672 | 5672 | Message queue |

**Conflict?** If port 8080 is busy, edit `docker-compose.yml`:

```yaml
# Change this:
ports:
  - "8080:8080"

# To this (use port 9090 instead):
ports:
  - "9090:8080"
```

Then restart:

```bash
docker compose down
docker compose up -d
```

Access at: **http://localhost:9090**

---

# 7. Starting & Stopping ReportPortal

## Basic Commands

### Start ReportPortal

```bash
cd ~/reportportal
docker compose -p reportportal up -d
```

**Flags:**
- `-p reportportal` → Project name (groups containers)
- `-d` → Detached mode (runs in background)

### Stop ReportPortal

```bash
docker compose -p reportportal down
```

**What happens?**
- All containers stop
- Network removed
- **Data persists** in volumes ✅

### Restart Specific Service

```bash
# Restart just the API service
docker compose restart api

# Restart UI
docker compose restart ui
```

### Full Restart

```bash
docker compose restart
```

## Monitoring Commands

### Check Status

```bash
docker compose ps
```

**Output:**

```
NAME                      STATUS         PORTS
reportportal-api-1        Up (healthy)   0.0.0.0:8585->8585/tcp
reportportal-ui-1         Up             0.0.0.0:8080->8080/tcp
...
```

### View Logs (Real-Time)

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f api

# Last 100 lines
docker compose logs --tail=100 api
```

**Pro Tip:** Logs are your best friend for debugging!

### Check Resource Usage

```bash
docker stats
```

**Output:**

```
CONTAINER             CPU %     MEM USAGE / LIMIT     MEM %
reportportal-api-1    2.5%      1.2 GB / 16 GB       7.5%
reportportal-es-1     15%       3.5 GB / 16 GB       21.8%
...
```

**Red flag:** If Elasticsearch uses >80% memory, increase Docker RAM allocation.

## Advanced Operations

### Rebuild Containers (After Config Changes)

```bash
docker compose down
docker compose up -d --build
```

### Remove Everything (Including Data)

```bash
# ⚠️ WARNING: This deletes all test data!
docker compose down -v
```

**Use case:** Fresh start after misconfiguration.

### Update to Latest Version

```bash
# Pull latest images
docker compose pull

# Restart with new images
docker compose up -d
```

---

# 8. First Login & Initial Setup

## Default Credentials

ReportPortal creates 2 default users:

| Username | Password | Role | Purpose |
|----------|----------|------|---------|
| `default` | `1q2w3e` | USER | Regular project member |
| `superadmin` | `erebus` | ADMIN | System administrator |

## First Login Steps

### Step 1: Access Web Interface

Open: **http://localhost:8080**

### Step 2: Login as SuperAdmin

```
Username: superadmin
Password: erebus
```

**You should see:** Dashboard with navigation menu on left.

### Step 3: Change Default Passwords Immediately!

**Security Risk:** Default credentials are public knowledge!

**Change Password:**

1. Click **User Icon** (top-right)
2. Select **Profile**
3. Click **Edit**
4. Scroll to **Password**
5. Enter:
   - **Old password:** `erebus`
   - **New password:** `YourSuperStrong123!`
   - **Confirm password:** `YourSuperStrong123!`
6. Click **Submit**

### Step 4: Change 'default' User Password

1. Go to **Administration** → **Users**
2. Find user `default`
3. Click **Edit** (pencil icon)
4. Change password to something secure
5. Click **Submit**

## Understanding User Roles

### 1. **Administrator**
- Full system access
- Manage all projects
- Create users
- System settings

### 2. **Project Manager**
- Manage assigned projects
- Add/remove users from project
- Configure project settings

### 3. **Member**
- View test results
- Use dashboards
- Add comments
- Cannot modify project settings

### 4. **Customer** (Read-Only)
- View-only access
- No modifications
- Good for stakeholders/managers

## Initial Configuration

### Configure SMTP (Optional but Recommended)

**Purpose:** Send email notifications for test failures

1. Go to **Administration** → **Server Settings**
2. Scroll to **Email Configuration**
3. Enter:
   - **SMTP Host:** `smtp.gmail.com`
   - **SMTP Port:** `587`
   - **SMTP Username:** `your-email@gmail.com`
   - **SMTP Password:** `your-app-password`
   - **From:** `reportportal@yourcompany.com`
4. Click **Submit**
5. Click **Test Connection**

**Gmail Users:** Use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password!

### Configure Analyzer Settings

1. Go to **Administration** → **Plugins**
2. Find **Analyzer Plugin**
3. Click **Configure**
4. Enable:
   - ✅ Auto-Analysis
   - ✅ Pattern Analysis
   - ✅ Machine Learning
5. Click **Save**

**What this does:** AI automatically categorizes similar failures!

---

# 9. Managing Users

## Creating Users Manually

### Web UI Method

1. Login as `superadmin`
2. Go to **Administration** → **Users**
3. Click **Invite User** (+ icon)
4. Fill form:
   - **Login:** `john.doe`
   - **Email:** `john.doe@company.com`
   - **Full Name:** `John Doe`
   - **Project Role:** `MEMBER`
   - **Default Project:** Select project
5. Click **Invite**

**What happens?**
- User receives email invitation (if SMTP configured)
- User sets password via link
- If no SMTP: You must send password manually

### Without SMTP

If SMTP not configured:

1. Create user
2. Set **temporary password** during creation
3. Check **"Generate Password"**
4. Copy generated password
5. Send to user via Slack/Email manually
6. User changes password on first login

## User Management Best Practices

### 1. Use Email as Username

✅ **Good:** `alice.smith@company.com`  
❌ **Bad:** `alice123`

**Why?** Easy to remember, no duplicates.

### 2. Follow Naming Convention

```
firstname.lastname@domain.com
```

### 3. Assign Roles Appropriately

| Role | Who |
|------|-----|
| Admin | DevOps, QA Leads |
| Project Manager | Test Managers, Team Leads |
| Member | QA Engineers, Developers |
| Customer | Product Managers, Stakeholders |

### 4. Deactivate Instead of Delete

When someone leaves:
- **Don't delete** (loses test history association)
- **Deactivate** (preserves data, revokes access)

**How to deactivate:**

1. Go to **Users**
2. Find user
3. Click **Edit**
4. Toggle **Account Active** to OFF
5. Click **Save**

## Assigning Users to Projects

### Method 1: From Project Settings

1. Go to **Settings** → **Members**
2. Click **Add Member**
3. Select user
4. Choose role:
   - **Project Manager**
   - **Member**
   - **Operator**
   - **Customer**
5. Click **Add**

### Method 2: From User Profile

1. Go to **Administration** → **Users**
2. Find user
3. Click **Edit**
4. Scroll to **Assigned Projects**
5. Add projects with roles
6. Click **Save**

---

# 10. Creating Projects

## What is a Project?

A **project** in ReportPortal = A workspace for a single product/team.

**Examples:**
- `ecommerce-web-tests`
- `mobile-app-automation`
- `api-testing-suite`
- `payment-gateway-tests`

## Project Structure Best Practices

### Strategy 1: One Project Per Product

```
Project: ecommerce-web
  ├── Launches: Nightly Regression
  ├── Launches: Smoke Tests
  ├── Launches: Release Candidate
```

### Strategy 2: One Project Per Team

```
Project: qa-team-alpha
  ├── Product A tests
  ├── Product B tests
```

### Strategy 3: One Project Per Test Type

```
Project: ui-tests
Project: api-tests
Project: performance-tests
```

## Creating Your First Project

### Step 1: Navigate to Projects

1. Login as `superadmin` or `admin`
2. Click **Administration** → **Projects**

### Step 2: Add New Project

1. Click **Add Project** (+ button)
2. Fill form:

```yaml
Project Name: demo-automation
Project Type: INTERNAL
Description: Demo project for learning ReportPortal
```

3. Click **Add**

### Step 3: Configure Project Settings

1. Click on newly created project
2. Go to **Settings** → **General**
3. Configure:

```yaml
Keep launches: 30 days
Keep logs: 7 days
Keep screenshots: 7 days

Email notifications: ON
Auto-analysis: ON
```

4. Click **Submit**

### Step 4: Add Team Members

1. Go to **Settings** → **Members**
2. Click **Add Member**
3. Add users with appropriate roles
4. Click **Add**

## Project Types

### INTERNAL
- **Use case:** Internal company projects
- **Features:** Full features enabled

### PERSONAL
- **Use case:** Individual learning/testing
- **Features:** Limited users (usually 1)

**Recommendation:** Use INTERNAL for team projects.

---

# 11. Dashboards & Widgets

## What Are Dashboards?

Dashboards = **Visual analytics** for test automation health.

**Analogy:** Like a car dashboard showing:
- Speed (test execution rate)
- Fuel (stability percentage)
- Warnings (failures)

## Default Dashboard

Every project has a default dashboard with widgets showing:
- Launch statistics
- Latest launches
- Test cases growth
- Failed/Skipped/Passed trends

## Creating Custom Dashboards

### Step 1: Navigate to Dashboards

1. Select your project
2. Click **Dashboards** (left menu)
3. Click **Add Dashboard**

### Step 2: Configure Dashboard

```yaml
Name: Nightly Regression Dashboard
Description: Shows nightly test run statistics
Share: Yes (visible to all team members)
```

Click **Add**

### Step 3: Add Widgets

Click **Add Widget** and choose from:

#### 1. **Launch Statistics**
Shows test execution summary (Passed/Failed/Skipped)

**Configuration:**
- Launch: Nightly Regression
- Items: 1 (latest)
- View: Donut chart

#### 2. **Overall Statistics**
Total tests, pass rate, failure rate

**Configuration:**
- Timeline: Last 30 days
- View: Panel view

#### 3. **Failed Cases Trend**
Line chart showing failure trends over time

**Configuration:**
- Launch: All
- Items: 30 (last 30 runs)
- View: Line chart

#### 4. **Flaky Test Cases**
Tests that sometimes pass, sometimes fail

**Configuration:**
- Threshold: 50% (fails half the time)
- Launch: All
- Items: 50
- View: Table

#### 5. **Most Failed Test Cases**
Top 20 tests that fail most often

**Configuration:**
- Launch: All
- Items: 20
- Timeline: Last 30 days
- View: Table

#### 6. **Launch Execution Time**
Time taken for test execution

**Configuration:**
- Launch: Nightly Regression
- Items: 30
- View: Line chart

#### 7. **Component Health Check**
Test results grouped by component/module

**Configuration:**
- Group by: Tag or Attribute
- Launch: Latest
- View: Heat map

## Widget Configuration Example

### Adding "Launch Statistics" Widget

1. Click **Add Widget**
2. Select **Launch Statistics Chart**
3. Configure:

```yaml
Widget Name: Nightly Run Summary
Description: Shows last night's test results
Launch filter: "Nightly Regression"
Number of items: 1
View mode: Donut chart
Show: All statuses
```

4. Click **Save**

### Result

You'll see a donut chart like:

```
Total: 235 tests
  🟢 Passed: 220 (93.6%)
  🔴 Failed: 12 (5.1%)
  🟡 Skipped: 3 (1.3%)
```

## Organizing Dashboards

### Dashboard for Different Audiences

#### For QA Team
```
Dashboard: Test Execution Monitoring
Widgets:
  - Launch statistics (latest 5 runs)
  - Failed test cases table
  - Flaky tests
  - Execution time trends
```

#### For Managers
```
Dashboard: Quality Overview
Widgets:
  - Overall pass rate (gauge)
  - Test stability trend (30 days)
  - Component health (heat map)
  - Release readiness (panel)
```

#### For Developers
```
Dashboard: Development Impact
Widgets:
  - Tests affected by latest commits
  - New failures in current sprint
  - Top 10 most failed tests
```

## Sharing Dashboards

### Make Dashboard Public

1. Go to **Dashboards**
2. Click dashboard name
3. Click **Edit**
4. Toggle **Share** to ON
5. Click **Update**

Now all project members see this dashboard!

### Exporting Dashboard

Click **Export** → Choose format:
- PDF
- PNG
- JPG

**Use case:** Include in weekly reports or sprint reviews.

---

# 12. Generating API Tokens

## What is an API Token?

An API token = **Secret key** that lets your CI/CD system authenticate to ReportPortal.

**Analogy:** Like a hotel room keycard - gives access without needing username/password.

## Why Tokens Instead of Passwords?

| Passwords | Tokens |
|-----------|--------|
| Hard to rotate | Easy to regenerate |
| Stored in code (insecure) | Stored in secrets (secure) |
| Same for all services | Different per service |
| Revoke = user locked out | Revoke = service stopped only |

## Generating Your First Token

### Step 1: Access Profile

1. Login to ReportPortal
2. Click **User Icon** (top-right corner)
3. Select **Profile**

### Step 2: Navigate to API Keys

1. Click **API Keys** tab
2. You'll see section: **"Access Tokens"**

### Step 3: Generate Token

1. Click **Generate Token** button
2. Copy the generated token **immediately**

**Example Token:**

```
1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
```

**⚠️ Warning:** Token displays ONCE! If lost, generate new one.

### Step 4: Store Token Securely

**❌ Don't:**
```javascript
// Hardcoding in code
const token = "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6";
```

**✅ Do:**
```bash
# Store in environment variable
export RP_TOKEN="1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"

# Or in .env file (add to .gitignore!)
echo "RP_TOKEN=your-token-here" >> .env
```

## Using Token in Tests

### For Playwright

Create `.env` file:

```bash
RP_TOKEN=1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
RP_ENDPOINT=http://localhost:8080
RP_PROJECT=demo-automation
```

Load in config:

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  reporter: [
    ['@reportportal/agent-js-playwright', {
      apiKey: process.env.RP_TOKEN,
      endpoint: process.env.RP_ENDPOINT,
      project: process.env.RP_PROJECT,
      launch: 'Local Execution',
    }]
  ],
});
```

### For Pytest

Create `pytest.ini`:

```ini
[pytest]
rp_endpoint = http://localhost:8080
rp_api_key = <GET_FROM_ENV>
rp_project = demo-automation
rp_launch = Pytest Local
```

Run with environment variable:

```bash
export RP_TOKEN="your-token"
pytest --reportportal
```

## Managing Multiple Tokens

### Use Case: Different Environments

```bash
# Development
RP_TOKEN_DEV=token-for-dev-project

# Staging
RP_TOKEN_STAGE=token-for-stage-project

# Production
RP_TOKEN_PROD=token-for-prod-project
```

## Revoking Tokens

**When to revoke:**
- Employee leaves company
- Token accidentally exposed (e.g., committed to GitHub)
- Rotating tokens for security (every 90 days)

**How to revoke:**

1. Go to **Profile** → **API Keys**
2. Find token in list
3. Click **Revoke** (trash icon)
4. Confirm action

**Result:** All services using that token lose access immediately.

---

# 13. Project Structure Setup

## Recommended Folder Structure

### For Playwright Project

```
my-automation-project/
│
├── .env                          # Environment variables (add to .gitignore!)
├── .env.example                  # Template for .env
├── .gitignore                    # Exclude .env, node_modules
├── package.json                  # Dependencies
├── playwright.config.ts          # Playwright + ReportPortal config
│
├── tests/
│   ├── login.spec.ts
│   ├── checkout.spec.ts
│   └── api-tests.spec.ts
│
├── pages/                        # Page Object Model
│   ├── LoginPage.ts
│   └── CheckoutPage.ts
│
├── fixtures/                     # Test data
│   └── users.json
│
└── .github/
    └── workflows/
        └── tests.yml             # GitHub Actions workflow
```

### For Pytest Project

```
pytest-automation/
│
├── .env
├── .env.example
├── pytest.ini                    # Pytest + ReportPortal config
├── requirements.txt              # Python dependencies
│
├── tests/
│   ├── test_login.py
│   ├── test_checkout.py
│   └── test_api.py
│
├── pages/
│   ├── login_page.py
│   └── checkout_page.py
│
├── fixtures/
│   └── conftest.py               # Pytest fixtures
│
└── .github/
    └── workflows/
        └── tests.yml
```

## Essential Files

### .env File (Store Secrets)

```bash
# ReportPortal Configuration
RP_TOKEN=1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6
RP_ENDPOINT=http://localhost:8080
RP_PROJECT=demo-automation

# Application Under Test
APP_URL=https://demo.playwright.dev
```

### .env.example (Template for Team)

```bash
# ReportPortal Configuration
RP_TOKEN=your-token-here
RP_ENDPOINT=http://localhost:8080
RP_PROJECT=your-project-name

# Application Under Test
APP_URL=https://your-app-url
```

**Purpose:** Team members copy `.env.example` to `.env` and fill their own tokens.

### .gitignore (Protect Secrets)

```
# Node.js
node_modules/
npm-debug.log

# Python
__pycache__/
*.pyc
.pytest_cache/

# Environment variables
.env

# Test results
test-results/
playwright-report/
```

**Critical:** Never commit `.env` to Git!

---

# 14. Integrating Playwright Tests

## Step-by-Step Integration

### Step 1: Install Reporter Package

```bash
npm install @reportportal/agent-js-playwright --save-dev
```

### Step 2: Create ReportPortal Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,
  
  reporter: [
    ['list'],  // Console output
    ['html'],  // Local HTML report
    
    // ReportPortal integration
    ['@reportportal/agent-js-playwright', {
      apiKey: process.env.RP_TOKEN||'mylocal_fo7V_FmTSwK4rPG0NsbBMIBxUkHfgHOjSUJKC7jZE9DzjBe1wQhAar191xlZYoNi',
      endpoint: process.env.RP_ENDPOINT||"http://localhost:8080/api/v1",
      project: process.env.RP_PROJECT||'orangehrm',
      launch: process.env.RP_LAUNCH || 'Playwright Tests',
      description: 'Automated tests from Playwright framework',
      
      attributes: [
        { key: 'environment', value: process.env.NODE_ENV || 'local' },
        { key: 'framework', value: 'playwright' },
        { key: 'browser', value: 'chromium' },
      ],
      
      // Upload screenshots and traces on failure
      uploadScreenshot: true,
      uploadVideo: true,
      uploadTrace: true,
    }]
  ],

  use: {
    baseURL: process.env.APP_URL || 'https://demo.playwright.dev',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### Step 3: Create .env File

```bash
RP_TOKEN=your-api-token-here
RP_ENDPOINT=http://localhost:8080
RP_PROJECT=demo-automation
RP_LAUNCH=Local Development
APP_URL=https://demo.playwright.dev
NODE_ENV=development
```

### Step 4: Install dotenv Package

```bash
npm install dotenv --save-dev
```

### Step 5: Create Test File

Create `tests/example.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Demo Tests', () => {
  
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should click getting started link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page).toHaveURL(/.*intro/);
  });

  test('intentional failure for demo', async ({ page }) => {
    await page.goto('/');
    // This will fail to demonstrate failure reporting
    await expect(page).toHaveTitle('Non-existent title');
  });
});
```

### Step 6: Run Tests

```bash
npx playwright test
```

### Step 7: Verify in ReportPortal

1. Open: http://localhost:8080
2. Login
3. Go to **Launches**
4. You should see: **"Playwright Tests"** launch
5. Click to expand and see test results!

## Advanced Configuration

### Adding Custom Attributes

Attributes = **Tags** for filtering tests.

```typescript
reporter: [
  ['@reportportal/agent-js-playwright', {
    apiKey: process.env.RP_TOKEN,
    endpoint: process.env.RP_ENDPOINT,
    project: process.env.RP_PROJECT,
    
    attributes: [
      { key: 'team', value: 'qa-frontend' },
      { key: 'priority', value: 'high' },
      { key: 'sprint', value: 'sprint-42' },
      { key: 'product', value: 'ecommerce' },
    ],
  }]
],
```

**Use case:** Filter launches by team, sprint, or priority in ReportPortal!

### Environment-Specific Launches

```typescript
const getLaunchName = () => {
  const env = process.env.NODE_ENV || 'local';
  const timestamp = new Date().toISOString().split('T')[0];
  return `Playwright [${env}] - ${timestamp}`;
};

export default defineConfig({
  reporter: [
    ['@reportportal/agent-js-playwright', {
      launch: getLaunchName(),
      // ... other config
    }]
  ],
});
```

**Result:**
- `Playwright [local] - 2026-02-08`
- `Playwright [staging] - 2026-02-08`
- `Playwright [production] - 2026-02-08`

### Conditional Reporting (Only on CI)

```typescript
const reporters: any[] = [['list'], ['html']];

// Only send to ReportPortal when running on CI
if (process.env.CI) {
  reporters.push(['@reportportal/agent-js-playwright', {
    apiKey: process.env.RP_TOKEN,
    endpoint: process.env.RP_ENDPOINT,
    project: process.env.RP_PROJECT,
    launch: 'CI Tests',
  }]);
}

export default defineConfig({
  reporter: reporters,
});
```

**Benefit:** Local runs don't pollute ReportPortal with dev experiments!

---

# 15. Integrating Pytest Tests

## Step-by-Step Integration

### Step 1: Install Reporter Package

```bash
pip install pytest-reportportal
```

### Step 2: Create requirements.txt

```txt
pytest==7.4.3
pytest-reportportal==5.3.5
python-dotenv==1.0.0
requests==2.31.0
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### Step 3: Create pytest.ini

```ini
[pytest]
# ReportPortal Configuration
rp_endpoint = http://localhost:8080
rp_project = demo-automation
rp_launch = Pytest Local Tests
rp_launch_description = Automated tests using Pytest framework

# Upload attachments
rp_log_batch_size = 20
rp_log_batch_payload_limit = 65536461

# Test execution
addopts = --verbose --tb=short

# Markers
markers =
    smoke: Smoke test cases
    regression: Regression test suite
    api: API tests
    ui: UI tests
```

### Step 4: Create .env File

```bash
RP_API_KEY=your-token-here
RP_ENDPOINT=http://localhost:8080
RP_PROJECT=demo-automation
```

### Step 5: Create conftest.py (Load Env Variables)

```python
# tests/conftest.py
import os
import pytest
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Configure pytest-reportportal
def pytest_configure(config):
    # Set ReportPortal configuration from environment
    config.option.rp_api_key = os.getenv('RP_API_KEY')
    config.option.rp_endpoint = os.getenv('RP_ENDPOINT')
    config.option.rp_project = os.getenv('RP_PROJECT')

@pytest.fixture
def app_url():
    """Base URL for application under test"""
    return os.getenv('APP_URL', 'https://demo.playwright.dev')
```

### Step 6: Create Test File

Create `tests/test_example.py`:

```python
import pytest
import requests

@pytest.mark.smoke
def test_homepage_loads(app_url):
    """Test that homepage loads successfully"""
    response = requests.get(app_url)
    assert response.status_code == 200
    assert 'Playwright' in response.text

@pytest.mark.regression
def test_api_endpoint():
    """Test API endpoint"""
    response = requests.get('https://jsonplaceholder.typicode.com/users/1')
    assert response.status_code == 200
    data = response.json()
    assert data['id'] == 1
    assert 'name' in data

@pytest.mark.api
def test_intentional_failure():
    """Intentional failure to demonstrate error reporting"""
    assert 1 == 2, "This test is designed to fail"
```

### Step 7: Run Tests with ReportPortal

```bash
pytest --reportportal
```

**Console output:**

```
tests/test_example.py::test_homepage_loads PASSED
tests/test_example.py::test_api_endpoint PASSED
tests/test_example.py::test_intentional_failure FAILED

ReportPortal: Launch link: http://localhost:8080/ui/#demo-automation/launches/all
```

### Step 8: Verify in ReportPortal

1. Open the link from console output
2. See your test launch with:
   - ✅ 2 passed tests
   - ❌ 1 failed test with error details

## Advanced Pytest Configuration

### Adding Test Description

```python
@pytest.mark.smoke
def test_login_success():
    """
    Test Case: Verify successful login
    
    Preconditions:
    - User account exists in database
    - Application is accessible
    
    Steps:
    1. Navigate to login page
    2. Enter valid credentials
    3. Click login button
    
    Expected Result:
    - User is redirected to dashboard
    - Welcome message displayed
    """
    # Test implementation
    pass
```

**Result:** Description appears in ReportPortal test details!

### Attaching Screenshots

```python
import pytest
from reportportal_client import RPLogger
import logging

@pytest.fixture
def rp_logger():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    return RPLogger(logger)

def test_with_screenshot(rp_logger):
    # Your test code
    
    # Attach screenshot on failure
    with open('screenshot.png', 'rb') as image_file:
        rp_logger.info(
            "Screenshot on failure",
            attachment={
                "name": "failure_screenshot.png",
                "data": image_file,
                "mime": "image/png"
            }
        )
```

### Parametrized Tests

```python
@pytest.mark.parametrize("username,password", [
    ("user1", "pass1"),
    ("user2", "pass2"),
    ("user3", "pass3"),
])
def test_login_multiple_users(username, password):
    # Test with different user combinations
    pass
```

**Result:** ReportPortal shows 3 separate test executions!

---

# 16. GitHub Actions Integration

## Complete Workflow Example

Create `.github/workflows/tests.yml`:

```yaml
name: Automated Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch:  # Manual trigger

jobs:
  playwright-tests:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        env:
          RP_TOKEN: ${{ secrets.RP_TOKEN }}
          RP_ENDPOINT: ${{ secrets.RP_ENDPOINT }}
          RP_PROJECT: demo-automation
          RP_LAUNCH: "GitHub Actions - ${{ github.ref_name }}"
          NODE_ENV: ci
        run: npx playwright test

      - name: Upload test artifacts
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

## Adding Secrets to GitHub

### Step 1: Get ReportPortal Token

1. Login to ReportPortal
2. Profile → API Keys → Generate Token
3. Copy token

### Step 2: Add to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings**
3. Left sidebar: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add secrets:

| Name | Value |
|------|-------|
| `RP_TOKEN` | Your API token |
| `RP_ENDPOINT` | `http://your-reportportal-server:8080` |

### Step 3: Use Secrets in Workflow

```yaml
env:
  RP_TOKEN: ${{ secrets.RP_TOKEN }}
  RP_ENDPOINT: ${{ secrets.RP_ENDPOINT }}
```

**Security:** Secrets are masked in logs (`***`)!

## Self-Hosted Runner for ReportPortal

**Problem:** GitHub Actions runners can't access `localhost:8080`!

**Solutions:**

### Option 1: Use Self-Hosted Runner

**Steps:**

1. Go to repository **Settings** → **Actions** → **Runners**
2. Click **New self-hosted runner**
3. Follow instructions to install runner on server with ReportPortal
4. Update workflow:

```yaml
jobs:
  test:
    runs-on: self-hosted  # Instead of ubuntu-latest
```

**Benefit:** Runner can access `localhost:8080`!

### Option 2: Make ReportPortal Publicly Accessible

**Using ngrok (Temporary):**

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from https://ngrok.com

# Expose ReportPortal
ngrok http 8080
```

**Output:**

```
Forwarding: https://abc123.ngrok.io -> http://localhost:8080
```

Update GitHub secret `RP_ENDPOINT`:

```
https://abc123.ngrok.io
```

**Limitation:** Free ngrok URLs change on restart!

### Option 3: Deploy ReportPortal to Cloud

Deploy ReportPortal on:
- AWS EC2
- Azure VM
- DigitalOcean Droplet
- Google Cloud Compute Engine

Then use public IP:

```
RP_ENDPOINT=http://52.12.34.56:8080
```

## Advanced Workflow: Matrix Strategy

Run tests on multiple browsers/OS:

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        browser: [chromium, firefox, webkit]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run tests
        env:
          RP_LAUNCH: "CI [${{ matrix.os }}] [${{ matrix.browser }}]"
        run: npx playwright test --project=${{ matrix.browser }}
```

**Result:** 9 separate launches in ReportPortal (3 OS × 3 browsers)!

---

# 17. How Results Flow to ReportPortal

## Complete Data Flow

```
┌─────────────────────────────────────────────────────┐
│                 Your Test Suite                      │
│  (Playwright, Pytest, Selenium, etc.)               │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Test executes and captures:
                 │ - Test name
                 │ - Status (pass/fail/skip)
                 │ - Duration
                 │ - Error messages
                 │ - Stack traces
                 │ - Screenshots
                 │ - Logs
                 │
                 ↓
┌─────────────────────────────────────────────────────┐
│           ReportPortal Reporter/Agent                │
│  (@reportportal/agent-js-playwright or              │
│   pytest-reportportal)                              │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Formats data as JSON and sends:
                 │
                 │ POST /api/v1/{project}/launch
                 │ {
                 │   "name": "Nightly Tests",
                 │   "startTime": "2026-02-08T10:00:00Z",
                 │   "attributes": [...]
                 │ }
                 │
                 ↓
┌─────────────────────────────────────────────────────┐
│              ReportPortal API Service                │
│                  (port 8585)                         │
│                                                      │
│  1. Validates API token                             │
│  2. Checks project exists                           │
│  3. Processes test data                            │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Saves to database
                 ↓
┌─────────────────────────────────────────────────────┐
│               PostgreSQL Database                    │
│                                                      │
│  Tables:                                            │
│  - launch (test runs)                              │
│  - test_item (individual tests)                    │
│  - log (test logs)                                 │
│  - attachment (screenshots, files)                 │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Queues background jobs
                 ↓
┌─────────────────────────────────────────────────────┐
│                    RabbitMQ                         │
│            (Message Queue Service)                  │
│                                                      │
│  Queues jobs:                                       │
│  - Analyze test failures                           │
│  - Update statistics                               │
│  - Send notifications                              │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Jobs processed by
                 ↓
┌─────────────────────────────────────────────────────┐
│          Jobs Service + Analyzer                    │
│                                                      │
│  - AI analyzes error messages                      │
│  - Finds similar failures                          │
│  - Categorizes defects                             │
│  - Calculates flaky test rate                      │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Uploads media to
                 ↓
┌─────────────────────────────────────────────────────┐
│           MinIO (Object Storage)                    │
│                                                      │
│  Stores:                                            │
│  - Screenshots (PNG/JPG)                           │
│  - Videos (MP4)                                    │
│  - Traces (ZIP)                                    │
│  - Logs (TXT)                                      │
└────────────────┬────────────────────────────────────┘
                 │
                 │ Indexes for search
                 ↓
┌─────────────────────────────────────────────────────┐
│               Elasticsearch                         │
│                                                      │
│  Indexes:                                           │
│  - Test names (for fast search)                    │
│  - Log messages                                    │
│  - Error texts                                     │
└────────────────┬────────────────────────────────────┘
                 │
                 │ UI fetches data via API
                 ↓
┌─────────────────────────────────────────────────────┐
│           ReportPortal UI (Web Interface)           │
│                   (port 8080)                       │
│                                                      │
│  You see:                                           │
│  - Launches list                                   │
│  - Test results                                    │
│  - Dashboards                                      │
│  - Screenshots                                     │
└─────────────────────────────────────────────────────┘
```

## Timeline: How Fast?

```
T+0s   : Test completes
T+0.5s : Reporter sends HTTP POST to API
T+1s   : Data saved to PostgreSQL
T+1.5s : RabbitMQ queues analysis job
T+2s   : Jobs service picks up job
T+3s   : AI analyzer processes failure
T+4s   : Screenshot uploaded to MinIO
T+5s   : Results indexed in Elasticsearch
T+6s   : UI refreshes and shows new data ✅
```

**Total latency:** ~6 seconds from test completion to dashboard visibility!

## API Endpoints Used

### 1. Start Launch

```http
POST /api/v1/{project}/launch
Content-Type: application/json
Authorization: Bearer {api_token}

{
  "name": "Nightly Regression",
  "startTime": "2026-02-08T10:00:00.000Z",
  "description": "Automated nightly tests",
  "attributes": [
    {"key": "environment", "value": "staging"},
    {"key": "browser", "value": "chromium"}
  ],
  "mode": "DEFAULT"
}
```

**Response:**

```json
{
  "id": "launch-uuid-12345"
}
```

### 2. Start Test

```http
POST /api/v1/{project}/item
{
  "launchUuid": "launch-uuid-12345",
  "name": "Login Test",
  "startTime": "2026-02-08T10:00:05.000Z",
  "type": "TEST"
}
```

### 3. Finish Test

```http
PUT /api/v1/{project}/item/{itemId}
{
  "endTime": "2026-02-08T10:00:15.000Z",
  "status": "PASSED",  // or FAILED, SKIPPED
  "description": "Test completed successfully"
}
```

### 4. Add Log

```http
POST /api/v1/{project}/log
{
  "itemUuid": "test-uuid-67890",
  "time": "2026-02-08T10:00:10.000Z",
  "message": "Clicked login button",
  "level": "INFO"
}
```

### 5. Upload Screenshot

```http
POST /api/v1/{project}/log
Content-Type: multipart/form-data

file: screenshot.png
json_request_part: {
  "itemUuid": "test-uuid-67890",
  "time": "2026-02-08T10:00:12.000Z",
  "message": "Screenshot on failure",
  "level": "ERROR"
}
```

### 6. Finish Launch

```http
PUT /api/v1/{project}/launch/{launchId}/finish
{
  "endTime": "2026-02-08T10:05:00.000Z"
}
```

---

# 18. Different Ways to Publish Results

## Method 1: Direct Agent Integration (Recommended)

**How it works:** Test framework plugin sends results in real-time during execution.

### Supported Frameworks

| Framework | Package | Language |
|-----------|---------|----------|
| Playwright | `@reportportal/agent-js-playwright` | TypeScript/JavaScript |
| Pytest | `pytest-reportportal` | Python |
| Selenium (Python) | `pytest-reportportal` | Python |
| TestNG | `agent-java-testng` | Java |
| JUnit5 | `agent-java-junit5` | Java |
| Cucumber | `agent-java-cucumber6` | Java |
| Cypress | `@reportportal/agent-js-cypress` | JavaScript |

**Pros:**
- ✅ Real-time reporting (see tests as they run)
- ✅ Automatic screenshot/log upload
- ✅ No post-processing needed
- ✅ Most accurate timing

**Cons:**
- ❌ Requires framework support
- ❌ Adds small overhead to test execution

**Best for:** Active test development and CI/CD pipelines.

---

## Method 2: Upload Result Files via CLI

**How it works:** Run tests first, then upload JUnit XML/JSON results.

### Using ReportPortal CLI

Install CLI tool:

```bash
npm install -g @reportportal/cli
```

Generate JUnit XML from tests:

```bash
# Playwright
npx playwright test --reporter=junit

# Pytest
pytest --junitxml=results.xml
```

Upload to ReportPortal:

```bash
rpctl launch import \
  --endpoint http://localhost:8080 \
  --token your-api-token \
  --project demo-automation \
  --file results.xml \
  --format junit
```

**Pros:**
- ✅ Works with any test framework
- ✅ No code changes needed
- ✅ Can process old test results

**Cons:**
- ❌ Not real-time
- ❌ No screenshots/logs (unless manually attached)
- ❌ Extra step in CI pipeline

**Best for:** Legacy test suites or frameworks without native ReportPortal support.

---

## Method 3: CI/CD Plugin Integration

### Jenkins Plugin

Install ReportPortal Jenkins plugin:

```groovy
// Jenkinsfile
pipeline {
  agent any
  
  stages {
    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
  
  post {
    always {
      // Auto-upload results to ReportPortal
      reportPortal(
        endpoint: 'http://reportportal:8080',
        token: credentials('rp-token'),
        project: 'demo-automation'
      )
    }
  }
}
```

### GitLab CI Integration

```yaml
# .gitlab-ci.yml
test:
  stage: test
  script:
    - npm ci
    - npx playwright test --reporter=junit
  
  after_script:
    - curl -X POST http://reportportal:8080/api/v1/demo-automation/launch/import \
        -H "Authorization: Bearer $RP_TOKEN" \
        -F "file=@results.xml"
  
  artifacts:
    reports:
      junit: results.xml
```

**Pros:**
- ✅ Integrated with CI/CD platform
- ✅ Centralized configuration
- ✅ Automatic on every build

**Cons:**
- ❌ Plugin maintenance required
- ❌ Platform-specific

**Best for:** Organizations standardized on specific CI platform.

---

## Method 4: Custom API Integration

**How it works:** Write custom scripts to send data via ReportPortal REST API.

### Example: Custom Python Script

```python
import requests
import json
from datetime import datetime

class ReportPortalClient:
    def __init__(self, endpoint, token, project):
        self.endpoint = endpoint
        self.token = token
        self.project = project
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def start_launch(self, name):
        url = f"{self.endpoint}/api/v1/{self.project}/launch"
        payload = {
            "name": name,
            "startTime": datetime.utcnow().isoformat() + "Z",
            "mode": "DEFAULT"
        }
        response = requests.post(url, headers=self.headers, json=payload)
        return response.json()['id']
    
    def start_test(self, launch_id, test_name):
        url = f"{self.endpoint}/api/v1/{self.project}/item"
        payload = {
            "launchUuid": launch_id,
            "name": test_name,
            "startTime": datetime.utcnow().isoformat() + "Z",
            "type": "TEST"
        }
        response = requests.post(url, headers=self.headers, json=payload)
        return response.json()['id']
    
    def finish_test(self, test_id, status):
        url = f"{self.endpoint}/api/v1/{self.project}/item/{test_id}"
        payload = {
            "endTime": datetime.utcnow().isoformat() + "Z",
            "status": status  # PASSED, FAILED, SKIPPED
        }
        requests.put(url, headers=self.headers, json=payload)
    
    def finish_launch(self, launch_id):
        url = f"{self.endpoint}/api/v1/{self.project}/launch/{launch_id}/finish"
        payload = {
            "endTime": datetime.utcnow().isoformat() + "Z"
        }
        requests.put(url, headers=self.headers, json=payload)

# Usage
client = ReportPortalClient(
    endpoint='http://localhost:8080',
    token='your-api-token',
    project='demo-automation'
)

# Start launch
launch_id = client.start_launch("Custom API Test Run")

# Start test
test_id = client.start_test(launch_id, "My Custom Test")

# Finish test
client.finish_test(test_id, "PASSED")

# Finish launch
client.finish_launch(launch_id)
```

**Pros:**
- ✅ Complete control over data
- ✅ Works with proprietary frameworks
- ✅ Can aggregate multiple sources

**Cons:**
- ❌ Requires coding effort
- ❌ Must maintain custom code
- ❌ No built-in features (retry logic, batching)

**Best for:** Organizations with custom test frameworks or unique reporting needs.

---

## Comparison Table

| Method | Real-Time | Setup Effort | Screenshots | Logs | Best Use Case |
|--------|-----------|--------------|-------------|------|---------------|
| **Direct Agent** | ✅ Yes | Low | ✅ Auto | ✅ Auto | Active development |
| **Upload Files** | ❌ No | Very Low | ❌ Manual | ❌ Manual | Legacy suites |
| **CI Plugin** | ⚠️ Partial | Medium | ⚠️ Depends | ⚠️ Depends | Jenkins/GitLab users |
| **Custom API** | ✅ Yes | High | ✅ Manual | ✅ Manual | Custom frameworks |

---

# 19. Production Architecture

## Recommended Production Setup

```
┌──────────────────────────────────────────────────────────┐
│                   GitHub Repository                       │
│                  (Your Test Code)                        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Push triggers
                     ↓
┌──────────────────────────────────────────────────────────┐
│                  GitHub Actions                          │
│              (CI/CD Orchestration)                       │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Runs tests on
                     ↓
┌──────────────────────────────────────────────────────────┐
│              Self-Hosted Runner (EC2/VM)                 │
│                                                          │
│  ┌────────────────────────────────────────────┐         │
│  │    Docker Containers                        │         │
│  │                                            │         │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────┐ │         │
│  │  │ Playwright│  │  Pytest  │  │ Selenium│ │         │
│  │  └──────────┘  └──────────┘  └─────────┘ │         │
│  └────────────────────────────────────────────┘         │
│                     ↓                                    │
│                 Runs tests                               │
│                     ↓                                    │
│              Reports to RP                               │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Sends results via HTTP
                     ↓
┌──────────────────────────────────────────────────────────┐
│         ReportPortal Server (AWS EC2 / Azure VM)        │
│                                                          │
│  ┌────────────────────────────────────────────┐         │
│  │       Docker Compose Stack                  │         │
│  │                                            │         │
│  │  • PostgreSQL (RDS for production)         │         │
│  │  • Elasticsearch                           │         │
│  │  • RabbitMQ                                │         │
│  │  • MinIO (S3 for production)              │         │
│  │  • API Service                             │         │
│  │  • UI Service                              │         │
│  │  • Jobs Service                            │         │
│  │  • Analyzer                                │         │
│  └────────────────────────────────────────────┘         │
│                                                          │
│  Exposed via:                                           │
│  • nginx reverse proxy                                  │
│  • SSL certificate (Let's Encrypt)                     │
│  • Domain: reportportal.yourcompany.com                │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Accessed by
                     ↓
┌──────────────────────────────────────────────────────────┐
│                      Team Members                        │
│                                                          │
│  QA Engineers     Developers     Managers                │
│  └─ View reports  └─ Check CI    └─ Dashboards          │
└──────────────────────────────────────────────────────────┘
```

## Production Checklist

### Infrastructure

- [ ] **Dedicated Server/VM**
  - AWS EC2 t3.xlarge (4 vCPU, 16 GB RAM) minimum
  - Or equivalent Azure/GCP instance

- [ ] **Persistent Storage**
  - 100 GB SSD for Docker volumes
  - EBS snapshots enabled (AWS)

- [ ] **Database**
  - Use AWS RDS PostgreSQL instead of Docker container
  - Enable automated backups
  - Multi-AZ for high availability

- [ ] **Object Storage**
  - Use AWS S3 instead of MinIO
  - Enable versioning
  - Lifecycle policy to archive old files

- [ ] **Networking**
  - Static IP or Elastic IP
  - Security group: Allow ports 80, 443 only
  - VPC with private subnet for database

### Security

- [ ] **SSL Certificate**
  - Use Let's Encrypt (free)
  - Auto-renewal configured

- [ ] **Reverse Proxy**
  - nginx or Traefik
  - Rate limiting enabled
  - DDoS protection

- [ ] **Authentication**
  - Change default passwords
  - Enforce strong password policy
  - LDAP/SAML integration for enterprise

- [ ] **API Token Management**
  - Rotate tokens every 90 days
  - Use separate tokens per service
  - Revoke unused tokens

### Monitoring

- [ ] **Uptime Monitoring**
  - UptimeRobot or Pingdom
  - Alert on downtime

- [ ] **Log Aggregation**
  - CloudWatch Logs (AWS)
  - Elasticsearch with Kibana
  - Retention: 30 days

- [ ] **Metrics**
  - CPU/RAM/Disk usage
  - API response times
  - Test result volume

### Backup

- [ ] **Daily Automated Backups**
  - PostgreSQL: pg_dump
  - MinIO/S3: Bucket replication
  - Docker volumes: Snapshot

- [ ] **Backup Retention**
  - Daily: 7 days
  - Weekly: 4 weeks
  - Monthly: 12 months

### Capacity Planning

| Users | Tests/Day | Recommended Instance |
|-------|-----------|---------------------|
| 1-10 | < 1,000 | t3.large (2 vCPU, 8 GB) |
| 10-50 | 1,000-5,000 | t3.xlarge (4 vCPU, 16 GB) |
| 50-200 | 5,000-20,000 | t3.2xlarge (8 vCPU, 32 GB) |
| 200+ | 20,000+ | m5.4xlarge (16 vCPU, 64 GB) |

---

# 20. Common Issues & Fixes

## Issue 1: ReportPortal Not Starting

### Symptoms

```bash
docker compose ps
# All containers show "Restarting" or "Exited"
```

### Diagnosis

```bash
# Check logs
docker compose logs

# Common errors:
# - "Out of memory"
# - "Cannot allocate memory"
# - "Port already in use"
```

### Solutions

**A. Insufficient Memory**

```bash
# Check available memory
free -h

# Increase Docker memory (Docker Desktop)
# Settings → Resources → Memory → 8 GB minimum
```

**B. Port Conflict**

```bash
# Find process using port 8080
sudo lsof -i :8080

# Kill process
sudo kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "9090:8080"  # Use 9090 instead
```

**C. Elasticsearch Memory Error**

Edit `docker-compose.yml`:

```yaml
elasticsearch:
  environment:
    - "ES_JAVA_OPTS=-Xms2g -Xmx2g"  # Allocate 2 GB to ES
```

Restart:

```bash
docker compose down
docker compose up -d
```

---

## Issue 2: Can't Login (Password Doesn't Work)

### Symptoms

- "Invalid credentials" error
- Forgot password
- Account locked

### Solutions

**A. Reset via SuperAdmin**

1. Login as `superadmin` / `erebus`
2. Go to **Administration** → **Users**
3. Find user
4. Click **Edit**
5. Change password
6. Click **Save**

**B. Reset via Database (Nuclear Option)**

```bash
# Connect to PostgreSQL container
docker exec -it reportportal-postgres-1 psql -U rpuser -d reportportal

# Reset 'default' user password to '1q2w3e'
UPDATE users SET password = '$2a$10$...' WHERE login = 'default';
```

**⚠️ Warning:** This requires knowing bcrypt hash. Easier to use superadmin method!

**C. Recreate Container (Fresh Start)**

```bash
# ⚠️ This deletes ALL data!
docker compose down -v
docker compose up -d
```

---

## Issue 3: Tests Not Appearing in ReportPortal

### Symptoms

- Tests run successfully locally
- No errors in console
- But results don't show in ReportPortal UI

### Diagnosis Checklist

```bash
# 1. Check API token is correct
echo $RP_TOKEN

# 2. Check endpoint is reachable
curl http://localhost:8080/api/v1/demo-automation/launch

# 3. Check project name matches
# In ReportPortal: Settings → General → Project Name

# 4. Check reporter is installed
npm list @reportportal/agent-js-playwright

# 5. Check network connectivity
ping localhost
telnet localhost 8080
```

### Solutions

**A. Wrong Endpoint URL**

```typescript
// ❌ Wrong
endpoint: 'http://localhost:8080/api/v1'

// ✅ Correct
endpoint: 'http://localhost:8080'
```

**B. Invalid API Token**

```bash
# Regenerate token
# 1. Login to ReportPortal
# 2. Profile → API Keys → Generate
# 3. Update .env file
echo "RP_TOKEN=new-token-here" >> .env
```

**C. Project Name Mismatch**

```typescript
// Config says:
project: 'demo-automation'

// But ReportPortal project is actually:
// 'demo_automation' (underscore instead of dash)

// Fix: Use exact name from ReportPortal
project: 'demo_automation'
```

**D. Reporter Not Enabled**

```typescript
// Make sure reporter is in config
reporter: [
  ['list'],
  ['@reportportal/agent-js-playwright', { ... }]  // Must be here!
],
```

**E. CI Can't Access Localhost**

```yaml
# If running on GitHub Actions:
# ❌ Won't work:
RP_ENDPOINT: http://localhost:8080

# ✅ Use self-hosted runner or public IP:
RP_ENDPOINT: http://52.12.34.56:8080
```

---

## Issue 4: Elasticsearch Failure

### Symptoms

```bash
# Logs show:
elasticsearch_1  | OpenJDK 64-Bit Server VM warning: INFO: os::commit_memory failed
elasticsearch_1  | There is insufficient memory for the Java Runtime Environment to continue.
```

### Solution

Edit `docker-compose.yml`:

```yaml
elasticsearch:
  environment:
    - discovery.type=single-node
    - bootstrap.memory_lock=true
    - "ES_JAVA_OPTS=-Xms1g -Xmx1g"  # Reduce if needed
  ulimits:
    memlock:
      soft: -1
      hard: -1
```

On Linux, increase vm.max_map_count:

```bash
sudo sysctl -w vm.max_map_count=262144

# Make permanent
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
```

---

## Issue 5: Containers Keep Restarting

### Symptoms

```bash
docker compose ps
# Shows containers with "Restarting" status
```

### Diagnosis

```bash
# Check logs for specific service
docker compose logs api
docker compose logs postgres
docker compose logs elasticsearch

# Look for errors like:
# - Out of memory
# - Connection refused
# - Can't connect to database
```

### Solutions

**A. Memory Exhaustion**

```bash
# Check memory usage
docker stats

# If any service uses >80% memory consistently:
# 1. Increase Docker memory allocation
# 2. Or use smaller instance types in docker-compose.yml
```

**B. Dependency Order**

Services start too quickly. Add health checks:

```yaml
api:
  depends_on:
    postgres:
      condition: service_healthy
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8585/health"]
    interval: 30s
    timeout: 10s
    retries: 5
```

---

## Issue 6: CI Can't Connect to ReportPortal

### Symptoms

```bash
# GitHub Actions logs show:
Error: connect ECONNREFUSED 127.0.0.1:8080
```

### Root Cause

GitHub Actions runners can't access `localhost` on your machine!

### Solutions

**Option 1: Self-Hosted Runner** (Recommended)

```yaml
jobs:
  test:
    runs-on: self-hosted  # Runs on your server with ReportPortal
```

**Option 2: Deploy ReportPortal to Cloud**

Use AWS EC2 and update endpoint:

```yaml
env:
  RP_ENDPOINT: http://ec2-52-12-34-56.compute-1.amazonaws.com:8080
```

**Option 3: Use ngrok for Testing**

```bash
# On machine with ReportPortal:
ngrok http 8080

# Output: https://abc123.ngrok.io
# Update GitHub secret:
RP_ENDPOINT=https://abc123.ngrok.io
```

---

## Issue 7: Screenshots Not Showing

### Symptoms

- Tests report to ReportPortal
- But screenshots missing in UI

### Solutions

**A. Check Screenshot Capture is Enabled**

```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',  // Must be enabled
}

reporter: [
  ['@reportportal/agent-js-playwright', {
    uploadScreenshot: true,  // Must be true
  }]
],
```

**B. Check MinIO is Running**

```bash
docker compose ps | grep minio

# If not running:
docker compose restart minio
```

**C. Check Storage Space**

```bash
# Check disk usage
df -h

# If disk full, clean old data or increase storage
```

---

# 21. Maintenance & Operations

## Daily Operations

### Morning Checklist (5 minutes)

```bash
# 1. Check all services are healthy
docker compose ps

# 2. Check disk space
df -h

# 3. Quick smoke test
curl http://localhost:8080/health
```

### Monitor Key Metrics

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| CPU Usage | < 50% | 50-80% | > 80% |
| Memory Usage | < 70% | 70-85% | > 85% |
| Disk Usage | < 60% | 60-80% | > 80% |
| API Response | < 500ms | 500ms-2s | > 2s |

## Weekly Maintenance

### 1. Update Docker Images (30 minutes)

```bash
# Pull latest images
docker compose pull

# Recreate containers with new images
docker compose up -d

# Verify all services healthy
docker compose ps
```

### 2. Clean Old Data (15 minutes)

**Option A: Via ReportPortal UI**

1. Go to **Administration** → **Projects**
2. Select project
3. Go to **Settings** → **General**
4. Scroll to **Data Retention**
5. Set:
   - Keep launches: 30 days
   - Keep logs: 7 days
   - Keep attachments: 7 days
6. Click **Submit**

**Option B: Manual Cleanup**

```bash
# Find old launches (older than 30 days)
# Delete via API
curl -X DELETE http://localhost:8080/api/v1/demo-automation/launch/{launchId} \
  -H "Authorization: Bearer your-token"
```

### 3. Backup Database (20 minutes)

```bash
# Create backup
docker exec reportportal-postgres-1 pg_dump -U rpuser reportportal > backup-$(date +%F).sql

# Compress
gzip backup-$(date +%F).sql

# Upload to S3 (or backup location)
aws s3 cp backup-$(date +%F).sql.gz s3://your-backup-bucket/reportportal/
```

### 4. Review Error Logs (10 minutes)

```bash
# Check for errors
docker compose logs --since 7d | grep -i error

# Common errors to watch for:
# - OutOfMemoryError
# - Connection timeout
# - Disk full
```

## Monthly Maintenance

### 1. Security Updates (1 hour)

```bash
# Ubuntu server
sudo apt update
sudo apt upgrade -y

# Docker
sudo apt install docker.io docker-compose-plugin

# Restart services
docker compose restart
```

### 2. Performance Tuning (1 hour)

**A. Analyze Slow Queries**

```bash
# Connect to PostgreSQL
docker exec -it reportportal-postgres-1 psql -U rpuser -d reportportal

# Find slow queries
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

**B. Optimize Elasticsearch**

```bash
# Force merge old indices
curl -X POST "localhost:9200/_forcemerge?max_num_segments=1"

# Clear cache
curl -X POST "localhost:9200/_cache/clear"
```

**C. Clean Docker**

```bash
# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f

# Remove build cache
docker builder prune -f
```

### 3. Capacity Review (30 minutes)

Track growth:

```bash
# Count total launches in last 30 days
# Query PostgreSQL

# Count total test items
# Query PostgreSQL

# Calculate storage used
du -sh /var/lib/docker/volumes/reportportal_*
```

Plan scaling if:
- Launches > 1000/day → Consider larger instance
- Storage > 80% → Increase disk or clean old data
- Memory > 85% → Add more RAM

---

# 22. Backup Strategies

## What to Backup

### Critical Data (Must Backup)

1. **PostgreSQL Database**
   - All test data
   - User accounts
   - Project configurations

2. **MinIO Storage**
   - Screenshots
   - Videos
   - Traces
   - Logs

3. **Docker Volumes**
   - Elasticsearch indices
   - RabbitMQ messages

### Optional (Can Recreate)

- Docker images (pull again from Docker Hub)
- docker-compose.yml (version controlled in Git)
- Configuration files (stored in Git)

## Backup Methods

### Method 1: Database Dump (Essential)

**A. Manual Backup**

```bash
# Create backup directory
mkdir -p ~/reportportal-backups

# Backup PostgreSQL
docker exec reportportal-postgres-1 pg_dump -U rpuser reportportal \
  > ~/reportportal-backups/reportportal-$(date +%Y%m%d).sql

# Compress
gzip ~/reportportal-backups/reportportal-$(date +%Y%m%d).sql
```

**B. Automated Daily Backup**

Create `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/ubuntu/reportportal-backups"
DATE=$(date +%Y%m%d)
RETENTION_DAYS=30

# Create backup
docker exec reportportal-postgres-1 pg_dump -U rpuser reportportal | \
  gzip > "$BACKUP_DIR/reportportal-$DATE.sql.gz"

# Upload to S3
aws s3 cp "$BACKUP_DIR/reportportal-$DATE.sql.gz" \
  s3://your-backup-bucket/reportportal/

# Delete backups older than 30 days
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: reportportal-$DATE.sql.gz"
```

Make executable and schedule:

```bash
chmod +x backup.sh

# Add to crontab (run daily at 2 AM)
crontab -e

# Add line:
0 2 * * * /home/ubuntu/backup.sh >> /var/log/reportportal-backup.log 2>&1
```

### Method 2: Volume Snapshots

**A. Docker Volume Backup**

```bash
# Stop containers
docker compose down

# Backup volumes
docker run --rm \
  -v reportportal_postgres:/source \
  -v ~/backups:/backup \
  alpine tar -czf /backup/postgres-volume.tar.gz -C /source .

docker run --rm \
  -v reportportal_minio:/source \
  -v ~/backups:/backup \
  alpine tar -czf /backup/minio-volume.tar.gz -C /source .

# Start containers
docker compose up -d
```

**B. AWS EBS Snapshots** (If on EC2)

```bash
# Install AWS CLI
aws configure

# Create snapshot of EBS volume
VOLUME_ID=$(docker volume inspect reportportal_postgres -f '{{ .Mountpoint }}' | xargs df | tail -1 | awk '{print $1}')
aws ec2 create-snapshot --volume-id $VOLUME_ID --description "ReportPortal backup $(date +%F)"
```

### Method 3: MinIO/S3 Replication

If using MinIO, set up bucket replication to S3:

```bash
# Install mc (MinIO Client)
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x mc
sudo mv mc /usr/local/bin/

# Configure MinIO
mc alias set local http://localhost:9000 <ACCESS_KEY> <SECRET_KEY>

# Configure S3
mc alias set s3 https://s3.amazonaws.com <AWS_ACCESS_KEY> <AWS_SECRET_KEY>

# Mirror MinIO bucket to S3
mc mirror local/reportportal s3/reportportal-backup
```

## Restore Procedures

### Restore Database

```bash
# Stop services
docker compose down

# Start only PostgreSQL
docker compose up -d postgres

# Wait for PostgreSQL to be ready
sleep 10

# Restore from backup
gunzip < reportportal-20260208.sql.gz | \
  docker exec -i reportportal-postgres-1 psql -U rpuser -d reportportal

# Start all services
docker compose up -d
```

### Restore Volumes

```bash
# Stop containers
docker compose down

# Restore volume
docker run --rm \
  -v reportportal_postgres:/target \
  -v ~/backups:/backup \
  alpine sh -c "rm -rf /target/* /target/..?* /target/.[!.]* && tar -xzf /backup/postgres-volume.tar.gz -C /target"

# Start containers
docker compose up -d
```

## Backup Checklist

- [ ] **Daily:** PostgreSQL dump
- [ ] **Weekly:** Full volume snapshot
- [ ] **Monthly:** Test restore procedure
- [ ] **Quarterly:** Off-site backup verification
- [ ] **Retention:** Keep daily backups for 7 days, weekly for 4 weeks, monthly for 12 months

---

# 23. Security Best Practices

## Authentication

### 1. Change Default Passwords Immediately

```bash
# Default accounts:
# superadmin / erebus → Change to strong password
# default / 1q2w3e → Change or disable
```

### 2. Enforce Strong Password Policy

**Requirements:**
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Not based on username or email

### 3. Enable LDAP/SAML for Enterprise

**For Active Directory:**

1. Go to **Administration** → **Server Settings**
2. Scroll to **LDAP Configuration**
3. Fill details:
   - LDAP URL: `ldap://ad.yourcompany.com:389`
   - Base DN: `DC=yourcompany,DC=com`
   - Manager DN: `CN=ldapuser,OU=Service Accounts,DC=yourcompany,DC=com`

### 4. Implement API Token Rotation

```bash
# Rotate every 90 days
# Document in your runbook:

# 1. Generate new token
# 2. Update secrets in GitHub/Jenkins
# 3. Wait 24 hours
# 4. Revoke old token
```

## Network Security

### 1. Use Reverse Proxy

**nginx configuration:**

```nginx
# /etc/nginx/sites-available/reportportal
server {
    listen 80;
    server_name reportportal.yourcompany.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name reportportal.yourcompany.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/reportportal.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/reportportal.yourcompany.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy to ReportPortal
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=rp_limit:10m rate=10r/s;
    limit_req zone=rp_limit burst=20;
}
```

Enable configuration:

```bash
sudo ln -s /etc/nginx/sites-available/reportportal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Obtain SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d reportportal.yourcompany.com

# Auto-renewal (already scheduled by Certbot)
# Test renewal:
sudo certbot renew --dry-run
```

### 3. Configure Firewall

```bash
# Ubuntu: ufw
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP (redirects to HTTPS)
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# Block direct access to ReportPortal ports
sudo ufw deny 8080/tcp
sudo ufw deny 8585/tcp
```

### 4. VPN for Admin Access

**For production:**
- Admin panel behind VPN
- Direct database access via SSH tunnel only
- No public PostgreSQL port

## Data Protection

### 1. Encrypt Sensitive Data

**Environment variables:**

```bash
# ❌ Don't store plaintext secrets in docker-compose.yml
environment:
  - PASSWORD=mypassword

# ✅ Use Docker secrets
secrets:
  db_password:
    external: true

# Create secret:
echo "mypassword" | docker secret create db_password -
```

### 2. Secure API Tokens

**GitHub:**
```yaml
# ✅ Store in GitHub Secrets
env:
  RP_TOKEN: ${{ secrets.RP_TOKEN }}

# ❌ Never commit to code
env:
  RP_TOKEN: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"
```

### 3. Regular Vulnerability Scans

```bash
# Scan Docker images
docker scan reportportal/service-ui

# Update regularly
docker compose pull
```

## Compliance

### GDPR Considerations

If handling personal data:

1. **Right to be forgotten:**
   - Implement user data deletion workflow
   - Include test logs, attachments

2. **Data retention:**
   - Delete launches older than policy (e.g., 90 days)
   - Anonymize or delete user accounts

3. **Audit logs:**
   - Track who accessed what data
   - Enable PostgreSQL audit logging

---

# 24. Cost Considerations

## Self-Hosted Cost Breakdown

### AWS Example (Monthly)

| Component | Instance Type | Cost |
|-----------|---------------|------|
| EC2 Instance | t3.xlarge (4 vCPU, 16 GB) | $122 |
| EBS Storage | 100 GB SSD | $10 |
| S3 Storage | 50 GB (screenshots) | $1.15 |
| Data Transfer | 1 TB outbound | $90 |
| **Total** | | **~$223/month** |

**Scaling:**
- 50 users, 5000 tests/day
- Storage cleanup after 30 days

### Compare with SaaS

| Option | Cost/Month | Pros | Cons |
|--------|------------|------|------|
| **Self-Hosted** | $223 | Full control, unlimited | Maintenance required |
| **ReportPortal SaaS** | $500+ | Managed, auto-updates | Less control, data offsite |
| **Commercial Alternatives** | $1000+ | Enterprise support | Very expensive |

**ROI:** Self-hosted saves ~$3,300/year!

## Cost Optimization

### 1. Use Spot Instances (AWS)

```bash
# Deploy ReportPortal on Spot instance
# Use Spot fleet with Persistent Request
# Savings: Up to 70% off on-demand price

# Example: t3.xlarge
# On-Demand: $0.1664/hour = $122/month
# Spot: $0.050/hour = $36/month
# Savings: $86/month
```

### 2. Implement Data Cleanup

```bash
# Auto-delete old attachments
# Saves S3 storage costs

# Keep only last 7 days of screenshots
# Estimated savings: $5-10/month
```

### 3. Use Reserved Instances (1-year commit)

```bash
# t3.xlarge Reserved Instance
# 1-year: $75/month (38% savings)
# 3-year: $46/month (62% savings)
```

### 4. Use CloudFront CDN (AWS)

```bash
# Cache static assets
# Reduce data transfer costs
# Estimated savings: $20-30/month
```

---

# 25. Real-World Example

## Scenario: E-Commerce Testing Team

**Company:** OnlineShop Inc.  
**Team Size:** 15 QA engineers  
**Test Suite:** 2,500 automated tests (Playwright + Pytest)  
**Execution:** 3 times/day (morning, afternoon, night)

## Before ReportPortal

### Challenges

```
❌ Test results scattered across:
   - Jenkins HTML reports
   - Playwright HTML reports
   - Pytest terminal output
   - Email notifications

❌ No historical visibility:
   - Can't compare today vs yesterday
   - No trend analysis
   - Manual tracking in Excel

❌ Debugging failures:
   - Find Jenkins build → Download artifacts → Open HTML
   - 10-15 minutes per failure
   - Screenshots lost after 7 days

❌ Reporting to management:
   - Manually create weekly reports
   - Copy/paste screenshots
   - 2 hours every Friday
```

**Time wasted:** ~10 hours/week per person × 15 people = **150 hours/week**

## After ReportPortal

### Implementation (Week 1)

**Day 1:** Install ReportPortal on AWS EC2  
**Day 2:** Configure projects and users  
**Day 3:** Integrate Playwright tests  
**Day 4:** Integrate Pytest tests  
**Day 5:** Set up GitHub Actions  

### Results (After 1 Month)

```
✅ Centralized dashboard:
   - All results in one place
   - Real-time visibility
   - Click to see failure details

✅ Historical trends:
   - Compare last 100 runs
   - Identify flaky tests (auto-detected!)
   - Stability metrics

✅ Faster debugging:
   - Screenshots embedded in failure
   - Logs right there
   - 2-3 minutes per failure

✅ Automated reporting:
   - Dashboards shared with managers
   - No manual reports needed
   - 0 hours/week
```

**Time saved:** 140 hours/week

## Cost-Benefit Analysis

### Investment

| Item | Cost |
|------|------|
| AWS EC2 (t3.xlarge) | $122/month |
| Storage & bandwidth | $100/month |
| Setup time | 40 hours (one-time) |
| **Total recurring** | **$222/month** |

### Savings

| Category | Hours Saved/Week | Value (@$50/hour) |
|----------|------------------|-------------------|
| Debugging time | 112 hours | $5,600 |
| Reporting time | 30 hours | $1,500 |
| **Total** | **142 hours** | **$7,100/week** |

**Monthly savings:** $28,400  
**ROI:** $28,400 - $222 = **$28,178/month saved!**

**Payback period:** < 1 day! 🎯

## Key Metrics (After 3 Months)

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Mean time to failure investigation** | 15 min | 3 min | 80% faster |
| **Flaky tests identified** | Unknown | 47 tests | 100% visibility |
| **Tests per day** | 7,500 | 7,500 | - |
| **False positives** | 15% | 5% | 67% reduction |
| **Team satisfaction** | 6/10 | 9/10 | +50% |

---

# 26. Practice Exercise

## Challenge: Set Up Complete ReportPortal Environment

**Goal:** Build production-like ReportPortal setup with Playwright integration.

**Time:** 2-3 hours

---

### Part 1: Installation (30 minutes)

**Tasks:**

1. [ ] Install Docker on your machine
2. [ ] Download ReportPortal docker-compose.yml
3. [ ] Start ReportPortal services
4. [ ] Verify all 8 containers running
5. [ ] Access UI at http://localhost:8080

**Success Criteria:**
- All containers show `Up (healthy)` status
- Login page loads in browser

---

### Part 2: Configuration (30 minutes)

**Tasks:**

1. [ ] Login as `superadmin` / `erebus`
2. [ ] Change superadmin password
3. [ ] Create new project: `practice-automation`
4. [ ] Create new user: `your-name@example.com`
5. [ ] Assign user to project as MEMBER
6. [ ] Generate API token for your user

**Success Criteria:**
- New project visible in Projects list
- Can login with new user account
- API token copied to notepad

---

### Part 3: Test Integration (45 minutes)

**Tasks:**

1. [ ] Create new Playwright project:
   ```bash
   npm init playwright@latest
   ```

2. [ ] Install ReportPortal reporter:
   ```bash
   npm install @reportportal/agent-js-playwright --save-dev
   ```

3. [ ] Create `.env` file with your credentials

4. [ ] Configure `playwright.config.ts` with ReportPortal settings

5. [ ] Write 3 test cases:
   - ✅ One that passes
   - ❌ One that fails (intentional)
   - ⏭️ One that's skipped

6. [ ] Run tests:
   ```bash
   npx playwright test
   ```

7. [ ] Verify results in ReportPortal UI

**Success Criteria:**
- Launch appears in ReportPortal
- 3 tests visible (1 passed, 1 failed, 1 skipped)
- Screenshot attached to failed test
- Logs visible for all tests

---

### Part 4: Dashboard Creation (30 minutes)

**Tasks:**

1. [ ] Create custom dashboard: "Practice Dashboard"
2. [ ] Add widgets:
   - Launch statistics (donut chart)
   - Overall statistics (panel)
   - Failed cases trend (line chart)
   - Most failed tests (table)
3. [ ] Run tests 5 times to generate data
4. [ ] Verify widgets populate with data

**Success Criteria:**
- Dashboard visible to all project members
- Widgets show meaningful data
- Trend chart displays multiple data points

---

### Part 5: CI Integration (45 minutes)

**Tasks:**

1. [ ] Create GitHub repository for your project
2. [ ] Push Playwright tests to GitHub
3. [ ] Add GitHub secrets:
   - `RP_TOKEN`
   - `RP_ENDPOINT`
4. [ ] Create `.github/workflows/tests.yml`
5. [ ] Trigger workflow manually
6. [ ] Verify results in ReportPortal with launch name: "GitHub Actions - main"

**Success Criteria:**
- GitHub Actions workflow runs successfully
- Results automatically appear in ReportPortal
- Launch tagged with `CI` attribute

---

## Bonus Challenges

### Challenge 1: Flaky Test Detection

Create a test that fails 50% of the time:

```typescript
test('flaky test demo', async () => {
  const random = Math.random();
  expect(random).toBeGreaterThan(0.5); // Fails ~50% of time
});
```

Run 20 times and verify ReportPortal marks it as flaky!

### Challenge 2: Custom Attributes

Add custom attributes to organize launches:

```typescript
attributes: [
  { key: 'team', value: 'practice' },
  { key: 'priority', value: 'high' },
  { key: 'sprint', value: 'sprint-1' },
]
```

Create dashboard filtered by these attributes.

### Challenge 3: Email Notifications

Configure SMTP and set up email notification for failed launches.

---

## Verification Checklist

- [ ] ReportPortal running with all services healthy
- [ ] Custom project created with proper settings
- [ ] Tests successfully integrated and reporting
- [ ] Dashboard created with 4+ widgets
- [ ] GitHub Actions pipeline working
- [ ] Can debug failures using ReportPortal UI
- [ ] Understand data flow from test → dashboard

**Congratulations!** 🎉 You've successfully set up a production-like ReportPortal environment!

---

# Summary

## What You've Learned

✅ **Installation:**
- Docker setup on multiple platforms
- ReportPortal deployment (8 microservices)
- Starting/stopping services

✅ **Configuration:**
- User management and roles
- Project creation and settings
- Dashboard and widget creation
- API token generation

✅ **Integration:**
- Playwright reporter configuration
- Pytest integration
- GitHub Actions CI/CD
- Different publishing methods

✅ **Operations:**
- Maintenance procedures
- Backup strategies
- Security best practices
- Troubleshooting common issues

✅ **Production:**
- Architecture design
- Cost optimization
- Monitoring and alerts
- Capacity planning

## Next Steps

### Immediate (This Week)
1. Complete practice exercise
2. Set up on your existing test project
3. Create dashboards for your team

### Short-Term (This Month)
1. Migrate all test suites to ReportPortal
2. Train team members
3. Set up automated backups

### Long-Term (This Quarter)
1. Deploy to production environment
2. Implement LDAP/SAML authentication
3. Set up monitoring and alerting
4. Optimize performance based on usage

## Resources

### Official Documentation
- ReportPortal Docs: https://reportportal.io/docs
- Docker Docs: https://docs.docker.com
- Playwright Docs: https://playwright.dev

### Community
- ReportPortal Slack: https://reportportal.io/community
- GitHub Issues: https://github.com/reportportal/reportportal
- Stack Overflow: [reportportal] tag

### VibeTestQ Resources
- Video Tutorial: vibetestq.com/videos/reportportal-setup
- Sample Projects: github.com/vibetestq/reportportal-examples
- Community Discord: discord.gg/vibetestq

---

**Keep learning, keep automating!** 🚀

**— QtpSudhakar**  
*Advanced Automation Architect*  
*VibeTestQ*
