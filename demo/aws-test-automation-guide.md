---
render_with_liquid: false
---

# Master AWS for Test Automation: The Complete Comprehensive Guide for Beginners

Welcome to the **VibeTestQ** AWS masterclass! If you've only run tests on your local laptop and wonder how teams run thousands of tests in the cloud, this guide is your complete roadmap. We explain everything step-by-step with real-world analogies, actual commands, and troubleshooting tips.

---

## Table of Contents
1. [Prerequisites: What You Need Before Starting](#prerequisites)
2. [What is AWS and Cloud Computing?](#what-is-aws)
3. [Why Move Testing to AWS?](#why-aws)
4. [Core AWS Concepts Explained](#core-concepts)
5. [AWS Terminology Glossary for Test Engineers](#aws-terminology)
6. [AWS Services for Test Automation](#aws-services)
7. [Understanding EC2: Your Cloud Computer](#understanding-ec2)
8. [Choosing the Right Instance Type](#instance-types)
9. [Security Essentials: IAM, Security Groups, VPC](#security-essentials)
10. [Creating AWS Resources Using the Console](#console-creation)
11. [Complete CLI Setup Guide: Step-by-Step](#setup-guide)
12. [Installing Test Tools on EC2](#installing-tools)
13. [Running Playwright on AWS](#running-playwright)
14. [Parallel Execution Strategies](#parallel-execution)
15. [AWS Execution Options Comparison](#execution-options)
16. [When to Use: EC2 vs Managed CI vs Serverless](#when-to-use-what)
17. [AWS Cost Management](#cost-management)
18. [Monitoring with CloudWatch](#monitoring)
19. [Advanced: Auto Scaling for Testing](#auto-scaling)
20. [Integrating with CI/CD](#cicd-integration)
21. [Best Practices](#best-practices)
22. [Common Issues & Troubleshooting](#troubleshooting)
23. [Practice Exercise: Your First AWS Test](#practice-exercise)
24. [Conclusion: What's Next?](#conclusion)

---

<a name="prerequisites"></a>
## Prerequisites: What You Need Before Starting

Before we begin, make sure you have:

### ✅ Software Installed
- **AWS CLI** (v2) - [Download here](https://aws.amazon.com/cli/)
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **SSH Client** (Built-in on Mac/Linux, use PowerShell or PuTTY on Windows)
- **A Playwright Project** - You should have completed Playwright basics

### ✅ Accounts Required
- **AWS Account** (free tier available) - [Sign up here](https://aws.amazon.com/free/)
- **Credit Card** (Required for AWS verification, but won't be charged if staying in free tier)

### ✅ Knowledge Prerequisites
- You know how to run `npx playwright test` on your laptop
- Basic command line knowledge (cd, ls/dir, running commands)
- You've written at least a few Playwright tests
- Basic understanding of CI/CD is helpful but not required

### ✅ Free Tier Limits (What's Actually Free)
```
✓ 750 hours/month of t2.micro or t3.micro (first 12 months)
✓ 30 GB of EBS storage
✓ 5 GB of S3 storage
✓ 1 million Lambda requests
✓ 1 GB CloudWatch Logs

⚠️ This means:
  - Run 1 t2.micro instance 24/7 for free
  - Or run 25 instances for 1 hour/day
  - Perfect for learning!
```

**If you're ready, let's dive in!**

---

<a name="what-is-aws"></a>
## 1. What is AWS and Cloud Computing?

### 🏢 The Office Space Analogy

Imagine you're starting a company:

**Traditional Way (On-Premise):**
- Buy a building: $500,000
- Buy desks, computers, AC: $100,000
- Hire IT staff: $80,000/year
- Pay electricity: $2,000/month
- **Problem:** You need all this before hiring your first employee!

**Cloud Way (AWS):**
- Rent office space by the hour
- Pay only for desks you use
- No IT staff needed (landlord handles it)
- Turn off AC when empty
- **Benefit:** Start with $100, scale as you grow

### 💻 For Test Automation Specifically

**Your Laptop Setup:**
```
Your Laptop:
├── Intel i5, 8GB RAM
├── Runs 4 tests parallel
├── Takes 30 minutes
├── Can't use laptop while testing
├── Cost: $0/month (you own it)
└── Problem: Need 100 parallel tests? Can't do it!
```

**AWS Setup:**
```
AWS EC2:
├── Spin up 25 machines
├── Each runs 4 tests parallel (100 total)
├── Takes 3 minutes
├── Your laptop free to use
├── Cost: $0.50 for 30 minutes
└── Solution: Infinite scaling possible!
```

### 🚗 The Uber Analogy

**Cloud Computing = Uber for Computers**

| Owning a Car | Using Uber | Owning Servers | Using AWS |
|--------------|-----------|----------------|-----------|
| Buy for $30,000 | Pay $10/ride | Buy for $50,000 | Pay $0.10/hour |
| Sits in garage 23 hrs/day | Use only when needed | Sits idle 20 hrs/day | Use only when testing |
| You maintain it | Driver maintains it | You maintain it | AWS maintains it |
| Fixed cost | Variable cost | Fixed cost | Variable cost |
| Can't get bigger car instantly | Upgrade anytime | Can't upgrade hardware quickly | Upgrade in 2 minutes |

### 🎯 Key Insight

**Cloud is NOT about technology. It's about ECONOMICS.**

```
Question: Should I buy or rent?

Steady usage = Buy might be cheaper
Sporadic usage = Rent is MUCH cheaper

Test Automation = Sporadic
  ├── Tests run 2-3 times/day
  ├── Each run = 15-30 minutes
  ├── Server idle = 23 hours/day
  └── Conclusion: RENT (AWS) is better!
```

---

<a name="why-aws"></a>
## 2. Why Move Testing to AWS?

### Problem 1: Limited Resources

**Your Laptop Limits:**
```
Scenario: 500 tests to run

Your Laptop:
├── 8GB RAM → Can run 4 parallel tests
├── Time: 500 ÷ 4 = 125 minutes per run
├── 3 runs/day = 6+ hours of testing
├── Laptop unusable during testing
└── Release delayed by slow testing
```

**AWS Solution:**
```
AWS EC2 Fleet:
├── Launch 25 machines (each 8GB RAM)
├── Each runs 4 parallel tests = 100 parallel
├── Time: 500 ÷ 100 = 5 minutes per run
├── 3 runs/day = 15 minutes of cloud time
├── Your laptop free to use
├── Cost: $0.50 × 3 = $1.50/day
└── Release on time ✅
```

### Problem 2: Environment Consistency

**Local Testing Issues:**
```
Developer A: Windows 11, Chrome 120
Developer B: Mac M1, Chrome 119
Developer C: Ubuntu, Chrome 121
CI Server: Ubuntu 20.04, Chrome 118

Result:
  ✓ Pass on Dev A
  ✗ Fail on Dev B
  ✓ Pass on Dev C
  ✗ Fail on CI

Classic: "Works on my machine!" 😤
```

**AWS Solution:**
```
Golden AMI (Amazon Machine Image):
├── Ubuntu 22.04 LTS
├── Node.js 18.19.0
├── Chrome 121.0.6167.85
├── Playwright 1.41.0
└── Same configuration everywhere

Everyone uses same AMI:
  ✓ Dev A: Uses AMI → Pass
  ✓ Dev B: Uses AMI → Pass
  ✓ Dev C: Uses AMI → Pass
  ✓ CI: Uses AMI → Pass

No more "Works on my machine!" ✅
```

### Problem 3: Cost of Ownership

**Traditional Test Lab:**
```
Initial Investment:
├── 10 test machines @ $1,200 = $12,000
├── Network equipment: $2,000
├── Rack, cables, KVM: $1,000
├── Total upfront: $15,000

Ongoing Costs:
├── Electricity: $200/month
├── Cooling: $150/month
├── IT Admin (20% time): $1,500/month
├── Hardware refresh (3 years): $400/month
└── Total: $2,250/month = $27,000/year

Total 3-year cost: $15,000 + $81,000 = $96,000
Utilization: 20% (idle most of the time)
Effective cost: $480,000 per utilized year!
```

**AWS Equivalent:**
```
On-Demand Usage:
├── Launch 10 t3.medium instances
├── Run 2 hours/day, 22 days/month
├── Cost: $0.0416/hr × 10 × 2 × 22 = $18.30/month
├── Total year: $220
├── No upfront cost
├── No maintenance
├── Scale to 100 machines if needed
└── Utilization: 100% (only pay when running)

Total 3-year cost: $660
Savings: $95,340 (99.3% savings!)
```

### Problem 4: Scaling Limitations

```
Scenario: Major release testing

Traditional:
├── Need 50 machines for 1 week
├── Reality: Have only 10 machines
├── Options:
│   ├── Buy 40 machines ($48,000)
│   │   └── Use 1 week, sit idle 51 weeks
│   ├── Rent machines
│   │   └── 2-week lead time to acquire
│   └── Skip comprehensive testing
│       └── Bugs reach production
└── All options are bad!

AWS:
├── Need 50 machines for 1 week?
├── Launch 50 EC2 instances in 5 minutes
├── Run intensive testing for 1 week
├── Terminate when done
├── Cost: $0.0416 × 50 × 24 × 7 = $350
└── Perfect solution! ✅
```

### The Compelling Case

```
AWS wins when:
✓ Usage is sporadic (not 24/7)
✓ Need to scale up/down frequently
✓ Want latest hardware without buying
✓ Team is distributed (access from anywhere)
✓ Want to experiment without upfront cost
✓ Need consistent environments
✓ Don't want to manage hardware

Traditional wins when:
✗ Running 24/7 with predictable load
✗ Very high security requirements (air-gapped)
✗ Already have infrastructure and staff
✗ Regulatory prohibition on cloud

For 90% of test automation teams: AWS is better!
```

---

<a name="core-concepts"></a>
## 3. Core AWS Concepts Explained

Every technical term explained with everyday analogies.

### 1. Region

**What it is:** AWS data center location (like Amazon warehouse cities)

**Available Regions:**
```
Popular Regions:
├── us-east-1 (Virginia) - Cheapest, most services
├── us-west-2 (Oregon) - Western US
├── eu-west-1 (Ireland) - Europe
├── ap-south-1 (Mumbai) - India
├── ap-southeast-1 (Singapore) - Southeast Asia
└── ap-northeast-1 (Tokyo) - Japan
```

**The Amazon Warehouse Analogy:**
```
Amazon Warehouses:
├── Los Angeles warehouse
├── New York warehouse
└── Chicago warehouse

When you order:
1. Choose closest warehouse → Faster delivery
2. LA order ships from LA warehouse
3. NY order ships from NY warehouse

AWS Regions:
├── Mumbai data center (ap-south-1)
├── Virginia data center (us-east-1)
└── Ireland data center (eu-west-1)

When you launch instance:
1. Choose closest region → Faster network
2. India team → Mumbai region
3. US team → Virginia region
```

**Why it matters:**
```
1. Speed (Latency):
   India team → Mumbai region: 5-20ms latency
   India team → Virginia region: 180-250ms latency
   
2. Cost:
   t3.medium in Virginia: $0.0416/hour
   t3.medium in Mumbai: $0.0504/hour
   (21% more expensive)
   
3. Compliance:
   EU data must stay in EU → Use eu-west-1
   India customer data → Use ap-south-1
```

**How to choose:**
```
Decision Tree:
├── Legal requirement? → Use required region
├── Team location? → Choose closest region
├── Budget tight? → Use us-east-1 (cheapest)
└── Need speed? → Choose closest to users
```

### 2. Availability Zone (AZ)

**What it is:** Separate building within a region

**The Theater Analogy:**
```
Movie Theater (Region):
├── Theater A (AZ 1) - 10 screens
├── Theater B (AZ 2) - 10 screens
└── Theater C (AZ 3) - 10 screens

All in same city, different buildings:
├── If Theater A has power outage
├── Theaters B & C still show movies
└── Your movie night continues!

AWS Region (us-east-1):
├── AZ us-east-1a - Data center building A
├── AZ us-east-1b - Data center building B
└── AZ us-east-1c - Data center building C

All in Virginia, different buildings:
├── If us-east-1a has issue
├── us-east-1b & us-east-1c still work
└── Your apps stay online!
```

**For Test Automation:**
```
Do you need multiple AZs?

❌ NO for learning/testing:
  └── Use one AZ (simpler, same cost)

❌ NO for temporary test runs:
  └── Run tests, get results, terminate

✅ YES for 24/7 Selenium Grid:
  └── Production infrastructure needs redundancy
```

### 3. VPC (Virtual Private Cloud)

**What it is:** Your private network in AWS

**The Apartment Analogy:**
```
Apartment Building = AWS
├── Your Apartment = Your VPC
│   ├── Bedroom = Private subnet (databases)
│   ├── Living room = Private subnet (app servers)
│   └── Balcony = Public subnet (web servers)
│
├── Neighbor's Apartment = Their VPC
│   └── Completely separate
│
└── You can't enter neighbor's apartment
    They can't enter yours
```

**VPC Components:**
```
Your VPC (10.0.0.0/16):
│
├── Public Subnet (10.0.1.0/24)
│   ├── Things with internet access
│   ├── Web servers
│   ├── Load balancers
│   └── Bastion hosts (jump servers)
│
├── Private Subnet (10.0.2.0/24)
│   ├── No direct internet
│   ├── Databases
│   ├── Internal APIs
│   └── Backend services
│
├── Internet Gateway
│   └── Door to outside world
│
└── Security Groups
    └── Locks on each door
```

**For Test Automation:**
```
Simple Setup (Default VPC):
✓ Use AWS default VPC
✓ Launch instances in public subnet
✓ Good for learning

Advanced Setup (Custom VPC):
├── Public Subnet:
│   ├── Selenium Hub
│   └── Jenkins
│
└── Private Subnet:
    ├── Selenium Nodes
    ├── Test databases
    └── Internal APIs
```

### 4. Security Group

**What it is:** Firewall rules for your instance

**The Bouncer Analogy:**
```
Nightclub with Bouncer:
├── Who can enter? (Inbound rules)
│   ├── Guest list only? (Specific IPs)
│   ├── Age 21+? (Port restrictions)
│   └── Dress code? (Protocol rules)
│
└── Can people leave? (Outbound rules)
    ├── Usually YES
    └── Exit always allowed

AWS Security Group:
├── Inbound Rules (Who can connect to instance)
│   ├── SSH from office IP: 203.0.113.0/24
│   ├── HTTP from anywhere: 0.0.0.0/0
│   └── Block everything else
│
└── Outbound Rules (What instance can access)
    ├── Usually allow all
    └── Can restrict if needed
```

**Example Security Group:**
```yaml
Security Group: "test-automation-sg"

Inbound Rules:
├── Rule 1:
│   ├── Type: SSH (Port 22)
│   ├── Source: My Office IP (203.0.113.25)
│   └── Purpose: I can SSH from office
│
├── Rule 2:
│   ├── Type: HTTP (Port 80)
│   ├── Source: Anywhere (0.0.0.0/0)
│   └── Purpose: Anyone can view reports
│
└── Rule 3:
    ├── Type: Custom TCP (Port 4444)
    ├── Source: My VPC (10.0.0.0/16)
    └── Purpose: Selenium Grid internal communication

Outbound Rules:
└── All traffic allowed (default)
```

### 5. EC2 (Elastic Compute Cloud)

**What it is:** Virtual computer in the cloud

**The Hotel Room Analogy:**
```
Hotel Stay:
├── Check in → Launch instance
├── Choose room size → Choose instance type
│   ├── Single room → t2.micro
│   ├── Suite → t3.large
│   └── Penthouse → m5.4xlarge
│
├── Use room → Run tests
├── Check out → Terminate instance
└── Pay for nights stayed → Pay for hours used

You don't own the room, just rent it!
```

**EC2 Lifecycle:**
```
1. Launch:
   └── aws ec2 run-instances --instance-type t3.medium

2. Running:
   └── Your instance is active (paying per hour)

3. Stop:
   └── Pause instance (like sleep mode)
   └── Stop paying for compute
   └── Still pay for storage ($0.10/GB/month)

4. Start:
   └── Resume stopped instance
   └── Same IP (if Elastic IP), same data

5. Terminate:
   └── Destroy instance
   └── Cannot recover
   └── Stop all charges
```

### 6. AMI (Amazon Machine Image)

**What it is:** Template to create EC2 instances

**The Cookie Cutter Analogy:**
```
Baking Cookies:
├── Recipe = Instructions
├── Cookie cutter = Template
├── Dough = AWS infrastructure
└── Cookies = EC2 instances

One cookie cutter → 100 identical cookies
One AMI → 100 identical instances
```

**Types of AMIs:**
```
1. Public AMIs (Free templates):
   ├── Ubuntu 22.04
   ├── Amazon Linux 2
   ├── Windows Server 2022
   └── Provided by AWS or community

2. AWS Marketplace AMIs:
   ├── Pre-configured software
   ├── Selenium Grid Complete
   ├── Jenkins with test tools
   └── Additional cost

3. Custom AMIs (Your template):
   ├── You create from configured instance
   ├── Has all your specific setup
   ├── Perfect copies every time
   └── Best for test automation
```

**Creating Custom Test AMI:**
```bash
# Step 1: Launch Ubuntu instance
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.medium

# Step 2: SSH and install everything
ssh -i key.pem ubuntu@instance-ip

# Install Node.js, Playwright, browsers, etc.
# (See detailed setup in Section 10)

# Step 3: Create AMI
aws ec2 create-image \
  --instance-id i-1234567890abcdef0 \
  --name "TestRunner-Playwright-v1.0" \
  --description "Complete Playwright test environment"

# Step 4: Launch 10 identical instances from AMI
aws ec2 run-instances \
  --image-id ami-your-custom-ami \
  --count 10 \
  --instance-type t3.medium

# Result: 10 identical test runners in 2 minutes!
```

### 7. IAM (Identity and Access Management)

**What it is:** Users, permissions, and access control

**The Building Security Analogy:**
```
Corporate Building:
├── Badge = IAM User
├── Access permissions = IAM Policies
│   ├── Finance badge → Access finance floor
│   ├── IT badge → Access server room
│   └── CEO badge → Access everywhere
│
└── Temporary visitor pass = IAM Role

IAM in AWS:
├── IAM User = Person with credentials
├── IAM Policy = Permission document
│   ├── ReadOnlyAccess
│   ├── EC2FullAccess
│   └── S3FullAccess
│
└── IAM Role = Temporary permissions
```

**For Test Automation:**
```
Create IAM User for Testing:

1. User: test-automation-user

2. Permissions:
   ├── AmazonEC2FullAccess
   │   └── Launch/stop/terminate instances
   │
   ├── AmazonS3FullAccess
   │   └── Upload test reports
   │
   ├── CloudWatchLogsFullAccess
   │   └── Store test logs
   │
   └── AWSPriceListServiceFullAccess
       └── Track spending

3. Access Keys:
   ├── Access Key ID: AKIAIOSFODNN7EXAMPLE
   └── Secret Access Key: wJalrXUtnFEMI/K7MDENG/
```

---

<a name="aws-terminology"></a>
## 4. AWS Terminology Glossary for Test Engineers

When creating AWS resources via Console or CLI, you'll encounter these terms. Here's everything explained in simple language:

### General Cloud Terms

**Region**
```
What: Physical data center location (e.g., us-east-1, ap-south-1)
Analogy: Like choosing which city to rent your office
Why it matters: Affects latency, cost, and data residency laws
Example: Choose Mumbai (ap-south-1) for Indian users, Virginia (us-east-1) for US users
```

**Availability Zone (AZ)**
```
What: Isolated data center within a region (e.g., us-east-1a, us-east-1b)
Analogy: Different buildings in the same city
Why it matters: Protects against data center failures
Example: Deploy in multiple AZs for high availability
```

**VPC (Virtual Private Cloud)**
```
What: Your private network in AWS
Analogy: Your apartment floor in a building (private, isolated)
Key point: Resources in same VPC can talk to each other privately
Default: AWS creates a default VPC for you (use it for learning!)
```

### EC2 Specific Terms

**AMI (Amazon Machine Image)**
```
What: Pre-configured OS template to launch instances
Analogy: Like a Windows installation disk or clone drive
Contains: Operating System + Pre-installed software
Example: "Ubuntu 22.04 LTS" AMI includes Ubuntu OS ready to boot

Types:
  ├── Public AMIs (Free): Ubuntu, Amazon Linux
  ├── Marketplace AMIs (Paid): Pre-configured with software
  └── Custom AMIs (Yours): Your configured test machine saved as template
```

**Instance**
```
What: A running virtual machine (your cloud computer)
Analogy: Rented computer that you can SSH into
Lifecycle: Stopped → Starting → Running → Stopping → Stopped → Terminated
Key: "Terminate" = Delete forever (not recoverable!)
```

**Instance Type**
```
What: Size/power of your VM (CPU + RAM + Network)
Format: family + size (e.g., t3.medium)
  ├── t3 = Family (general purpose, burstable)
  ├── medium = Size (2 vCPU, 4GB RAM)

Common Types for Testing:
  ├── t3.micro: 2 vCPU, 1GB RAM → Learning, 1-2 tests ($0.0104/hr)
  ├── t3.medium: 2 vCPU, 4GB RAM → 4-5 parallel tests ($0.0416/hr)
  ├── t3.large: 2 vCPU, 8GB RAM → 6-8 parallel tests ($0.0832/hr)
  └── m5.xlarge: 4 vCPU, 16GB RAM → 10-15 parallel tests ($0.192/hr)
```

**Key Pair**
```
What: SSH credentials (public + private key pair) to access your instance
Analogy: Digital key to unlock your cloud computer (like house key)
Format: .pem file (Mac/Linux) or .ppk file (Windows/PuTTY)
Critical: Downloaded ONLY ONCE - save it safely!

Usage: ssh -i my-key.pem ubuntu@instance-ip
Security: Set permissions chmod 400 my-key.pem
```

**Security Group**
```
What: Virtual firewall controlling traffic to/from your instance
Analogy: Bouncer at club entrance (who can enter, which door)
Rules: Inbound (who can connect) + Outbound (where instance can connect)

Example Rules:
  ├── SSH (Port 22): Allow from "My IP" only → Secure access
  ├── HTTP (Port 80): Allow from 0.0.0.0/0 → Public web server
  └── Custom: Port 3000 from another security group → App communication

⚠️ Never: Allow SSH from 0.0.0.0/0 (anywhere) → Hackers will break in!
```

**Public IP vs Private IP**
```
Public IP:
  ├── Accessible from internet
  ├── Example: 54.123.45.67
  ├── Use: SSH from your laptop, external access
  └── Cost: Free while instance running, lost when stopped

Private IP:
  ├── Accessible only within VPC
  ├── Example: 10.0.1.45
  ├── Use: Communication between AWS resources
  └── Cost: Free, persists through stop/start

Elastic IP (Optional):
  └── Fixed public IP that persists even when instance stopped
  └── Cost: Free when attached to running instance, $0.005/hr when unused
```

**EBS (Elastic Block Store)**
```
What: Virtual hard drive attached to your EC2 instance
Analogy: USB drive plugged into your computer
Default: 30GB root volume (OS + your code)
Cost: $0.10/GB/month (30GB = $3/month)

Key Points:
  ├── Persists after "Stop" (not "Terminate")
  ├── Can resize without data loss
  ├── Can detach and attach to different instance
  └── Pay for provisioned size, even if unused

⚠️ Terminate instance = EBS deleted (unless "Delete on termination" unchecked)
```

###  Storage Terms

**S3 (Simple Storage Service)**
```
What: Object storage for files (reports, screenshots, videos)
Analogy: Google Drive or Dropbox for AWS
Structure: Buckets (folders) containing objects (files)

Key Concepts:
  ├── Bucket: Container with globally unique name
  │   └── Example: vibetestq-test-reports-2026
  ├── Object: Individual file inside bucket
  │   └── Example: s3://my-bucket/2024-01-15/report.html
  ├── Cost: $0.023/GB/month (10GB = $0.23/month)
  └── Access: Private by default, can be made public

Best Practice: Use S3 for test reports, not EBS (cheaper!)
```

**S3 Bucket Policies**
```
What: JSON rules controlling who can access your bucket
Use Cases:
  ├── Make test reports publicly viewable (read-only)
  ├── Allow EC2 instances to upload results
  └── Restrict access to specific IP addresses
```

### Security & Access Terms

**IAM (Identity and Access Management)**
```
What: AWS permission system (who can do what)
Components:
  ├── Users: Individual accounts
  ├── Groups: Collection of users
  ├── Roles: Temporary permissions for services
  └── Policies: JSON rules defining permissions
```

**IAM User**
```
What: Account for a person or program to access AWS
Types:
  ├── Console Access: Username/password for AWS web UI
  └── Programmatic Access: Access Key ID + Secret for CLI/API

For Test Automation:
  └── Create user with: EC2FullAccess + S3FullAccess policies
```

**Access Keys**
```
What: Credentials for CLI/SDK (not humans logging in)
Format:
  ├── Access Key ID: AKIAIOSFODNN7EXAMPLE (username)
  └── Secret Access Key: wJalrXUtnFEMI/K7MDENG... (password)

Usage: aws configure (enter keys)
Security: ⚠️ Never commit to Git! Use environment variables or secrets manager
Critical: Shown ONLY ONCE when created - save immediately!
```

**IAM Role**
```
What: Temporary permissions for AWS services (not users)
Analogy: "Security badge" that EC2 instance wears to access S3
Benefit: No access keys needed (more secure)

Example: EC2 instance with S3-upload role can push reports without hardcoded keys
```

### Networking Terms

**Port**
```
What: Virtual door for network traffic
Common Ports:
  ├── 22: SSH (remote access)
  ├── 80: HTTP (web traffic)
  ├── 443: HTTPS (secure web)
  ├── 3000: Node.js dev server
  └── 3389: RDP (Windows remote desktop)

Security Group Rule: Allow port 22 from your IP = You can SSH
```

**CIDR Block**
```
What: IP address range notation
Format: 192.168.1.0/24

Examples:
  ├── 0.0.0.0/0 = Everywhere (all IPs) ⚠️ Dangerous for SSH!
  ├── 10.0.0.0/8 = Private network range
  └── 123.45.67.89/32 = Single IP (your computer)

Use: 123.45.67.89/32 for "My IP" in security groups
```

###  Cost & Billing Terms

**On-Demand Instance**
```
What: Pay per second as you use
Cost: Full price (e.g., t3.medium = $0.0416/hour)
Benefit: No commitment, terminate anytime
Use: Learning, unpredictable workloads
```

**Spot Instance**
```
What: Spare capacity AWS sells at 70-90% discount
Cost: t3.medium = $0.0125/hour (vs $0.0416 on-demand)
Catch: AWS can terminate with 2-minute warning
Best for: Fault-tolerant workloads (test runs you can retry)
```

**Reserved Instance**
```
What: 1-3 year commitment for discount
Discount: 30-50% off on-demand
Best for: Always-running workloads (not test automation)
```

**Free Tier**
```
What: AWS's free usage quota
Limits:
  ├── 750 hours/month t2.micro or t3.micro (first 12 months)
  ├── 30GB EBS storage
  ├── 5GB S3 storage
  └── 1 million Lambda requests

Perfect for: Learning without worries!
```

### Monitoring Terms

**CloudWatch**
```
What: AWS monitoring and logging service
Features:
  ├── Metrics: CPU, memory, network graphs
  ├── Logs: Application logs stored and searchable
  ├── Alarms: Notifications when thresholds crossed
  └── Dashboards: Custom visualizations

Use: Track instance health, check test logs, set billing alerts
```

**Tags**
```
What: Key-value labels for resources
Purpose: Organization, cost tracking, automation

Example:
  ├── Name: playwright-test-runner
  ├── Environment: staging
  ├── Team: qa-automation
  └── CostCenter: testing-budget

Benefit: Filter costs by tag ("How much did QA team spend?")
```

### Quick Reference Cheat Sheet

```
When You See...          It Means...                     Analogy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Region                   Data center location            City
AZ                       Isolated building in region     Office building
VPC                      Your private network            Your apartment floor
AMI                      OS template                     Windows installer
Instance                 Virtual machine                 Rented computer
Instance Type            VM size (CPU/RAM)               Apartment size (1BHK/2BHK)
Key Pair                 SSH password                    House key
Security Group           Firewall rules                  Building security
Public IP                Internet address                Street address
EBS                      Virtual hard drive              USB drive attached
S3                       File storage                    Google Drive
IAM User                 Account for person/program      Employee badge
Access Keys              API credentials                 Robot employee password
Role                     Temporary permissions           Security clearance badge
CIDR                     IP address range                Street block
On-Demand                Pay per use                     Taxi fare
Spot                     Discounted spare capacity       Standby flight ticket
CloudWatch               Monitoring system               Security cameras
```

---

<a name="aws-services"></a>
## 5. AWS Services for Test Automation

### The Service Catalog

```
Test Automation Stack:
│
├── 🖥️ EC2 (Compute)
│   └── Virtual machines to run tests
│
├── 📦 S3 (Storage)
│   └── Store test reports, screenshots, videos
│
├── 🔑 IAM (Security)
│   └── User permissions and access control
│
├── 🛡️ Security Groups (Firewall)
│   └── Network security rules
│
├── 📊 CloudWatch (Monitoring)
│   └── Logs, metrics, alarms
│
├── ⚖️ Auto Scaling (Automation)
│   └── Launch/terminate instances automatically
│
├── ⚡ Lambda (Serverless)
│   └── Trigger tests on events
│
├── 🌐 CloudFront (CDN)
│   └── Serve reports globally
│
└── 💰 Cost Explorer (Billing)
    └── Track spending
```

### Service Deep Dive

#### EC2 - Your Test Runners

**Purpose:** Virtual machines that execute your tests

**Use Cases:**
```
1. Single Test Runner:
   └── Launch t3.medium, run tests, terminate

2. Parallel Test Grid:
   └── Launch 10 t3.large instances
   └── Distribute 1000 tests
   └── Complete in 10 minutes

3. 24/7 Selenium Hub:
   └── Keep t3.xlarge running continuously
   └── Team connects for testing
```

**Instance Types for Testing:**
```
t3.micro (1 vCPU, 1 GB RAM):
├── Cost: $0.0104/hour
├── Use: Running 1-2 sequential tests
├── Good for: Learning, tiny POCs
└── Free tier: 750 hours/month year 1

t3.small (2 vCPU, 2 GB RAM):
├── Cost: $0.0208/hour
├── Use: 2-3 parallel Playwright tests
├── Good for: Small test suites
└── Not free tier

t3.medium (2 vCPU, 4 GB RAM):
├── Cost: $0.0416/hour
├── Use: 4-5 parallel tests
├── Good for: Standard test automation
└── Sweet spot for most teams ⭐

t3.large (2 vCPU, 8 GB RAM):
├── Cost: $0.0832/hour
├── Use: 6-8 parallel tests
├── Good for: Selenium Grid nodes
└── Better performance

m5.xlarge (4 vCPU, 16 GB RAM):
├── Cost: $0.192/hour
├── Use: 10-15 parallel tests
├── Good for: Heavy parallel execution
└── For large test suites

m5.2xlarge (8 vCPU, 32 GB RAM):
├── Cost: $0.384/hour
├── Use: 20-30 parallel tests
├── Good for: Enterprise test automation
└── Maximum parallelization
```

#### S3 - Test Artifact Storage

**Purpose:** Store test reports, screenshots, videos

**Why S3 for Testing:**
```
Traditional Approach:
├── Store reports on EC2 instance
├── Problem: When instance terminates, reports lost!
└── Solution: Upload to S3 before terminating

S3 Benefits:
✓ Unlimited storage
✓ 99.999999999% durability (won't lose files)
✓ Access from anywhere
✓ Cheap: $0.023/GB/month
✓ Serve reports as website
```

**Example Usage:**
```bash
# Upload test report to S3
aws s3 cp playwright-report/ \
  s3://my-test-reports/$(date +%Y-%m-%d)/ \
  --recursive

# Make it publicly viewable
aws s3 website s3://my-test-reports/ \
  --index-document index.html

# Access report at:
# http://my-test-reports.s3-website-us-east-1.amazonaws.com
```

**Cost Example:**
```
Test Reports Storage:
├── 1 test run = 50 MB (HTML, screenshots)
├── 100 runs/month = 5 GB
├── Cost: 5 × $0.023 = $0.12/month
└── Essentially free!
```

#### CloudWatch - Monitoring & Logging

**Purpose:** Track instance metrics, store logs, set alarms

**What You Can Monitor:**
```
Instance Metrics:
├── CPU utilization
├── Memory usage
├── Network in/out
├── Disk read/write
└── All free for EC2!

Custom Metrics:
├── Tests passed/failed
├── Test execution time
├── Browser crashes
└── Requires custom code
```

**Example Alarm:**
```bash
# Alert when CPU > 80% for 5 minutes
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu-alert \
  --alarm-description "Test runner high CPU" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:us-east-1:123456789:alerts

# You get email when CPU high
# Might indicate hanging test or infinite loop
```

#### Lambda - Serverless Test Triggers

**Purpose:** Run code without managing servers

**Test Automation Uses:**
```
1. Scheduled Test Runs:
   └── Lambda triggers at 2 AM daily
   └── Launches EC2, runs tests, terminates

2. Event-Driven Tests:
   └── Developer pushes code → Lambda triggered
   └── Starts test execution

3. Test Orchestration:
   └── Lambda function manages fleet of test runners
   └── Distributes tests across instances

4. Report Generation:
   └── Tests complete → Upload to S3
   └── S3 triggers Lambda
   └── Lambda generates summary email
```

**Example Lambda Function:**
```javascript
// Lambda function to launch test runner
exports.handler = async (event) => {
    const AWS = require('aws-sdk');
    const ec2 = new AWS.EC2();
    
    // Launch EC2 instance with test runner AMI
    const params = {
        ImageId: 'ami-test-runner-123',
        InstanceType: 't3.medium',
        MinCount: 1,
        MaxCount: 1,
        UserData: Buffer.from(`#!/bin/bash
            cd /home/ubuntu/tests
            git pull origin main
            npm test
            aws s3 cp results/ s3://test-reports/ --recursive
            shutdown -h now
        `).toString('base64')
    };
    
    const result = await ec2.runInstances(params).promise();
    return {
        statusCode: 200,
        body: `Launched instance: ${result.Instances[0].InstanceId}`
    };
};

// Cost: $0.20 per million requests
// For 100 test runs/day: ~$0.001/day (free!)
```

---

<a name="understanding-ec2"></a>
## 5. Understanding EC2: Your Cloud Computer

### The Complete Mental Model

```
Physical Computer vs EC2:

Your Laptop:
├── CPU: Intel i5 (4 cores)
├── RAM: 8 GB
├── Disk: 256 GB SSD
├── Location: On your desk
├── Cost: $1,200 one-time
├── Upgradeable: Buy new laptop
└── Runs: 8 hours/day

EC2 Instance (t3.medium):
├── vCPU: 2 virtual cores
├── RAM: 4 GB
├── Disk: 30 GB SSD (configurable)
├── Location: AWS data center
├── Cost: $0.0416/hour
├── Upgradeable: Stop, change type, start (2 min)
└── Runs: Only when you need it
```

### Instance Lifecycle Explained

```
State Diagram:

   ┌─────────┐
   │ Launch  │
   └────┬────┘
        │
        ▼
   ┌─────────┐   Stop    ┌─────────┐
   │ Running ├──────────▶│ Stopped │
   └────┬────┘           └────┬────┘
        │      ◀───────────────┘
        │       Start
        │
        │ Terminate
        ▼
   ┌─────────┐
   │ Deleted │
   └─────────┘
```

**States Explained:**

**1. Pending → Running (Launch):**
```
What happens:
├── 0:00 - You click "Launch"
├── 0:05 - AWS assigns hardware
├── 0:10 - Loads AMI image
├── 0:30 - Boots operating system
├── 0:45 - Runs startup scripts
└── 1:00 - Status: Running ✅

You pay from "Running" state
Typical launch time: 30-60 seconds
```

**2. Running → Stopped:**
```
What happens:
├── You click "Stop"
├── OS performs graceful shutdown
├── State saved to disk
├── Status: Stopped
│
├── Stop paying for compute
├── Still pay for storage
└── Can start again anytime

Like: Laptop sleep mode
```

**3. Stopped → Running (Start):**
```
What happens:
├── You click "Start"
├── AWS assigns (possibly different) hardware
├── Loads saved state
├── Status: Running
│
├── Same data, same config
├── Might get different public IP
├── EBS volume preserved
└── Resume work where left off

Start time: 30-45 seconds
```

**4. Running → Terminated:**
```
What happens:
├── You click "Terminate"
├── Instance shuts down immediately
├── All data deleted (unless EBS configured otherwise)
├── Cannot recover
└── All charges stop

Like: Factory reset + return laptop
```

### Connecting to EC2

#### SSH Connection (Mac/Linux)

```bash
# Step 1: Set key permissions
chmod 400 mykey.pem

# Step 2: Connect
ssh -i mykey.pem ubuntu@ec2-54-123-45-67.compute-1.amazonaws.com

# Step 3: You're in!
ubuntu@ip-10-0-1-123:~$ 
```

#### SSH Connection (Windows PowerShell)

```powershell
# Step 1: Set key permissions
icacls mykey.pem /inheritance:r
icacls mykey.pem /grant:r "${env:USERNAME}:R"

# Step 2: Connect
ssh -i mykey.pem ubuntu@ec2-54-123-45-67.compute-1.amazonaws.com
```

#### Using EC2 Instance Connect (Browser-based)

```
AWS Console → EC2 → Instances → Select instance → Connect
→ Choose "EC2 Instance Connect"
→ Click "Connect"
→ Browser terminal opens! (No SSH key needed)

Perfect for:
✓ Quick access
✓ No SSH client needed
✓ Beginners
✓ Temporary connections
```

---

<a name="instance-types"></a>
## 6. Choosing the Right Instance Type

### The Instance Type Menu

**AWS has 600+ instance types. Don't panic! For testing, you need only 2-3.**

```
Instance Families:

T-family (t3, t3a):
├── Burstable performance
├── Baseline CPU with ability to burst
├── Cheapest option
├── Perfect for: Sporadic testing
└── Example: t3.medium ⭐

M-family (m5, m6i):
├── Balanced compute, memory, network
├── Consistent performance
├── More expensive
├── Perfect for: Steady workloads
└── Example: m5.large

C-family (c5, c6i):
├── Compute-optimized
├── High CPU performance
├── For: CPU-intensive tests
└── Example: c5.xlarge

R-family (r5, r6i):
├── Memory-optimized
├── High RAM
├── For: Memory-intensive tests
└── Example: r5.large

For 90% of test automation: Use T-family
```

### Instance Size Guide

```
Size Progression:
micro < small < medium < large < xlarge < 2xlarge < 4xlarge
```

### Decision Matrix

```
Your Test Suite Size → Recommended Instance

1-50 tests:
├── Sequential: t3.micro (free tier)
├── 2-3 parallel: t3.small
└── 4-5 parallel: t3.medium ⭐

51-200 tests:
├── 6-8 parallel: t3.large
└── 10-12 parallel: m5.xlarge

201-500 tests:
├── 15-20 parallel: m5.2xlarge
└── Or: 5× t3.large (better distribution)

500+ tests:
├── Launch fleet of t3.large/xlarge
└── Use Auto Scaling (Section 15)
```

### Real-World Examples

**Example 1: Small Startup**
```
Scenario:
├── 50 Playwright tests
├── Run 3 times/day
├── Each run: 10 minutes

Solution:
├── Instance: t3.medium
├── Cost: $0.0416/hour
├── Usage: 3 × (10/60) = 0.5 hours/day
├── Daily cost: $0.021
├── Monthly cost: $0.63
└── Runs 4-5 tests parallel ✅
```

**Example 2: Growing Team**
```
Scenario:
├── 300 Playwright tests
├── Run 5 times/day
├── Need results in 10 minutes

Solution:
├── Instances: 3× t3.xlarge
├── Each runs 10 parallel = 30 total
├── 300 tests ÷ 30 = 10 minutes ✅
├── Cost: 3 × $0.1664/hour
├── Usage: 5 × (10/60) = 0.83 hours/day
├── Daily cost: $0.41
├── Monthly cost: $12.30
└── Fast results, low cost ✅
```

**Example 3: Enterprise**
```
Scenario:
├── 2000 tests
├── Run on every commit (20 times/day)
├── Need results in 5 minutes

Solution:
├── Use Auto Scaling Group
├── Min: 0, Max: 30, Target:20
├── Launch 20× m5.large on demand
├── Each runs 10 parallel = 200 total
├── 2000 tests ÷ 200 = 10 minutes
│   (Need faster? Launch 30 instances)
│
├── Cost: 20 × $0.096/hour
├── Usage: 20 × (5/60) = 1.67 hours/day
├── Daily cost: $3.20
├── Monthly cost: $96
└── Scales automatically ✅
```

### T-family Burst Credits

**Important concept for T-instances:**

```
T-instances Explained:

Baseline Performance:
├── t3.micro: 10% CPU constantly
├── t3.small: 20% CPU constantly
├── t3.medium: 20% CPU constantly (2 vCPUs)
└── t3.large: 30% CPU constantly

Burst Credits:
├── Accumulate when below baseline
├── Spend when above baseline
├── Like: Cell phone rollover minutes

Example (t3.medium):
├── Baseline: 20% × 2 vCPUs = 0.4 vCPU constantly
├── Your tests need 100% CPU for 5 minutes
├── Use burst credits for those 5 minutes
├── Then accumulate credits when idle
└── Perfect for testing! ✅

When burst credits exhausted:
├── CPU throttles to baseline
├── Tests run slower
└── Solution: Use larger instance or M-family
```

**Monitoring Burst Credits:**
```bash
# Check burst credits
aws cloudwatch get-metric-statistics \
  --namespace AWS/EC2 \
  --metric-name CPUCreditBalance \
  --dimensions Name=InstanceId,Value=i-1234567890 \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Average

# If credits near 0: Upgrade instance type
```

---

<a name="security-essentials"></a>
## 7. Security Essentials: IAM, Security Groups, VPC

### 1. IAM Best Practices

```
✅ DO:
├── Create IAM user for test automation (not root)
├── Use minimal required permissions
├── Rotate access keys quarterly
├── Enable MFA for console access
├── Use IAM roles for EC2 instances
└── Audit access regularly

❌ DON'T:
├── Use root account for daily tasks
├── Grant AdministratorAccess unless needed
├── Share access keys
├── Hardcode credentials in code
├── Leave unused users active
└── Ignore security alerts
```

### IAM Setup for Test Automation

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:RunInstances",
        "ec2:TerminateInstances",
        "ec2:DescribeInstances",
        "ec2:StartInstances",
        "ec2:StopInstances"
      ],
      "Resource": "*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "us-east-1"
        },
        "StringLike": {
          "ec2:InstanceType": ["t3.*", "t2.*"]
        }
      }
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-test-reports/*"
      ]
    }
  ]
}

// This policy:
// ✓ Allows launching/managing EC2 in us-east-1
// ✓ Only t2 and t3 instance types (cost control)
// ✓ Allows uploading to specific S3 bucket
// ✗ Cannot launch expensive instance types
// ✗ Cannot use other regions
// ✗ Cannot access other S3 buckets
```

### 2. Security Group Configuration

```
Test Automation Security Group:

Name: test-automation-sg
VPC: default

Inbound Rules:
┌──────────────────────────────────────────┐
│ Type  │ Port │ Source         │ Purpose │
├───────┼──────┼────────────────┼─────────┤
│ SSH   │ 22   │ My IP          │ Connect │
│       │      │ (203.0.113.25) │ from    │
│       │      │                 │ office  │
├───────┼──────┼────────────────┼─────────┤
│ HTTP  │ 80   │ 0.0.0.0/0      │ View    │
│       │      │                 │ reports │
├───────┼──────┼────────────────┼─────────┤
│ Custom│ 4444 │ 10.0.0.0/16    │ Selenium│
│ TCP   │      │ (VPC)          │ Grid    │
└──────────────────────────────────────────┘

Outbound Rules:
└── All traffic: 0.0.0.0/0 (allow all)

Security Notes:
✓ SSH restricted to office IP (not 0.0.0.0/0!)
✓ HTTP open for report viewing
✓ Selenium Grid only accessible within VPC
✗ Never expose SSH to 0.0.0.0/0
✗ Never expose database ports publicly
```

### Creating Security Group

```bash
# Create security group
aws ec2 create-security-group \
  --group-name test-automation-sg \
  --description "Security for test automation" \
  --vpc-id vpc-12345678

# Add SSH access (ONLY from your IP!)
MY_IP=$(curl -s ifconfig.me)
aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 22 \
  --cidr "${MY_IP}/32"

# Add HTTP access (public reports)
aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

# Add Selenium Grid port (internal only)
aws ec2 authorize-security-group-ingress \
  --group-id sg-12345678 \
  --protocol tcp \
  --port 4444 \
  --source-group sg-12345678
```

### 3. VPC Configuration

```
For Beginners: Use Default VPC
├── Every AWS account has default VPC
├── Pre-configured, ready to use
├── Public subnets in each AZ
├── Internet gateway attached
└── Perfect for learning! ✅

For Production: Create Custom VPC
├── Better security control
├── Network segmentation
├── Private subnets for sensitive data
├── NAT gateways for outbound access
└── For enterprise setups
```

---

<a name="console-creation"></a>
## 9. Creating AWS Resources Using the Console

The AWS Console is a web-based interface perfect for beginners and one-time setups. No coding required!

### Why Use the Console First?

**Advantages:**
```
✓ Visual, point-and-click interface
✓ See all options with descriptions
✓ Great for learning what each setting does
✓ Immediate feedback and validation
✓ No CLI/coding knowledge needed
✓ Preview costs before creating
```

**When to Use:**
```
Console = Perfect for:
  ├── First-time setup
  ├── Learning AWS
  ├── One-time resource creation
  ├── Exploring available options
  └── Troubleshooting existing resources

CLI/Scripts = Better for:
  ├── Repetitive tasks
  ├── Large-scale automation
  ├── CI/CD integration
  └── Version-controlled infrastructure
```

### Step-by-Step: Launching EC2 Instance via Console

#### Step 1: Log in to AWS Console

1. Go to [https://console.aws.amazon.com](https://console.aws.amazon.com)
2. Enter your:
   - **Root user email** (if using root account) ⚠️ Not recommended for daily use
   - **IAM user name** (if using IAM account) ✅ Recommended
3. Enter password
4. (If MFA enabled) Enter 6-digit code

#### Step 2: Navigate to EC2

```
Method 1: Search Bar (Fastest)
  ├── Click search bar at top
  ├── Type "EC2"
  ├── Click "EC2" service
  └── You're in!

Method 2: Services Menu
  ├── Click "Services" (top left)
  ├── Under "Compute", click "EC2"
  └── You're in!

Method 3: Recently Visited
  ├── Services you used appear on homepage
  └── Click EC2 card
```

#### Step 3: Launch Instance

```
1. Click orange "Launch Instance" button (top right area)
2. You'll see the "Launch an instance" form
```

#### Step 4: Name and Tags

```
Field: Name
├── Purpose: Friendly name to identify your instance
├── Example: playwright-test-runner
├── Note: Appears in instance list for easy identification
└── Creates a "Name" tag automatically
```

#### Step 5: Choose AMI (Operating System)

```
What you see: Application and OS Images (Amazon Machine Image)

Options:
├── Quick Start AMIs (Recommended)
│   ├── Amazon Linux 2023 → AWS-optimized, free tier
│   ├── Ubuntu 22.04 LTS → Most popular for Playwright ✅
│   ├── Windows Server 2022 → For Windows testing
│   └── Red Hat Enterprise Linux → Enterprise choice
│
├── My AMIs → Your saved custom images
├── AWS Marketplace → Pre-configured paid images
└── Community AMIs → User-shared images

✅ For Playwright: Select "Ubuntu Server 22.04 LTS"
   └── Look for "Free tier eligible" tag
```

**What each AMI field means:**
```
├── AMI ID: ami-0c55b159cbfafe1f0 → Unique identifier
├── Architecture: 64-bit (x86) → Processor type
├── Root device type: EBS → Storage type (virtual hard drive)
└── Virtualization: HVM → Modern virtualization (always choose this)
```

#### Step 6: Choose Instance Type

```
What you see: Instance type

Format: family.size (e.g., t3.medium)

Popular choices:
┌──────────────┬──────┬────────┬──────────┬───────────┬─────────────────┐
│ Instance     │ vCPU │ RAM    │ Cost/hr  │ Free Tier │ Best For        │
├──────────────┼──────┼────────┼──────────┼───────────┼─────────────────┤
│ t3.micro     │ 2    │ 1 GB   │ $0.0104  │ ✅ Yes    │ Learning        │
│ t3.small     │ 2    │ 2 GB   │ $0.0208  │ ❌ No     │ 2-3 tests       │
│ t3.medium    │ 2    │ 4 GB   │ $0.0416  │ ❌ No     │ 4-5 tests ⭐    │
│ t3.large     │ 2    │ 8 GB   │ $0.0832  │ ❌ No     │ 6-8 tests       │
│ m5.xlarge    │ 4    │ 16 GB  │ $0.192   │ ❌ No     │ 10-15 tests     │
└──────────────┴──────┴────────┴──────────┴───────────┴─────────────────┘

✅ Recommended: t3.medium (good balance of cost and performance)
```

**Instance Type Families:**
```
├── T3: Burstable (can use extra CPU temporarily) → General purpose, cost-effective
├── M5: Balanced (steady CPU) → Production workloads
├── C5: Compute-optimized (high CPU) → CPU-intensive tests
└── R5: Memory-optimized (high RAM) → Memory-intensive tests
```

#### Step 7: Key Pair (Login Credentials)

```
What you see: Key pair (login)

Options:
├── Select existing key pair → Use previously created key
├── Create new key pair → First time setup ✅
└── Proceed without key pair → ⚠️ DON'T! (You can't SSH later)
```

**Creating New Key Pair:**
```
1. Click "Create new key pair"
2. Enter Key pair name: test-automation-key
3. Choose Key pair type: RSA (most compatible)
4. Choose format:
   ├── .pem → Mac, Linux, Windows PowerShell ✅
   └── .ppk → Windows PuTTY
5. Click "Create key pair"
6. File downloads automatically → SAVE IT! ⚠️
   └── You cannot download it again!
```

**After Download:**
```bash
# Mac/Linux: Set secure permissions
chmod 400 ~/Downloads/test-automation-key.pem

# Move to safe location
mkdir -p ~/.ssh/aws-keys
mv ~/Downloads/test-automation-key.pem ~/.ssh/aws-keys/

# Windows PowerShell: Set permissions
icacls test-automation-key.pem /inheritance:r
icacls test-automation-key.pem /grant:r "${env:USERNAME}:R"
```

#### Step 8: Network Settings (Security Group)

```
What you see: Network settings

Default creates a new security group with SSH allowed from 0.0.0.0/0
⚠️ This is INSECURE! Change it!
```

**Configuration:**
```
1. Firewall (security groups): Create security group ✅
2. Security group name: test-automation-sg
3. Description: Security group for test automation instances

4. Inbound Rules:
   ┌──────┬──────────────┬─────────────────┬──────────────────┐
   │ Type │ Protocol     │ Port Range      │ Source           │
   ├──────┼──────────────┼─────────────────┼──────────────────┤
   │ SSH  │ TCP          │ 22              │ My IP ✅         │
   │      │              │                 │                  │
   │      │ DON'T USE →  │                 │ 0.0.0.0/0 ⚠️     │
   └──────┴──────────────┴─────────────────┴──────────────────┘

5. Allow SSH traffic from: My IP ✅
   └── Console automatically detects your IP (e.g., 123.45.67.89/32)
```

**What "My IP" means:**
```
Your IP: 123.45.67.89
Security rule: 123.45.67.89/32
Result: ONLY you can SSH (secure!)

⚠️ If your IP changes (home WiFi restart, mobile network):
   └── Update security group rule in Console
   └── EC2 → Security Groups → Select → Edit inbound rules
```

**Optional: HTTP for Web Servers**
```
If hosting test report viewer:
├── Add rule: HTTP, Port 80, Source 0.0.0.0/0
└── This allows anyone to view your web page
```

#### Step 9: Configure Storage

```
What you see: Configure storage

Default: 30 GB gp3 (General Purpose SSD)

Options to configure:
├── Size (GiB): 30 (default, good for tests) ✅
│   └── Increase if storing many test artifacts locally
│
├── Volume type:
│   ├── gp3 (General Purpose SSD) → Balanced, recommended ✅
│   ├── gp2 (General Purpose SSD) → Older generation
│   ├── io1/io2 (Provisioned IOPS) → High performance, expensive
│   └── st1/sc1 (HDD) → Cheap, slow
│
├── Delete on termination: ✅ Checked
│   └── EBS deleted when instance terminated (no orphan charges)
│
└── Encrypted: ❌ Not needed for test instances
    └── ✅ Check for production with sensitive data
```

**Cost:**
```
30 GB gp3: $0.10/GB/month = $3/month
└── But only charged when instance exists
└── Terminate instance = No charge ✅
```

#### Step 10: Advanced Details (Optional)

```
Most fields can stay default. Key ones:

IAM instance profile: (Optional)
  └── Select role if instance needs AWS API access
  └── Example: S3-upload role for pushing test reports

User data: (Advanced - automate setup)
  └── Bash script that runs on first boot
  └── Example: Install Node.js, Playwright, clone repo
```

**Example User Data Script:**
```bash
#!/bin/bash
# This runs automatically on instance launch

# Update system
apt-get update -y
apt-get upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install Playwright
npm install -g playwright
playwright install chromium --with-deps

# Create test directory
mkdir -p /home/ubuntu/tests

echo "Setup complete!" > /home/ubuntu/setup-status.txt
```

#### Step 11: Summary and Launch

```
What you see: Summary of all your choices

Review:
├── Name: playwright-test-runner
├── AMI: Ubuntu 22.04 LTS (ami-0c55b159cbfafe1f0)
├── Instance type: t3.medium
├── Key pair: test-automation-key
├── Security group: test-automation-sg (SSH from My IP)
└── Storage: 30 GB gp3

Estimated cost: ~$0.05/hour (~$30/month if running 24/7)
└── But you'll terminate after tests, so much less!
```

Click orange **"Launch instance"** button!

#### Step 12: Success! Now What?

```
You'll see:
"Successfully initiated launch of instance i-0123456789abcdef0"

1. Click "View all instances" or navigate to EC2 → Instances
2. Find your instance (look for Name tag)
3. Wait for "Instance State" → Running (takes 30-60 seconds)
4. Check "Status checks" → 2/2 checks passed (takes 2-3 minutes)
```

#### Step 13: Connect via SSH

```
1. Select your instance (checkbox)
2. Copy "Public IPv4 address" (e.g., 54.123.45.67)
3. Open terminal and run:

ssh -i ~/.ssh/aws-keys/test-automation-key.pem ubuntu@54.123.45.67

First time will ask:
"Are you sure you want to continue connecting?" → Type "yes"

You're in! 🎉
```

### Creating S3 Bucket via Console

#### Step 1: Navigate to S3

```
1. Search for "S3" in top search bar
2. Click "S3" service
3. Click orange "Create bucket" button
```

#### Step 2: Bucket Configuration

```
Field: Bucket name
├── Must be globally unique (across ALL AWS accounts)
├── Example: vibetestq-reports-2026-jan
├── Rules:
│   ├── 3-63 characters
│   ├── Lowercase letters, numbers, hyphens only
│   └── No spaces, underscores, or special characters
└── Tip: Include your org name + purpose + date
```

```
Field: AWS Region
├── Choose closest to your users
├── Examples:
│   ├── us-east-1 (Virginia) → US East Coast
│   ├── us-west-2 (Oregon) → US West Coast
│   ├── ap-south-1 (Mumbai) → India
│   └── eu-west-1 (Ireland) → Europe
└── Tip: Match EC2 instance region for speed
```

```
Field: Block Public Access settings
├── Default: ✅ All checked (private bucket)
├── For test reports (public viewing):
│   └── ❌ Uncheck "Block all public access"
│   └── ⚠️ Acknowledge warning checkbox
└── For sensitive data: ✅ Keep all checked
```

```
Field: Bucket Versioning
├── Disabled (default) → Save space ✅
└── Enabled → Keep file history (costs more)
```

```
Field: Encryption
├── SSE-S3 (default) → Free, good enough ✅
└── SSE-KMS → Custom keys, overkill for tests
```

#### Step 3: Create!

Click **"Create bucket"** (bottom right)

**You now have cloud storage!**

#### Step 4: Upload Test Reports

```
1. Click your bucket name
2. Click "Upload" button
3. Drag files or click "Add files"
4. Click "Upload"

Via CLI (after aws configure):
aws s3 cp report.html s3://vibetestq-reports-2026-jan/
aws s3 sync ./playwright-report/ s3://vibetestq-reports-2026-jan/2024-01-15/
```

### Creating IAM User via Console

#### Step 1: Navigate to IAM

```
1. Search for "IAM" in top search bar
2. Click "IAM" (Identity and Access Management)
3. Left sidebar: Click "Users"
4. Click "Create user" button
```

#### Step 2: User Details

```
Field: User name
├── Example: automation-user
├── No special characters needed
└── This is the login name
```

```
Field: Provide user access to AWS Management Console (optional)
├── ❌ Uncheck (we only need programmatic access for automation)
└── ✅ Check only if human needs Console access
```

Click **"Next"**

#### Step 3: Set Permissions

```
Three options:
├── Add user to group → For managing multiple users ✅ Best practice
├── Copy permissions from existing user → Quick duplication
└── Attach policies directly → Simple for learning ✅
```

**Attach Policies Directly (for learning):**
```
1. Search for: EC2
2. ✅ Check: AmazonEC2FullAccess
3. Search for: S3
4. ✅ Check: AmazonS3FullAccess

⚠️ For production: Create custom policies with minimal permissions
```

Click **"Next"**

#### Step 4: Review and Create

```
Review:
├── User name: automation-user
├── Permissions: AmazonEC2FullAccess, AmazonS3FullAccess
└── Console access: Disabled

Click "Create user"
```

#### Step 5: Create Access Keys

```
1. Click your new user name
2. Click "Security credentials" tab
3. Scroll to "Access keys" section
4. Click "Create access key"

5. Select use case: Command Line Interface (CLI) ✅
6. ✅ Check "I understand..." confirmation
7. Click "Next"

8. (Optional) Add description tag: "Playwright automation"
9. Click "Create access key"
```

#### Step 6: Download Credentials

```
⚠️ CRITICAL: This is your ONLY chance to see the secret key!

You'll see:
├── Access key ID: AKIAIOSFODNN7EXAMPLE
└── Secret access key: wJalrXUtnFEMI/K7MDENG/... (long string)

Options:
├── Click "Download .csv file" → SAVE IT! ✅
└── Or copy both values to password manager
```

#### Step 7: Configure AWS CLI

```bash
aws configure
AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/...
Default region name: us-east-1
Default output format: json

# Verify it works
aws sts get-caller-identity
# Should show your user ARN and account ID
```

### Console vs CLI: When to Use What

```
┌─────────────────────┬──────────────────┬────────────────────┐
│ Task                │ Use Console      │ Use CLI            │
├─────────────────────┼──────────────────┼────────────────────┤
│ First-time setup    │ ✅ Yes           │ ❌ Complex         │
│ Learning AWS        │ ✅ See options   │ ❌ Hidden options  │
│ One-time resource   │ ✅ Quick         │ ⚖️ Either works   │
│ Troubleshooting     │ ✅ Visual debug  │ ⚖️ If know issue  │
│ Repetitive tasks    │ ❌ Tedious       │ ✅ Script it       │
│ CI/CD integration   │ ❌ Not possible  │ ✅ Required        │
│ 10+ instances       │ ❌ Too slow      │ ✅ Batch launch    │
│ Version control     │ ❌ No record     │ ✅ Git scripts     │
└─────────────────────┴──────────────────┴────────────────────┘
```

**Recommended Workflow:**
```
1. Learn with Console (visual, understand options)
   └── Launch first instance manually
   └── Understand what each field means

2. Graduate to CLI (faster, repeatable)
   └── Script repetitive tasks
   └── Automate in CI/CD

3. Eventually Infrastructure as Code (advanced)
   └── Terraform, CloudFormation
   └── Version-controlled infrastructure
```

---

<a name="setup-guide"></a>
## 10. Complete CLI Setup Guide: Step-by-Step

### Prerequisites Check

```bash
# Check AWS CLI installed
aws --version
# Should show: aws-cli/2.x.x

# Configure AWS CLI
aws configure
AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/
Default region name: us-east-1
Default output format: json

# Verify configuration
aws sts get-caller-identity
# Should show your account ID and user
```

### Step-by-Step Instance Launch

```bash
# Step 1: Create Key Pair (for SSH access)
aws ec2 create-key-pair \
  --key-name test-automation-key \
  --query 'KeyMaterial' \
  --output text > test-automation-key.pem

# Set permissions (Mac/Linux)
chmod 400 test-automation-key.pem

# Set permissions PowerShell)
icacls test-automation-key.pem /inheritance:r
icacls test-automation-key.pem /grant:r "${env:USERNAME}:R"

# Step 2: Create Security Group
aws ec2 create-security-group \
  --group-name test-automation-sg \
  --description "Test automation security group"

# Get security group ID from output
SG_ID="sg-12345678"

# Add SSH rule (replace with YOUR IP!)
aws ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr "$(curl -s ifconfig.me)/32"

# Step 3: Launch Instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --count 1 \
  --instance-type t3.medium \
  --key-name test-automation-key \
  --security-group-ids $SG_ID \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=Test-Runner-1}]'

# Get instance ID from output
INSTANCE_ID="i-1234567890abcdef0"

# Step 4: Wait for instance to be running
aws ec2 wait instance-running \
  --instance-ids $INSTANCE_ID

# Step 5: Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "Connect with: ssh -i test-automation-key.pem ubuntu@$PUBLIC_IP"

# Step 6: SSH into instance
ssh -i test-automation-key.pem ubuntu@$PUBLIC_IP

# You're now on AWS EC2 instance! 🎉
```

### User Data Script (Automate Setup)

```bash
# Create user-data.sh file
cat > user-data.sh << 'EOF'
#!/bin/bash

# Update system
apt-get update -y
apt-get upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list
apt-get update
apt-get install -y google-chrome-stable

# Install Playwright
npm install -g playwright
playwright install
playwright install-deps

# Install AWS CLI
apt-get install -y awscli

# Create test directory
mkdir -p /home/ubuntu/tests
chown -R ubuntu:ubuntu /home/ubuntu/tests

echo "Setup complete!" > /home/ubuntu/setup-complete.txt
EOF

# Launch instance with user data
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --count 1 \
  --instance-type t3.medium \
  --key-name test-automation-key \
  --security-group-ids $SG_ID \
  --user-data file://user-data.sh

# Instance will be fully configured when it boots!
# Wait 3-5 minutes for user-data script to complete
```

---

<a name="installing-tools"></a>
## 9. Installing Test Tools on EC2

### Complete Installation Script

```bash
#!/bin/bash
#########################################
# Complete Test Automation Setup
# Ubuntu 22.04 LTS
#########################################

echo "Starting test automation setup..."

# Update system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install essential build tools
sudo apt-get install -y \
  build-essential \
  curl \
  wget \
  git \
  unzip

################################
# Node.js and npm
################################
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

################################
# Playwright
################################
echo "Installing Playwright..."
sudo npm install -g playwright
playwright install chromium firefox webkit
playwright install-deps

# Verify installation
playwright --version

################################
# Browsers
################################
echo "Installing browsers..."

# Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt-get update
sudo apt-get install -y google-chrome-stable

# Firefox (already installed with Playwright)

# Edge (Optional)
# curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
# sudo apt-get install -y microsoft-edge-stable

################################
# Testing Frameworks
################################
echo "Installing test frameworks..."

# Jest
sudo npm install -g jest

# Mocha
sudo npm install -g mocha

# Cypress
sudo npm install -g cypress

################################
# Python and Selenium (Optional)
################################
echo "Installing Python and Selenium..."
sudo apt-get install -y python3 python3-pip
pip3 install selenium pytest playwright

################################
# Java and Selenium (Optional)
################################
echo "Installing Java..."
sudo apt-get install -y default-jre default-jdk

# Selenium Server (if needed)
# wget https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.15.0/selenium-server-4.15.0.jar

################################
# Docker (for containerized testing)
################################
echo "Installing Docker..."
sudo apt-get install -y docker.io
sudo usermod -aG docker ubuntu
sudo systemctl enable docker
sudo systemctl start docker

################################
# AWS CLI
################################
echo "Installing AWS CLI..."
sudo apt-get install -y awscli

# Verify installation
aws --version

################################
# Monitoring Tools
################################
echo "Installing monitoring tools..."

# htop (process monitor)
sudo apt-get install -y htop

# netdata (real-time monitoring)
# bash <(curl -Ss https://my-netdata.io/kickstart.sh)

################################
# Create Directory Structure
################################
echo "Creating project directories..."
cd /home/ubuntu
mkdir -p tests
mkdir -p test-results
mkdir -p screenshots
mkdir -p videos
mkdir -p reports

# Set permissions
sudo chown -R ubuntu:ubuntu /home/ubuntu

################################
# Environment Configuration
################################
echo "Configuring environment..."

# Add to .bashrc
cat >> /home/ubuntu/.bashrc << 'BASHRC'

# Test Automation Aliases
alias runTests='cd ~/tests && npx playwright test'
alias viewReport='cd ~/test-results && ls -lh'
alias uploadReports='aws s3 cp ~/test-results s3://my-reports/ --recursive'

# Environment Variables
export TEST_ENV=aws
export CI=true
export HEADLESS=true

BASHRC

# Source .bashrc
source /home/ubuntu/.bashrc

################################
# Verification
################################
echo "Verifying installations..."
echo "------------------------"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Playwright: $(playwright --version)"
echo "Chrome: $(google-chrome --version)"
echo "Python: $(python3 --version)"
echo "Java: $(java --version)"
echo "Docker: $(docker --version)"
echo "AWS CLI: $(aws --version)"
echo "------------------------"

echo "✅ Setup complete!"
echo "Test directory: /home/ubuntu/tests"
echo "Results directory: /home/ubuntu/test-results"

# Create marker file
echo "Setup completed at $(date)" > /home/ubuntu/setup-complete.txt
```

### Save as AMI for Reuse

```bash
# After setup complete, create AMI

# Step 1: Get instance ID
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=Test-Runner-1" \
  --query 'Reservations[0].Instances[0].InstanceId' \
  --output text

# Step 2: Create AMI
aws ec2 create-image \
  --instance-id i-1234567890abcdef0 \
  --name "Test-Automation-Complete-v1.0" \
  --description "Complete test automation setup with Playwright, Selenium, Chrome" \
  --no-reboot

# Wait for AMI to be available
aws ec2 wait image-available --image-ids ami-0abcdef1234567890

# Step 3: Launch new instances from this AMI
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --count 5 \
  --instance-type t3.medium

# All 5 instances have identical setup! 🎉
```

---

<a name="running-playwright"></a>
## 10. Running Playwright on AWS

### Transfer Your Tests to EC2

**Method 1: Git Clone (Recommended)**
```bash
# SSH into EC2
ssh -i key.pem ubuntu@ec2-public-ip

# Clone your repository
cd /home/ubuntu/tests
git clone https://github.com/yourusername/your-tests.git
cd your-tests

# Install dependencies
npm install

# Run tests
npx playwright test
```

**Method 2: SCP (Secure Copy)**
```bash
# From your local machine
scp -i key.pem -r ./my-tests ubuntu@ec2-public-ip:/home/ubuntu/tests/

# SSH into EC2
ssh -i key.pem ubuntu@ec2-public-ip
cd /home/ubuntu/tests/my-tests

# Install dependencies
npm install

# Run tests
npx playwright test
```

**Method 3: S3 Upload/Download**
```bash
# From local machine: Upload to S3
aws s3 cp ./my-tests s3://my-test-bucket/tests/ --recursive

# On EC2: Download from S3
aws s3 cp s3://my-test-bucket/tests/ /home/ubuntu/tests/ --recursive
cd /home/ubuntu/tests

# Install dependencies and run
npm install
npx playwright test
```

### Playwright Configuration for AWS

```javascript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  
  // Use all CPU cores on EC2
  fullyParallel: true,
  workers: process.env.CI ? parseInt(process.env.WORKERS || '4') : undefined,
  
  // Retry on CI
  retries: process.env.CI ? 2 : 0,
  
  // Reporters
  reporter: [
    ['html', { outputFolder: '/home/ubuntu/test-results/html-report' }],
    ['json', { outputFile: '/home/ubuntu/test-results/results.json' }],
    ['junit', { outputFile: '/home/ubuntu/test-results/junit.xml' }],
    ['list']
  ],
  
  use: {
    // Headless for cloud
    headless: true,
    
    // Screenshots on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Trace on failure
    trace: 'retain-on-failure',
    
    // Artifacts location
    outputDir: '/home/ubuntu/test-results/artifacts',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

### Running Tests and Uploading Results

```bash
#!/bin/bash
# run-tests.sh

# Variables
TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
S3_BUCKET="s3://my-test-reports"
REPORT_DIR="/home/ubuntu/test-results"

# Run tests
echo "Running Playwright tests..."
npx playwright test

# Get exit code
TEST_EXIT_CODE=$?

# Upload results to S3
echo "Uploading results to S3..."
aws s3 cp $REPORT_DIR $S3_BUCKET/$TIMESTAMP/ --recursive

# Generate presigned URL for report
REPORT_URL=$(aws s3 presign $S3_BUCKET/$TIMESTAMP/html-report/index.html --expires-in 604800)

echo "-----------------------------------"
echo "Test run complete!"
echo "Exit code: $TEST_EXIT_CODE"
echo "Report URL: $REPORT_URL"
echo "-----------------------------------"

# Clean up local results
rm -rf $REPORT_DIR/*

# Shutdown instance (optional)
if [ "$AUTO_SHUTDOWN" = "true" ]; then
  echo "Auto-shutdown enabled. Terminating instance..."
  INSTANCE_ID=$(ec2-metadata --instance-id | cut -d " " -f 2)
  aws ec2 terminate-instances --instance-ids $INSTANCE_ID
fi

exit $TEST_EXIT_CODE
```

### Complete End-to-End Script

```bash
#!/bin/bash
###############################################
# Master Script: Launch EC2 → Run Tests → Upload Results
###############################################

# Configuration
AMI_ID="ami-0abcdef1234567890"  # Your custom AMI
INSTANCE_TYPE="t3.medium"
KEY_NAME="test-automation-key"
SECURITY_GROUP="sg-12345678"
S3_BUCKET="s3://my-test-reports"
GITHUB_REPO="https://github.com/yourusername/your-tests.git"

# Step 1: Launch EC2 instance
echo "Launching EC2 instance..."
INSTANCE_ID=$(aws ec2 run-instances \
  --image-id $AMI_ID \
  --count 1 \
  --instance-type $INSTANCE_TYPE \
  --key-name $KEY_NAME \
  --security-group-ids $SECURITY_GROUP \
  --user-data file://test-runner-userdata.sh \
  --query 'Instances[0].InstanceId' \
  --output text)

echo "Instance launched: $INSTANCE_ID"

# Step 2: Wait for instance to be running
echo "Waiting for instance to start..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Step 3: Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "Instance running at: $PUBLIC_IP"

# Step 4: Wait for user-data script to complete
echo "Waiting for setup to complete..."
sleep 120  # Wait 2 minutes for user-data

# Step 5: SSH and run tests
echo "Running tests..."
ssh -i $KEY_NAME.pem -o StrictHostKeyChecking=no ubuntu@$PUBLIC_IP << 'ENDSSH'
  cd /home/ubuntu/tests
  git clone $GITHUB_REPO .
  npm install
  npx playwright test
  
  # Upload results
  TIMESTAMP=$(date +%Y-%m-%d-%H-%M-%S)
  aws s3 cp /home/ubuntu/test-results s3://my-test-reports/$TIMESTAMP/ --recursive
  
  # Output report URL
  echo "Report: https://my-test-reports.s3.amazonaws.com/$TIMESTAMP/html-report/index.html"
ENDSSH

# Step 6: Terminate instance
echo "Terminating instance..."
aws ec2 terminate-instances --instance-ids $INSTANCE_ID

echo "✅ Complete! Test results uploaded to S3."
```

---

<a name="parallel-execution"></a>
## 11. Parallel Execution Strategies

### Strategy 1: Single Instance Parallelization

```
One t3.xlarge (4 vCPU, 16 GB):
├── Launch 1 instance
├── Configure Playwright workers: 8
├── Run 8 tests parallel
├── Cost: $0.1664/hour
└── Good for: Small to medium suites
```

**Configuration:**
```javascript
// playwright.config.ts
export default defineConfig({
  workers: 8, // 2× vCPUs = sweet spot
  fullyParallel: true,
  // ... other config
});
```

### Strategy 2: Multi-Instance Distribution

```
Five t3.medium (2 vCPU, 4 GB each):
├── Launch 5 instances
├── Each runs 4 tests parallel
├── Total: 20 tests parallel
├── Cost: 5 × $0.0416 = $0.208/hour
└── Good for: Better fault tolerance
```

**Test Distribution Script:**
```bash
#!/bin/bash
# distribute-tests.sh

# Launch 5 instances
for i in {1..5}; do
  aws ec2 run-instances \
    --image-id $AMI_ID \
    --instance-type t3.medium \
    --user-data "#!/bin/bash
      cd /home/ubuntu/tests
      git clone $REPO
      npm install
      # Run subset of tests
      npx playwright test --shard=$i/5
      # Upload results
      aws s3 cp test-results s3://reports/shard-$i/ --recursive
      # Terminate self
      shutdown -h now
    " &
done

wait
echo "All test shards complete!"
```

### Strategy 3: AWS Batch for Large Suites

```
AWS Batch:
├── Define job: Run Playwright tests
├── Submit 100 jobs
├── Batch manages instances automatically
├── Auto-scales to available capacity
└── Good for: Enterprise-scale testing
```

**Batch Job Definition:**
```json
{
  "jobDefinitionName": "playwright-test-job",
  "type": "container",
  "containerProperties": {
    "image": "mcr.microsoft.com/playwright:latest",
    "vcpus": 2,
    "memory": 4096,
    "command": [
      "/bin/bash",
      "-c",
      "cd /tests && npm install && npx playwright test"
    ],
    "environment": [
      {"name": "CI", "value": "true"},
      {"name": "HEADLESS", "value": "true"}
    ]
  }
}
```

### Comparison

```
┌─────────────────┬──────────┬──────────┬─────────────┬──────────────┐
│ Strategy        │ Instances│ Parallel │ Complexity  │ Best For     │
├─────────────────┼──────────┼──────────┼─────────────┼──────────────┤
│ Single Instance │ 1        │ 8-16     │ Simple ⭐   │ < 200 tests  │
│ Multi-Instance  │ 5-20     │ 40-160   │ Medium      │ 200-1000     │
│ AWS Batch       │ Auto     │ Unlimited│ Complex     │ > 1000 tests │
└─────────────────┴──────────┴──────────┴─────────────┴──────────────┘
```

---

<a name="execution-options"></a>
## 14. AWS Execution Options Comparison

Now that you know how to run tests on EC2, let's explore ALL execution methods available on AWS and when to use each one.

### The 4 Main Execution Methods

```
Test Execution Options on AWS:

1. EC2 Virtual Machines → Your own cloud computer
2. Managed CI (CodeBuild/GitHub Actions) → Temporary machine per run
3. Serverless (Lambda) → Tests run without servers
4. Managed Browser Grids → Third-party testing service
```

### Option 1: EC2 Virtual Machines (What We've Been Using)

**Simple Explanation:**
```
What: A cloud computer you control completely
Analogy: Renting a dedicated apartment
You: Install OS, tools, run tests, manage everything
```

**How It Works:**
```
1. Launch EC2 instance (Ubuntu, 4GB RAM)
2. SSH into it
3. Install Node.js, Playwright, browsers
4. Clone your test repository
5. Run: npx playwright test
6. Upload results to S3
7. Terminate instance

Execution Environment: You control 100%
```

**Pros:**
```
✅ Full control over environment
✅ Easy debugging (SSH to see what's wrong)
✅ Any instance size (1GB to 768GB RAM)
✅ Install any software
✅ Keep running for multiple test runs (or terminate)
✅ GUI available via VNC if needed
✅ Can save as AMI for reuse
```

**Cons:**
```
❌ You manage everything (updates, security patches)
❌ Must manually terminate to stop charges
❌ Setup time (unless using AMI)
❌ Need to handle scaling yourself
```

**Cost:**
```
t3.medium: $0.0416/hour
Running 2 hours/day for 22 days: $1.83/month + $3 storage = ~$5/month
```

**Best For:**
```
✓ Full test suites (100-1000+ tests)
✓ When you need complete control
✓ Custom browser configurations
✓ Long-running test sessions
✓ Debugging failing tests
✓ Learning AWS basics
```

### Option 2: Managed CI (CodeBuild / GitHub Actions)

**Simple Explanation:**
```
What: Temporary machine created for each test run, destroyed after
Analogy: Hotel room - check in, use, check out, room cleaned
You: Just provide test code, everything else automatic
```

**How It Works (GitHub Actions Example):**
```yaml
# .github/workflows/test.yml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest  # ← GitHub provides this machine
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/

# Machine auto-created, test runs, machine auto-destroyed
```

**How It Works (AWS CodeBuild):**
```yaml
# buildspec.yml
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - npm install
      - npx playwright install --with-deps
  build:
    commands:
      - npx playwright test
artifacts:
  files:
    - playwright-report/**/*
```

**Pros:**
```
✅ Zero infrastructure management
✅ Auto-cleanup (no runaway charges)
✅ Fresh environment every run (no pollution)
✅ Easy CI/CD integration
✅ Pay only for build minutes
✅ Good for PR validation
```

**Cons:**
```
❌ Limited control (preset VM configurations)
❌ Harder to debug (machine destroyed after run)
❌ Can't install custom system packages easily
❌ GitHub Actions: Max 6 hours per job
❌ AWS CodeBuild: Max 8 hours per build
```

**Cost:**
```
GitHub Actions:
  ├── Free: 2000 minutes/month
  ├── After: $0.008/minute ($0.48/hour)
  └── Example: 20 runs × 30 min = 600 minutes = FREE

AWS CodeBuild:
  ├── Free: 100 build minutes/month
  ├── After: $0.005/minute ($0.30/hour for general1.small)
  └── Example: 20 runs × 30 min = 600 minutes = $2.50/month
```

**Best For:**
```
✓ CI/CD pipelines
✓ PR validation tests
✓ Test runs < 30 minutes
✓ Teams wanting zero infrastructure
✓ Consistent, repeatable environments
✓ Budget-conscious projects (free tier!)
```

### Option 3: Serverless (AWS Lambda)

**Simple Explanation:**
```
What: Tests run in functions without any servers
Analogy: Light switch - press button, light on, release, light off
You: Upload test code as function, AWS runs it
```

**How It Works:**
```
1. Package Playwright + browsers + tests into Lambda function
2. Trigger Lambda (API call, schedule, S3 event)
3. Lambda spins up, runs test, returns result
4. Lambda shuts down automatically
5. Pay only for execution time (rounded to 1ms)

Challenge: Playwright + Chromium = 100MB+ (Lambda limit: 250MB)
Solution: Use Lambda layers or /tmp storage
```

**Example Lambda Function:**
```javascript
// lambda-function/index.js
const playwright = require('playwright-aws-lambda');

exports.handler = async (event) => {
  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://example.com');
  const title = await page.title();
  
  await browser.close();
  
  return {
    statusCode: 200,
    body: JSON.stringify({ title, success: true })
  };
};
```

**Pros:**
```
✅ Zero server management
✅ Auto-scaling (0 to 1000s instantly)
✅ Pay per execution (very cheap for light usage)
✅ Event-driven (trigger on S3 upload, schedule, API call)
✅ No idle costs (truly pay-per-use)
```

**Cons:**
```
❌ Complex setup (packaging Chromium)
❌ Execution time limit: 15 minutes max
❌ Memory limit: 10GB max
❌ Headless only (no GUI)
❌ Cold start delay (1-3 seconds first run)
❌ Difficult debugging
❌ Not suitable for full test suites
```

**Cost:**
```
Free tier:
  ├── 1 million requests/month
  └── 400,000 GB-seconds compute

After free tier:
  ├── $0.20 per 1 million requests
  ├── $0.0000166667/GB-second
  └── Example: 1000 tests, 5 sec each, 512MB = $0.04

⭐ Extremely cheap for smoke tests!
```

**Best For:**
```
✓ Smoke tests (5-10 critical tests)
✓ Health checks (is site up?)
✓ Scheduled checks (every 5 minutes)
✓ Event-triggered validation (after deployment)
✓ API testing (fast, no browser overhead)
✗ NOT for full UI test suites
```

**Packages for Lambda:**
```
1. playwright-aws-lambda → Chromium optimized for Lambda
2. chrome-aws-lambda → Standalone Chromium binary
3. puppeteer-core + chrome-aws-lambda → Puppeteer alternative
```

### Option 4: Managed Browser Grids

**Simple Explanation:**
```
What: Third-party service that runs tests for you
Analogy: Hiring a testing company - you send tests, they run, you get results
You: Write tests, upload, configure, view results
```

**Popular Services:**
```
1. AWS Device Farm
   ├── AWS's own testing service
   ├── Real devices + browsers
   ├── Mobile (iOS, Android) + Web
   └── Pay per device minute

2. BrowserStack
   ├── 3000+ browser/OS combinations
   ├── Real devices + emulators
   ├── Live testing + automation
   └── Subscription-based

3. LambdaTest
   ├── 3000+ browser configurations
   ├── Playwright/Selenium cloud grid
   ├── Parallel testing included
   └── Free tier available

4. Sauce Labs
   ├── Enterprise-grade platform
   ├── Mobile + web testing
   ├── CI/CD integration
   └── Advanced analytics
```

**How It Works (BrowserStack Example):**
```javascript
// playwright.config.js
const config = {
  use: {
    connectOptions: {
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
        'browser': 'chrome',
        'os': 'Windows',
        'os_version': '11',
        'browserstack.username': process.env.BROWSERSTACK_USERNAME,
        'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
      }))}`
    }
  }
};

// Run: npx playwright test
// Tests run on BrowserStack's infrastructure, not yours!
```

**Pros:**
```
✅ Zero infrastructure setup
✅ Access to 1000s of browser/OS combinations
✅ Real devices (not emulators)
✅ Instant scalability (100+ parallel)
✅ Built-in video recording, screenshots
✅ No maintenance burden
✅ Great for cross-browser testing
```

**Cons:**
```
❌ Expensive at scale ($$$)
❌ Less debugging control
❌ Network latency (external service)
❌ Vendor lock-in
❌ Can't install custom software
❌ Monthly subscription required
❌ Internet dependency
```

**Cost:**
```
BrowserStack (Automation Plan):
  ├── Starter: $29/month (1 parallel, 100 min)
  ├── Team: $199/month (5 parallel, unlimited)
  └── Enterprise: Custom pricing

AWS Device Farm:
  ├── Desktop: $0.005/minute
  ├── Mobile: $0.17/minute
  └── Example: 100 tests × 2 min = $1 (desktop)

LambdaTest:
  ├── Free: 100 minutes/month
  ├── Lite: $15/month (6 parallels)
  └── Pro: $150/month (60 parallels)
```

**Best For:**
```
✓ Cross-browser testing (Chrome, Firefox, Safari, Edge)
✓ Cross-platform testing (Windows, Mac, Linux)
✓ Mobile testing (iOS, Android)
✓ Occasional testing (low volume)
✓ Teams without DevOps skills
✗ NOT cost-effective for high-volume daily runs
```

### Complete Comparison Matrix

```
┌────────────────────┬──────────┬────────────┬─────────┬──────────────┐
│ Feature            │ EC2      │ Managed CI │ Lambda  │ Browser Grid │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Infrastructure     │ You      │ Provider   │ AWS     │ Vendor       │
│ Management         │ Manage   │            │         │              │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Setup Complexity   │ Medium   │ Easy       │ Hard    │ Easy         │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Maintenance        │ High     │ None       │ Low     │ None         │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Debugging Ease     │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐      │ ⭐⭐    │ ⭐⭐⭐        │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Control/           │ Full     │ Limited    │ Limited │ Minimal      │
│ Flexibility        │          │            │         │              │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Scaling            │ Manual   │ Auto       │ Auto    │ Auto         │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Max Execution Time │ Unlimited│ 6-8 hrs    │ 15 min  │ Varies       │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Cost Efficiency    │ Good     │ Good       │ Excellent│ Expensive   │
│ (High Volume)      │          │            │         │              │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Free Tier          │ ✅       │ ✅         │ ✅      │ Limited      │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ CI/CD Integration  │ Manual   │ Native     │ Medium  │ Easy         │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Cross-Browser      │ Install  │ Install    │ Limited │ ⭐⭐⭐⭐⭐    │
│ Testing            │ manually │ manually   │         │              │
├────────────────────┼──────────┼────────────┼─────────┼──────────────┤
│ Learning Curve     │ Medium   │ Easy       │ Hard    │ Easy         │
└────────────────────┴──────────┴────────────┴─────────┴──────────────┘
```

### Decision Tree

```
How to choose execution method:

Start here:
    │
    ├→ Need cross-browser/platform testing?
    │   └→ YES → Browser Grid (BrowserStack, LambdaTest)
    │   └→ NO → Continue
    │
    ├→ Test suite runs < 5 minutes?
    │   └→ YES → Consider Lambda (smoke tests)
    │   └→ NO → Continue
    │
    ├→ Want zero infrastructure management?
    │   └→ YES → Managed CI (GitHub Actions, CodeBuild)
    │   └→ NO → Continue
    │
    ├→ Need full control / complex setup?
    │   └→ YES → EC2 Virtual Machines
    │   └→ NO → Continue
    │
    ├→ Running > 1000 tests frequently?
    │   └→ YES → EC2 with Auto Scaling
    │   └→ NO → Managed CI
    │
    └→ Budget very tight?
        └→ Use free tiers: GitHub Actions (2000 min) or Lambda
```

---

<a name="when-to-use-what"></a>
## 15. When to Use: EC2 vs Managed CI vs Serverless

### Scenario-Based Recommendations

#### Scenario 1: Startup with 50 Tests

```
Team: 3 developers
Tests: 50 Playwright tests
Run frequency: 3 times/day (on each commit)
Run time: 10 minutes per run
```

**Recommended: GitHub Actions ⭐**
```
Why:
✓ 30 test runs/day × 10 min = 300 min/day = 6,600 min/month
✓ Under 2000 free minutes (FREE!)
✓ Zero setup time
✓ Perfect CI/CD integration
✓ Team can focus on tests, not infrastructure

Setup:
1. Add .github/workflows/test.yml (5 minutes)
2. Push code
3. Tests run automatically
4. Done!

Monthly cost: $0 ✅
```

#### Scenario 2: Growing Team with 300 Tests

```
Team: 10 developers
Tests: 300 Playwright tests
Run frequency: 10 times/day
Run time: 30 minutes per run
```

**Recommended: AWS EC2 with Spot Instances ⭐**
```
Why:
✓ 10 runs × 30 min = 5 hours/day = 110 hours/month
✓ GitHub Actions: 110 × 60 = 6,600 min ($32/month after free tier)
✓ EC2 t3.large Spot: 110 hrs × $0.025/hr = $2.75/month
✓ You save $29/month!
✓ Full control for debugging
✓ Can scale to more parallels easily

Setup:
1. Create AMI with Playwright pre-installed (30 min one-time)
2. GitHub Actions triggers EC2 launch (1 hour setup)
3. EC2 runs tests, uploads to S3, terminates
4. Total setup: 2 hours

Monthly cost: ~$5/month (compute + storage)
```

#### Scenario 3: Smoke Tests for Production Monitoring

```
Need: Check critical user flows every 5 minutes
Tests: 5 smoke tests
Run time: 1 minute per check
Frequency: 12 times/hour × 24 hours = 288 times/day
```

**Recommended: AWS Lambda ⭐**
```
Why:
✓ 288 runs/day × 30 days = 8,640 runs/month
✓ Under 1 million free requests (FREE!)
✓ Auto-scaling (handles traffic spikes)
✓ Event-driven (CloudWatch alarms, SNS notifications)
✓ Zero idle cost

Setup:
1. Package Playwright in Lambda (2 hours using guides)
2. Create CloudWatch Events rule (trigger every 5 min)
3. Lambda runs, sends metrics to CloudWatch
4. Alert if any test fails

Monthly cost: $0 (within free tier) ✅
```

#### Scenario 4: Enterprise with 2000 Tests

```
Team: 50+ developers
Tests: 2000 Playwright tests
Run frequency: 20-30 times/day
Run time: 60 minutes per run (if serial)
Required: Results in < 10 minutes
```

**Recommended: EC2 Fleet with Auto Scaling ⭐**
```
Why:
✓ Need 20+ parallel instances
✓ 2000 tests ÷ 20 instances = 100 tests each
✓ 100 tests @ 8 parallel = 12 minutes per instance
✓ Total: 12 minutes end-to-end ✅
✓ Cost-effective with Spot Instances

Architecture:
1. GitHub Actions triggers AWS Step Functions
2. Step Functions launches 20 EC2 Spot instances from AMI
3. Each instance runs 100 tests (8 parallel)
4. Results uploaded to S3
5. Step Functions aggregates results
6. Instances auto-terminate
7. Total time: ~15 minutes (including launch)

Monthly cost:
├── 25 runs/day × 20 instances × 0.25 hrs × $0.025/hr
├── = 25 × 20 × 0.25 × 0.025 = $3.12/day
├── × 22 working days = $68/month
└── + S3 storage $5/month = $73/month total

Compare to GitHub Actions Minutes:
├── 25 runs × 12 min × 20 workers = 6,000 minutes/day
├── 132,000 minutes/month × $0.008 = $1,056/month
└── EC2 saves $983/month! ⭐
```

#### Scenario 5: Cross-Browser Testing (Edge Cases)

```
Need: Test on Chrome, Firefox, Safari, Edge
Tests: 100 tests per browser = 400 total
Frequency: Once per release (5 times/month)
```

**Recommended: Browser Grid (BrowserStack) ⭐**
```
Why:
✓ 400 tests × 5 releases = 2,000 browser tests/month
✓ EC2: Need to install/manage 4 browsers (complexity)
✓ BrowserStack: Access all browsers instantly
✓ Safari only available on Mac (expensive on AWS)
✓ Low frequency = subscription cost acceptable

Cost:
├── BrowserStack Team: $199/month (5 parallels)
├── 400 tests ÷ 5 parallels = 80 minutes per release
├── 80 min × 5 releases = 400 minutes/month (well under limit)
└── Total: $199/month

Alternative EC2 (for comparison):
├── Need Mac instances for Safari ($1.08/hr minimum)
├── Plus Linux instances for others
├── Complex setup and maintenance
├── Cost: $300+/month + DevOps time
└── BrowserStack is better here ✅
```

### Cost Comparison: Real Numbers

```
Scenario: 500 tests, 2 hours runtime, 20 runs/month

┌─────────────────────┬────────────────┬─────────────────────┐
│ Method              │ Monthly Cost   │ Notes               │
├─────────────────────┼────────────────┼─────────────────────┤
│ Your Laptop (24/7)  │ $0 electricity │ Can't use laptop    │
│                     │ + $100 lost    │ Blocks other work   │
│                     │ productivity   │                     │
├─────────────────────┼────────────────┼─────────────────────┤
│ Dedicated Machine   │ $50 electricity│ Wasted when idle    │
│                     │ + $1,200       │ Upfront cost        │
│                     │ amortized      │                     │
├─────────────────────┼────────────────┼─────────────────────┤
│ GitHub Actions      │ $32            │ (6,600 min used)    │
│                     │                │ Easy setup          │
├─────────────────────┼────────────────┼─────────────────────┤
│ AWS CodeBuild       │ $16            │ AWS native          │
│                     │                │ Good for AWS users  │
├─────────────────────┼────────────────┼─────────────────────┤
│ EC2 On-Demand       │ $6.60          │ t3.large            │
│                     │                │ Terminate after use │
├─────────────────────┼────────────────┼─────────────────────┤
│ EC2 Spot            │ $2-3 ⭐        │ 70% discount        │
│                     │                │ Most cost-effective │
├─────────────────────┼────────────────┼─────────────────────┤
│ Lambda (smoke only) │ $0-1           │ Only for < 15 min   │
├─────────────────────┼────────────────┼─────────────────────┤
│ BrowserStack        │ $199           │ Cross-browser needs │
└─────────────────────┴────────────────┴─────────────────────┘

Winner for most teams: EC2 Spot Instances! 🏆
```

### Your Progressive Journey

**Phase 1: Learning (Week 1-2)**
```
Start with: GitHub Actions
Why: Free, zero setup, learn basics
Goal: Understand CI/CD integration
```

**Phase 2: Growing (Month 1-3)**
```
Graduate to: AWS EC2 Manual Launch
Why: Learn AWS, full control, cost-effective
Goal: Master EC2, SSH, AMIs, S3
```

**Phase 3: Scaling (Month 3-6)**
```
Automate with: GitHub Actions → EC2 Launch Script
Why: Best of both worlds
Goal: Automated infrastructure
```

**Phase 4: Enterprise (Month 6+)**
```
Implement: Auto Scaling Groups + Step Functions
Why: Handle 1000s of tests efficiently
Goal: Production-grade infrastructure
```

### Quick Decision Guide

```
Choose GitHub Actions if:
├── < 30 min per test run
├── Standard test setup (no exotic dependencies)
├── Want CI/CD out-of-the-box
├── Budget: Free tier OK
└── Team: Small (< 10 developers)

Choose AWS EC2 if:
├── > 30 min per test run
├── Need full environment control
├── Want lowest cost at scale
├── Budget: $5-100/month OK
└── Team: Medium to large

Choose Lambda if:
├── Smoke tests only (< 15 min)
├── Event-driven execution
├── Infrequent runs (< hourly)
├── Budget: Near-zero cost needed
└── Team: Comfortable with advanced AWS

Choose Browser Grid if:
├── Cross-browser testing required
├── Don't want infrastructure hassle
├── Occasional testing (not daily)
├── Budget: $50-500/month OK
└── Team: Wants managed solution
```

---

<a name="cost-management"></a>
## 16. AWS Cost Management

### Understanding Your Bill

```
Typical Test Automation Costs:

EC2 Compute:
├── t3.medium: $0.0416/hour
├── Run 2 hours/day × 22 days = 44 hours/month
├── Cost: 44 × $0.0416 = $1.83/month
└── Your biggest cost component

EBS Storage:
├── 30 GB volume: $0.10/GB/month
├── Cost: 30 × $0.10 = $3.00/month
└── Even if instance stopped

S3 Storage:
├── 10 GB reports: $0.023/GB/month
├── Cost: 10 × $0.023 = $0.23/month
└── Negligible cost

Data Transfer:
├── 1 GB upload to S3: Free
├── 1 GB download from S3: $0.09/GB
├── First 100 GB/month: Free
└── Usually free

Total Example:
├── EC2: $1.83
├── EBS: $3.00
├── S3: $0.23
├── Transfer: $0.00
└── Total: $5.06/month 🎉
```

### Cost Optimization Strategies

#### 1. Terminate, Don't Stop

```
Stopped Instance:
├── Not paying for compute: $0.0416/hour ❌
├── Still paying for storage: $3.00/month ✗
├── Total savings: 90%

Terminated Instance:
├── Not paying for compute: $0.0416/hour ❌
├── Not paying for storage: $3.00/month ❌
├── Total savings: 100% ✓
```

**When to Stop vs Terminate:**
```
STOP when:
✓ Need same instance later today
✓ Have important data on EBS
✓ Complex setup you'll reuse

TERMINATE when:
✓ Tests complete
✓ Using AMI to recreate
✓ Don't need again soon
✗ Recommended for test automation ⭐
```

#### 2. Use Spot Instances (90% Discount!)

```
On-Demand vs Spot:

On-Demand t3.medium:
├── Price: $0.0416/hour
├── Always available
└── Never interrupted

Spot t3.medium:
├── Price: ~$0.0125/hour (70% off!)
├── May be interrupted
└── Perfect for testing ⭐

Savings Example:
├── On-Demand: 100 hours × $0.0416 = $4.16
├── Spot: 100 hours × $0.0125 = $1.25
└── Savings: $2.91 (70% off!)
```

**Launching Spot Instance:**
```bash
aws ec2 run-instances \
  --image-id ami-12345678 \
  --instance-type t3.medium \
  --instance-market-options '{"MarketType":"spot","SpotOptions":{"MaxPrice":"0.02","SpotInstanceType":"one-time"}}' \
  --key-name test-key \
  --security-group-ids sg-12345678

# If spot price > $0.02, won't launch
# Usually runs at $0.0125 (~$0.02 max)
```

**Spot Instance Best Practices:**
```
✓ Good for: Test automation (can retry if interrupted)
✓ Save snapshots/reports frequently
✓ Handle interruption gracefully
✓ Set max price (don't use default)

✗ Bad for: 24/7 production services
✗ Critical data without backups
```

#### 3. Reserved Instances (For 24/7 Selenium Grid)

```
If running 24/7 Selenium Grid:

On-Demand t3.large:
├── $0.0832/hour
├── 730 hours/month
├── Monthly: $60.74
└── Annual: $728.88

Reserved Instance (1 year):
├── Upfront: $438
├── Hourly: $0
├── Annual: $438
└── Savings: $290.88 (40% off!)

Reserved Instance (3 years):
├── Upfront: $877
├── Annual (amortized): $292
└── Savings: $436.88 (60% off!)

Use when:
✓ Running 24/7 for 1+ year
✓ Budget approved
✓ Production Selenium Grid
```

#### 4. Auto-Shutdown Lambda

```javascript
// Lambda function: Auto-terminate idle instances
exports.handler = async (event) => {
    const AWS = require('aws-sdk');
    const ec2 = new AWS.EC2();
    
    // Find instances with tag "auto-terminate: true"
    const params = {
        Filters: [
            {Name: 'tag:auto-terminate', Values: ['true']},
            {Name: 'instance-state-name', Values: ['running']}
        ]
    };
    
    const instances = await ec2.describeInstances(params).promise();
    
    for (const reservation of instances.Reservations) {
        for (const instance of reservation.Instances) {
            const launchTime = new Date(instance.LaunchTime);
            const now = new Date();
            const ageMinutes = (now - launchTime) / 1000 / 60;
            
            // Terminate if running > 60 minutes
            if (ageMinutes > 60) {
                await ec2.terminateInstances({
                    InstanceIds: [instance.InstanceId]
                }).promise();
                
                console.log(`Terminated ${instance.InstanceId} (age: ${ageMinutes} min)`);
            }
        }
    }
};

// Schedule: Run every 15 minutes
// Prevents forgotten instances from racking up charges!
```

### Budget Alerts

```bash
# Create budget alert
aws budgets create-budget \
  --account-id 123456789012 \
  --budget '{
    "BudgetName": "Test-Automation-Monthly",
    "BudgetLimit": {
      "Amount": "50",
      "Unit": "USD"
    },
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }'

# Create notification
aws budgets create-notification \
  --account-id 123456789012 \
  --budget-name Test-Automation-Monthly \
  --notification '{
    "NotificationType": "ACTUAL",
    "ComparisonOperator": "GREATER_THAN",
    "Threshold": 80,
    "ThresholdType": "PERCENTAGE"
  }' \
  --subscriber '{
    "SubscriptionType": "EMAIL",
    "Address": "your-email@example.com"
  }'

# Get alert when costs exceed $40 (80% of $50 budget)
```

### Cost Monitoring Dashboard

```bash
# Get current month costs
aws ce get-cost-and-usage \
  --time-period Start=$(date +%Y-%m-01),End=$(date +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --group-by Type=SERVICE

# Output shows cost by service:
# EC2: $15.30
# S3: $0.45
# Data Transfer: $1.20
# Total: $16.95
```

---

<a name="monitoring"></a>
## 13. Monitoring with CloudWatch

### Key Metrics to Track

```
EC2 Instance Metrics (Free):
├── CPUUtilization: % of CPU used
├── NetworkIn: Bytes received
├── NetworkOut: Bytes sent
├── DiskReadBytes: Disk reads
├── DiskWriteBytes: Disk writes
└── StatusCheckFailed: Health checks

Custom Metrics (Requires agent):
├── MemoryUtilization: % of RAM used
├── DiskSpace: Available storage
├── ProcessCount: Number of processes
└── Custom: Test pass/fail counts
```

### Installing CloudWatch Agent

```bash
# Download and install agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Configure agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

# During wizard, select:
# - Monitor memory: Yes
# - Monitor disk: Yes
# - Monitor logs: Yes

# Start agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -s \
  -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json

# Verify
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a query \
  -m ec2 \
  -c default

# Now memory and disk metrics appear in CloudWatch!
```

### Creating Alarms

```bash
# Alert: High CPU (Tests consuming too much CPU)
aws cloudwatch put-metric-alarm \
  --alarm-name test-runner-high-cpu \
  --alarm-description "Test runner CPU > 90%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 90 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=InstanceId,Value=i-1234567890

# Alert: Low memory (Tests consuming too much RAM)
aws cloudwatch put-metric-alarm \
  --alarm-name test-runner-low-memory \
  --metric-name MemoryUtilization \
  --namespace CWAgent \
  --statistic Average \
  --period 300 \
  --evaluation-periods 1 \
  --threshold 90 \
  --comparison-operator GreaterThanThreshold

# Alert: Instance status check failed
aws cloudwatch put-metric-alarm \
  --alarm-name test-runner-status-check \
  --metric-name StatusCheckFailed \
  --namespace AWS/EC2 \
  --statistic Maximum \
  --period 60 \
  --evaluation-periods 2 \
  --threshold 1 \
  --comparison-operator GreaterThanOrEqualToThreshold

# All alerts can send SNS notifications (email/SMS)
```

### Custom Test Metrics

```javascript
// Send custom metrics from Playwright tests
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch({ region: 'us-east-1' });

async function publishTestMetrics(testResults) {
    const params = {
        Namespace: 'TestAutomation',
        MetricData: [
            {
                MetricName: 'TestsPassed',
                Value: testResults.passed,
                Unit: 'Count',
                Timestamp: new Date()
            },
            {
                MetricName: 'TestsFailed',
                Value: testResults.failed,
                Unit: 'Count',
                Timestamp: new Date()
            },
            {
                MetricName: 'TestDuration',
                Value: testResults.duration,
                Unit: 'Seconds',
                Timestamp: new Date()
            },
            {
                MetricName: 'TestSuccess Rate',
                Value: (testResults.passed / testResults.total) * 100,
                Unit: 'Percent',
                Timestamp: new Date()
            }
        ]
    };
    
    await cloudwatch.putMetricData(params).promise();
}

// Use in Playwright global teardown
// globalTeardown.ts
export default async function globalTeardown() {
    const results = {
        passed: 45,
        failed: 5,
        total: 50,
        duration: 320
    };
    
    await publishTestMetrics(results);
}
```

### Viewing Logs

```bash
# Create log group
aws logs create-log-group --log-group-name /test-automation/playwright

# Stream test output to CloudWatch
npx playwright test 2>&1 | while read line; do
    aws logs put-log-events \
        --log-group-name /test-automation/playwright \
        --log-stream-name "test-$(date +%Y-%m-%d)" \
        --log-events timestamp=$(date +%s000),message="$line"
done

# Query logs
aws logs filter-log-events \
    --log-group-name /test-automation/playwright \
    --filter-pattern "ERROR" \
    --start-time $(date -d '1 hour ago' +%s000)

# All test failures visible in CloudWatch console!
```

---

<a name="auto-scaling"></a>
## 14. Advanced: Auto Scaling for Testing

### When You Need Auto Scaling

```
Use Auto Scaling when:
✓ Test volume fluctuates (10 tests vs 1000 tests)
✓ Trigger tests on every commit (unpredictable)
✓ Want automatic capacity management
✓ Enterprise-scale testing

Don't need Auto Scaling when:
✗ Running tests manually/scheduled
✗ Small, predictable test suites
✗ Learning AWS (adds complexity)
```

### Auto Scaling Components

```
1. Launch Template:
   └── Blueprint for instances (AMI, type, security, etc.)

2. Auto Scaling Group (ASG):
   └── Manages fleet of instances (min, max, desired)

3. Scaling Policy:
   └── Rules for scaling up/down (CPU, custom metrics)

4. CloudWatch Alarm:
   └── Triggers scaling policy when condition met
```

### Step-by-Step Auto Scaling Setup

```bash
# Step 1: Create Launch Template
aws ec2 create-launch-template \
  --launch-template-name test-runner-template \
  --launch-template-data '{
    "ImageId": "ami-your-test-ami",
    "InstanceType": "t3.medium",
    "KeyName": "test-key",
    "SecurityGroupIds": ["sg-12345678"],
    "UserData": "IyEvYmluL2Jhc2gKY2QgL2hvbWUvdWJ1bnR1L3Rlc3RzCmdpdCBwdWxsCm5wbSB0ZXN0CmF3cyBzMyBjcCAuLi4Kc2h1dGRvd24gLWggbm93Cg==",
    "TagSpecifications": [{
      "ResourceType": "instance",
      "Tags": [{"Key": "Name", "Value": "Test-Runner-ASG"}]
    }]
  }'

# Step 2: Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name test-runner-asg \
  --launch-template LaunchTemplateName=test-runner-template,Version=1 \
  --min-size 0 \
  --max-size 20 \
  --desired-capacity 0 \
  --availability-zones us-east-1a us-east-1b

# Step 3: Create Scaling Policy (Scale out)
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name test-runner-asg \
  --policy-name scale-out \
  --scaling-adjustment 5 \
  --adjustment-type ChangeInCapacity \
  --cooldown 300

# Get ARN from output
SCALE_OUT_ARN="arn:aws:autoscaling:us-east-1:123456789:scalingPolicy:..."

# Step 4: Create CloudWatch Alarm to trigger scale-out
aws cloudwatch put-metric-alarm \
  --alarm-name test-queue-high \
  --alarm-description "Scale out when many tests queued" \
  --metric-name ApproximateNumberOfMessagesVisible \
  --namespace AWS/SQS \
  --statistic Average \
  --period 60 \
  --evaluation-periods 1 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --alarm-actions $SCALE_OUT_ARN

# Step 5: Create Scaling Policy (Scale in)
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name test-runner-asg \
  --policy-name scale-in \
  --scaling-adjustment -2 \
  --adjustment-type ChangeInCapacity \
  --cooldown 600

# Get ARN
SCALE_IN_ARN="arn:aws:autoscaling:..."

# Step 6: Create alarm to trigger scale-in
aws cloudwatch put-metric-alarm \
  --alarm-name test-queue-low \
  --metric-name ApproximateNumberOfMessagesVisible \
  --namespace AWS/SQS \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 2 \
  --comparison-operator LessThanThreshold \
  --alarm-actions $SCALE_IN_ARN

# Now ASG automatically scales based on test queue!
```

### How It Works

```
Scenario: Developer pushes code

1. GitHub Action triggered
   └── Adds test job to SQS queue

2. CloudWatch detects queue > 10 messages
   └── Triggers scale-out alarm
   └── ASG launches 5 instances

3. Instances boot and start:
   └── Pull code from Git
   └── Run subset of tests
   └── Upload results to S3
   └── Terminate themselves

4. Queue empties
   └── CloudWatch detects queue < 2
   └── Triggers scale-in alarm
   └── ASG terminates idle instances

5. Result:
   ├── Automatic capacity management
   ├── Pay only for actual test time
   ├── No manual intervention
   └── Scales from 0 to 20 instances as needed ✅
```

### Cost Analysis

```
Without Auto Scaling:
├── Keep 5 instances running 24/7
├── Cost: 5 × $0.0416 × 730 hours = $152/month
├── Utilization: 20% (idle most of the time)
└── Wasted: $121.60/month

With Auto Scaling:
├── Instances run only when tests queued
├── Average: 2 hours/day of activity
├── Instances launched: 5 × 2 hours × 22 days = 220 hours/month
├── Cost: 220 × $0.0416 = $9.15/month
└── Savings: $142.85/month (94% savings!)
```

---

<a name="cicd-integration"></a>
## 15. Integrating with CI/CD

### GitHub Actions Integration

```yaml
# .github/workflows/aws-tests.yml
name: AWS Test Automation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *'  # Run at 2 AM daily

env:
  AWS_REGION: us-east-1
  AMI_ID: ami-your-test-runner-ami
  INSTANCE_TYPE: t3.medium
  KEY_NAME: test-automation-key
  SECURITY_GROUP: sg-12345678
  S3_BUCKET: my-test-reports

jobs:
  launch-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ env.AWS_REGION }}
    
    - name: Launch EC2 Instance
      id: launch
      run: |
        INSTANCE_ID=$(aws ec2 run-instances \
          --image-id ${{ env.AMI_ID }} \
          --instance-type ${{ env.INSTANCE_TYPE }} \
          --key-name ${{ env.KEY_NAME }} \
          --security-group-ids ${{ env.SECURITY_GROUP }} \
          --user-data file://userdata.sh \
          --query 'Instances[0].InstanceId' \
          --output text)
        
        echo "instance_id=$INSTANCE_ID" >> $GITHUB_OUTPUT
        echo "Launched instance: $INSTANCE_ID"
        
        # Wait for running
        aws ec2 wait instance-running --instance-ids $INSTANCE_ID
        
        # Get public IP
        PUBLIC_IP=$(aws ec2 describe-instances \
          --instance-ids $INSTANCE_ID \
          --query 'Reservations[0].Instances[0].PublicIpAddress' \
          --output text)
        
        echo "public_ip=$PUBLIC_IP" >> $GITHUB_OUTPUT
        echo "Instance IP: $PUBLIC_IP"
    
    - name: Wait for Tests to Complete
      run: |
        # Poll S3 for results
        TIMESTAMP=$(date +%Y-%m-%d)
        MAX_WAIT=1800  # 30 minutes
        ELAPSED=0
        
        while [ $ELAPSED -lt $MAX_WAIT ]; do
          if aws s3 ls s3://${{ env.S3_BUCKET }}/$TIMESTAMP/results.json; then
            echo "Tests complete!"
            break
          fi
          
          echo "Waiting for tests... ($ELAPSED seconds)"
          sleep 30
          ELAPSED=$((ELAPSED + 30))
        done
        
        if [ $ELAPSED -ge $MAX_WAIT ]; then
          echo "Tests timed out!"
          exit 1
        fi
    
    - name: Download Results
      run: |
        TIMESTAMP=$(date +%Y-%m-%d)
        aws s3 cp s3://${{ env.S3_BUCKET }}/$TIMESTAMP/ ./results/ --recursive
    
    - name: Parse Results
      id: results
      run: |
        PASSED=$(jq -r '.suites[].suites[].specs[] | select(.ok==true) | .title' results/results.json | wc -l)
        FAILED=$(jq -r '.suites[].suites[].specs[] | select(.ok==false) | .title' results/results.json | wc -l)
        
        echo "passed=$PASSED" >> $GITHUB_OUTPUT
        echo "failed=$FAILED" >> $GITHUB_OUTPUT
        
        echo "Tests passed: $PASSED"
        echo "Tests failed: $FAILED"
        
        if [ $FAILED -gt 0 ]; then
          exit 1
        fi
    
    - name: Upload Artifacts
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: results/
    
    - name: Terminate Instance
      if: always()
      run: |
        aws ec2 terminate-instances \
          --instance-ids ${{ steps.launch.outputs.instance_id }}
        echo "Instance terminated"
    
    - name: Comment on PR
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          const passed = '${{ steps.results.outputs.passed }}';
          const failed = '${{ steps.results.outputs.failed }}';
          const reportUrl = `https://${{ env.S3_BUCKET }}.s3.amazonaws.com/${new Date().toISOString().split('T')[0]}/html-report/index.html`;
          
          const comment = `## AWS Test Results
          
          ✅ Passed: ${passed}
          ❌ Failed: ${failed}
          
          [View Full Report](${reportUrl})`;
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: comment
          });
```

### Jenkins Integration

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        AMI_ID = 'ami-your-test-runner-ami'
        INSTANCE_TYPE = 't3.medium'
        KEY_NAME = 'test-automation-key'
        SECURITY_GROUP = 'sg-12345678'
        S3_BUCKET = 'my-test-reports'
    }
    
    stages {
        stage('Launch EC2') {
            steps {
                script {
                    // Launch instance
                    def instanceId = sh(
                        script: """
                            aws ec2 run-instances \
                                --image-id ${AMI_ID} \
                                --instance-type ${INSTANCE_TYPE} \
                                --key-name ${KEY_NAME} \
                                --security-group-ids ${SECURITY_GROUP} \
                                --query 'Instances[0].InstanceId' \
                                --output text
                        """,
                        returnStdout: true
                    ).trim()
                    
                    env.INSTANCE_ID = instanceId
                    echo "Launched instance: ${instanceId}"
                    
                    // Wait for running
                    sh "aws ec2 wait instance-running --instance-ids ${instanceId}"
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    // Wait for tests to complete
                    def timestamp = sh(script: "date +%Y-%m-%d", returnStdout: true).trim()
                    def maxWait = 1800
                    def elapsed = 0
                    
                    while (elapsed < maxWait) {
                        def exists = sh(
                            script: "aws s3 ls s3://${S3_BUCKET}/${timestamp}/results.json || true",
                            returnStdout: true
                        ).trim()
                        
                        if (exists) {
                            echo "Tests complete!"
                            break
                        }
                        
                        sleep(30)
                        elapsed += 30
                    }
                    
                    if (elapsed >= maxWait) {
                        error("Tests timed out!")
                    }
                }
            }
        }
        
        stage('Download Results') {
            steps {
                script {
                    def timestamp = sh(script: "date +%Y-%m-%d", returnStdout: true).trim()
                    sh "aws s3 cp s3://${S3_BUCKET}/${timestamp}/ ./results/ --recursive"
                }
            }
        }
        
        stage('Publish Results') {
            steps {
                publishHTML([
                    reportDir: 'results/html-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
                
                junit 'results/junit.xml'
            }
        }
    }
    
    post {
        always {
            script {
                if (env.INSTANCE_ID) {
                    sh "aws ec2 terminate-instances --instance-ids ${env.INSTANCE_ID}"
                    echo "Instance terminated"
                }
            }
            
            cleanWs()
        }
        
        success {
            emailext(
                subject: "Tests Passed: ${env.JOB_NAME}",
                body: "All tests passed successfully!",
                to: 'team@example.com'
            )
        }
        
        failure {
            emailext(
                subject: "Tests Failed: ${env.JOB_NAME}",
                body: "Some tests failed. Check report.",
                to: 'team@example.com'
            )
        }
    }
}
```

---

<a name="best-practices"></a>
## 16. Best Practices

### Security Best Practices

```
✅ DO:
├── Use IAM roles (not access keys) on EC2
├── Restrict security groups to minimum needed
├── Encrypt EBS volumes
├── Use Secrets Manager for sensitive data
├── Enable CloudTrail for audit logging
├── Rotate access keys quarterly
├── Use session tokens (not long-term keys)
└── Enable MFA on AWS account

❌ DON'T:
├── Expose SSH to 0.0.0.0/0
├── Use root account for automation
├── Hardcode credentials in code/scripts
├── Grant AdministratorAccess unless needed
├── Leave unused resources running
├── Ignore security group warnings
└── Share access keys via email/chat
```

### Cost Optimization Best Practices

```
✅ DO:
├── Terminate instances when done (not stop)
├── Use Spot instances for test automation
├── Tag resources for cost tracking
├── Set budget alerts
├── Review AWS Cost Explorer monthly
├── Use Auto Scaling for variable loads
├── Delete old EBS snapshots
├── Use S3 lifecycle policies for old reports
└── Right-size instances (don't over-provision)

❌ DON'T:
├── Leave instances running 24/7 unnecessarily
├── Use larger instances than needed
├── Forget to delete test resources
├── Ignore cost alerts
├── Attach large EBS volumes if not needed
└── Store all reports forever in S3
```

### Automation Best Practices

```
✅ DO:
├── Use AMIs for consistent environments
├── Automate instance lifecycle (launch → test → terminate)
├── Store results in S3 (not on instance)
├── Use tagging for resource organization
├── Implement auto-shutdown for forgotten instances
├── Version your AMIs (v1.0, v1.1, etc.)
├── Use Infrastructure as Code (Terraform/CloudFormation)
└── Monitor with CloudWatch

❌ DON'T:
├── Manually launch instances each time
├── Rely on instance storage for results
├── Mix test environments (dev/prod)
├── Forget to tag resources
└── Skip monitoring setup
```

### Testing Best Practices

```
✅ DO:
├── Run tests headlessly
├── Use parallel execution
├── Set timeouts appropriately
├── Capture screenshots on failure
├── Store videos only on failure
├── Upload results before terminating
├── Implement retries for flaky tests
└── Use test sharding for large suites

❌ DON'T:
├── Run headed tests on CI (slow, unnecessary)
├── Run tests sequentially (wastes time/money)
├── Skip timeout configuration
├── Store all videos (expensive)
├── Terminate before uploading results
└── Ignore flaky tests
```

---

<a name="troubleshooting"></a>
## 17. Common Issues & Troubleshooting

### Issue 1: Can't SSH to Instance

```
✗ Problem:
ssh -i key.pem ubuntu@ec2-ip
→ Connection timeout

✓ Solutions:

1. Check security group allows SSH from your IP:
   aws ec2 describe-security-groups --group-ids sg-12345678 | grep 22

2. Verify your current IP:
   curl ifconfig.me
   # If changed, update security group

3. Verify instance is running:
   aws ec2 describe-instances --instance-ids i-1234567890

4. Check SSH on correct port (22):
   telnet ec2-ip 22

5. Try EC2 Instance Connect (browser-based):
   AWS Console → EC2 → Connect

6. Check key permissions:
   chmod 400 key.pem
```

### Issue 2: Tests Failing on EC2 but Pass Locally

```
✗ Problem:
Tests pass on laptop, fail on AWS EC2

✓ Solutions:

1. Check browser versions match:
   Local: google-chrome --version
   EC2: google-chrome --version

2. Ensure headless mode configured:
   // playwright.config.ts
   use: { headless: true }

3. Check system dependencies:
   playwright install-deps

4. Verify network access:
   # Test if EC2 can reach your app
   curl -I https://your-app.com

5. Check memory limits:
   free -h
   # If low, add swap or use larger instance

6. Review CloudWatch logs:
   aws logs tail /test-automation/playwright --follow

7. Run tests with debug:
   DEBUG=pw:api npx playwright test
```

### Issue 3: Instance Launch Fails

```
✗ Problem:
aws ec2 run-instances → Error

✓ Solutions:

1. Check free tier limits:
   # Maximum 750 hours/month of t2.micro
   aws ec2 describe-instances | grep running | wc -l

2. Verify AMI exists in region:
   aws ec2 describe-images --image-ids ami-12345678

3. Check instance type available:
   # Some types not in all AZs
   aws ec2 describe-instance-type-offerings \
       --location-type availability-zone \
       --filters Name=instance-type,Values=t3.medium \
       --region us-east-1

4. Verify key pair exists:
   aws ec2 describe-key-pairs --key-names test-key

5. Check security group in correct VPC:
   aws ec2 describe-security-groups --group-ids sg-12345678

6. Review IAM permissions:
   # Need ec2:RunInstances permission
   aws iam get-user-policy --user-name test-user --policy-name TestPolicy
```

### Issue 4: High AWS Bill

```
✗ Problem:
Expected $10/month, got $300 bill!

✓ Investigation:

1. Check running instances:
   aws ec2 describe-instances \
       --filters "Name=instance-state-name,Values=running" \
       --query 'Reservations[].Instances[].[InstanceId,InstanceType,LaunchTime]'

2. Review Cost Explorer:
   AWS Console → Cost Explorer → Daily costs

3. Check stopped instances (still cost $):
   aws ec2 describe-instances \
       --filters "Name=instance-state-name,Values=stopped"

4. Review EBS volumes:
   aws ec2 describe-volumes --query 'Volumes[?State==`available`]'
   # Detached volumes still cost money!

5. Check snapshots:
   aws ec2 describe-snapshots --owner-ids self

6. Review S3 storage:
   aws s3 ls --summarize --human-readable --recursive s3://my-bucket

✓ Solutions:

1. Terminate (don't stop) test instances:
   aws ec2 terminate-instances --instance-ids i-1234567890

2. Delete unused EBS volumes:
   aws ec2 delete-volume --volume-id vol-1234567890

3. Delete old snapshots:
   aws ec2 delete-snapshot --snapshot-id snap-1234567890

4. Set up budget alerts (see Cost Management section)

5. Implement auto-termination Lambda (see Cost Management)

6. Use Spot instances (70% cheaper)
```

### Issue 5: Tests Run Slowly on EC2

```
✗ Problem:
Tests take 20 minutes on EC2, 5 minutes locally

✓ Solutions:

1. Check instance type:
   # t3.micro (1 vCPU) too small
   # Upgrade to t3.medium (2 vCPU)

2. Increase parallel workers:
   // playwright.config.ts
   workers: 4  // increase from 1

3. Check CPU credits (T-family):
   aws cloudwatch get-metric-statistics \
       --namespace AWS/EC2 \
       --metric-name CPUCreditBalance \
       --dimensions Name=InstanceId,Value=i-1234567890 \
       --start-time 2024-01-01T00:00:00Z \
       --end-time 2024-01-02T00:00:00Z \
       --period 3600 \
       --statistics Average
   
   # If credits low, switch to M-family

4. Check network latency:
   # If testing app in different region
   curl -w "@curl-format.txt" -o /dev/null -s https://your-app.com

5. Verify disk I/O:
   # Use gp3 EBS instead of gp2 (faster)

6. Check memory swap usage:
   free -h
   swapon --show
   # If swapping, increase instance RAM
```

### Issue 6: S3 Upload Fails

```
✗ Problem:
aws s3 cp results/ s3://bucket/ --recursive → Error

✓ Solutions:

1. Check bucket exists:
   aws s3 ls s3://my-bucket/

2. Verify IAM permissions:
   {
     "Effect": "Allow",
     "Action": ["s3:PutObject", "s3:GetObject"],
     "Resource": "arn:aws:s3:::my-bucket/*"
   }

3. Check bucket region:
   aws s3api get-bucket-location --bucket my-bucket
   # Must match EC2 region for best performance

4. Verify network connectivity:
   curl https://s3.amazonaws.com

5. Check disk space before upload:
   df -h

6. Use sync instead of cp (faster for many files):
   aws s3 sync results/ s3://bucket/$(date +%Y-%m-%d)/
```

---

<a name="practice-exercise"></a>
## 18. Practice Exercise: Your First AWS Test

### Exercise Goal

Launch EC2 instance, run Playwright tests, view results in S3.

### Step-by-Step Exercise

```
Prerequisites:
✓ AWS account created
✓ AWS CLI installed and configured
✓ Playwright project ready locally

Time: 30-45 minutes
Cost: $0.10 (Free tier: $0)
```

### Task 1: Prepare Your Environment

```bash
# Create project directory
mkdir ~/aws-playwright-test
cd ~/aws-playwright-test

# Create minimal Playwright project
npm init -y
npm install playwright @playwright/test

# Create tests directory
mkdir tests

# Create simple test
cat > tests/example.spec.ts << 'EOF'
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});
EOF

# Create config
npx playwright test --config # This generates playwright.config.ts

# Test locally
npx playwright test

# ✅ If tests pass locally, continue
```

### Task 2: Create AWS Resources

```bash
# Create SSH key pair
aws ec2 create-key-pair \
    --key-name my-first-test-key \
    --query 'KeyMaterial' \
    --output text > my-first-test-key.pem

chmod 400 my-first-test-key.pem

# Create security group
SG_ID=$(aws ec2 create-security-group \
    --group-name my-test-sg \
    --description "My first test security group" \
    --query 'GroupId' \
    --output text)

echo "Security Group ID: $SG_ID"

# Add SSH access
MY_IP=$(curl -s ifconfig.me)
aws ec2 authorize-security-group-ingress \
    --group-id $SG_ID \
    --protocol tcp \
    --port 22 \
    --cidr "${MY_IP}/32"

echo "SSH access added for $MY_IP"
```

### Task 3: Create S3 Bucket for Reports

```bash
# Create unique bucket name
BUCKET_NAME="my-test-reports-$(date +%s)"

# Create bucket
aws s3 mb s3://$BUCKET_NAME

# Enable website hosting (to view reports)
aws s3 website s3://$BUCKET_NAME \
    --index-document index.html

# Make bucket public (for report viewing)
aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy "{
      \"Version\": \"2012-10-17\",
      \"Statement\": [{
        \"Sid\": \"PublicReadGetObject\",
        \"Effect\": \"Allow\",
        \"Principal\": \"*\",
        \"Action\": \"s3:GetObject\",
        \"Resource\": \"arn:aws:s3:::${BUCKET_NAME}/*\"
      }]
    }"

echo "Bucket created: $BUCKET_NAME"
echo "Report URL: http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com"
```

### Task 4: Create User Data Script

```bash
# Create user data script for EC2
cat > userdata.sh << 'SCRIPT'
#!/bin/bash

# Update system
apt-get update -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install Playwright
npm install -g playwright @playwright/test
playwright install chromium
playwright install-deps

# Install AWS CLI
apt-get install -y awscli

# Create test directory
mkdir -p /home/ubuntu/tests
cd /home/ubuntu/tests

# Signal setup complete
echo "Setup complete at $(date)" > /home/ubuntu/setup-complete.txt
SCRIPT
```

### Task 5: Launch EC2 Instance

```bash
# Launch instance
INSTANCE_ID=$(aws ec2 run-instances \
    --image-id ami-0c55b159cbfafe1f0 \
    --count 1 \
    --instance-type t3.micro \
    --key-name my-first-test-key \
    --security-group-ids $SG_ID \
    --user-data file://userdata.sh \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=My-First-Test-Runner}]' \
    --query 'Instances[0].InstanceId' \
    --output text)

echo "Instance launched: $INSTANCE_ID"

# Wait for running
echo "Waiting for instance to start..."
aws ec2 wait instance-running --instance-ids $INSTANCE_ID

# Get public IP
PUBLIC_IP=$(aws ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].PublicIpAddress' \
    --output text)

echo "Instance running at: $PUBLIC_IP"
echo "Waiting 3 minutes for user-data script to complete..."
sleep 180

# ✅ Your instance is ready!
```

### Task 6: Upload Tests and Run

```bash
# SCP your tests to EC2
scp -i my-first-test-key.pem -r \
    ./tests ./package.json ./playwright.config.ts \
    ubuntu@$PUBLIC_IP:/home/ubuntu/tests/

# SSH and run tests
ssh -i my-first-test-key.pem ubuntu@$PUBLIC_IP << 'REMOTE'
    cd /home/ubuntu/tests
    
    # Install dependencies
    npm install
    
    # Run tests
    npx playwright test --reporter=html
    
    # Upload results to S3
    TIMESTAMP=$(date +%Y-%m-%d-%H-%M)
    aws s3 cp playwright-report/ \
        s3://BUCKET_NAME/$TIMESTAMP/ \
        --recursive
    
    echo "Report uploaded: http://BUCKET_NAME.s3-website-us-east-1amazonaws.com/$TIMESTAMP/index.html"
REMOTE

# Replace BUCKET_NAME in the script above with actual bucket name
# Or automate it with sed:
# sed -i "s/BUCKET_NAME/$BUCKET_NAME/g" script.sh
```

### Task 7: View Results

```bash
# Get report URL
TIMESTAMP=$(date +%Y-%m-%d-%H-%M)
REPORT_URL="http://${BUCKET_NAME}.s3-website-us-east-1.amazonaws.com/${TIMESTAMP}/index.html"

echo "==========================================="
echo "✅ Tests complete!"
echo "Report URL: $REPORT_URL"
echo "==========================================="

# Open report in browser (Mac)
open $REPORT_URL

# Open report in browser (Linux)
xdg-open $REPORT_URL

# Open report in browser (Windows)
start $REPORT_URL
```

### Task 8: Clean Up

```bash
# Terminate instance
aws ec2 terminate-instances --instance-ids $INSTANCE_ID

echo "Instance terminating..."
aws ec2 wait instance-terminated --instance-ids $INSTANCE_ID

# Delete security group (after instance terminated)
aws ec2 delete-security-group --group-id $SG_ID

# Delete key pair
aws ec2 delete-key-pair --key-name my-first-test-key
rm my-first-test-key.pem

# (Optional) Delete S3 bucket
# aws s3 rm s3://$BUCKET_NAME --recursive
# aws s3 rb s3://$BUCKET_NAME

echo "✅ Cleanup complete!"
echo "Total cost: ~$0.01 (or $0 with free tier)"
```

### Success Criteria

You've succeeded when:
- ✅ EC2 instance launched successfully
- ✅ Tests ran on EC2 (not locally)
- ✅ Results uploaded to S3
- ✅ HTML report viewable in browser
- ✅ Instance terminated (no ongoing charges)
- ✅ You understand every step

### Bonus Challenge

**Automate it!** Create a single script that does all of the above:

```bash
#!/bin/bash
# master-script.sh - One command to rule them all!

# ... combine all steps above into one .sh file
# Run with: ./master-script.sh

# This is how professional teams do it!
```

---

<a name="conclusion"></a>
## 19. Conclusion: What's Next?

### What You've Learned

```
✅ Cloud Computing Fundamentals
├── What cloud is and why it matters
├── Pay-per-use economics
└── Scaling advantages

✅ AWS Core Services
├── EC2 (virtual machines)
├── S3 (storage)
├── IAM (security)
├── CloudWatch (monitoring)
└── Auto Scaling (automation)

✅ Practical Skills
├── Launch EC2 instances
├── Install test tools
├── Run Playwright on cloud
├── Upload results to S3
├── Monitor costs
├── Automate workflows
└── Integration with CI/CD

✅ Best Practices
├── Security hardening
├── Cost optimization
├── Resource tagging
├── Auto-termination
└── Monitoring and alerting
```

### Your New Capabilities

**You can now:**
1. ✅ Run tests on cloud infrastructure (not just locally)
2. ✅ Scale to 100+ parallel test executions
3. ✅ Integrate AWS with GitHub Actions/Jenkins
4. ✅ Manage costs effectively (spot instances, auto-shutdown)
5. ✅ Create reusable AMIs for consistent environments
6. ✅ Monitor test execution with CloudWatch
7. ✅ Store and share test reports via S3
8. ✅ Automate entire test lifecycle

**You are now a Cloud-Ready Automation Engineer!** 🎉

### Next Steps

**Immediate Next Steps:**
1. ✅ Complete the practice exercise (Section 18)
2. ✅ Create your custom test runner AMI
3. ✅ Integrate with your CI/CD pipeline
4. ✅ Set up cost alerts

**Advanced Topics to Explore:**
```
1. AWS Batch for Enterprise Testing
   └── Manage 1000+ tests across hundreds of containers

2. AWS Lambda + Step Functions
   └── Serverless test orchestration

3. AWS ECS/EKS (Docker/Kubernetes)
   └── Containerized test execution

4. AWS CodePipeline
   └── Full CI/CD with AWS native tools

5. Multi-Region Testing
   └── Test from multiple geographic locations

6. AWS Device Farm
   └── Real mobile device testing

7. Terraform/CloudFormation
   └── Infrastructure as Code for test environments
```

**Career Impact:**
```
✓ Stand out in job market
✓ Work with modern cloud-native teams
✓ Contribute to DevOps practices
✓ Command higher salary
✓ Build scalable test infrastructure
✓ Reduce team's AWS costs
```

---

## Additional Resources

**Official Documentation:**
- AWS EC2: https://docs.aws.amazon.com/ec2/
- AWS CLI: https://docs.aws.amazon.com/cli/
- Playwright: https://playwright.dev/
- AWS Free Tier: https://aws.amazon.com/free/

**VibeTestQ Resources:**
- Video Tutorials: https://vibetestq.com/videos
- Practice Projects: https://github.com/vibetestq
- Community: https://discord.gg/vibetestq
- More Guides: https://vibetestq.com/docs

**AWS Training:**
- AWS Skill Builder: https://skillbuilder.aws/
- AWS Free Tier FAQ: https://aws.amazon.com/free/free-tier-faqs/
- AWS Cost Calculator: https://calculator.aws/

**Cost Management Tools:**
- AWS Cost Explorer: https://aws.amazon.com/aws-cost-management/aws-cost-explorer/
- AWS Budgets: https://aws.amazon.com/aws-cost-management/aws-budgets/
- AWS Pricing Calculator: https://calculator.aws/

---

*Keep testing in the cloud with VibeTestQ! Scalability is the future of quality engineering.*

---

**Version:** 1.0 Comprehensive Edition  
**Last Updated:** February 8, 2026  
**Author:** QtpSudhakar | VibeTestQ  
**License:** Educational Use
