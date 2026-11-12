# Assignment: AWS for Test Automation

**Topics Covered:** AWS Account Setup, EC2 for Test Execution, S3 for Artifacts, Lambda for Health Checks, Cost Optimization  
**Difficulty:** Beginner to Intermediate (No Cloud Experience Required)  
**Estimated Time:** 8-10 hours  
**Reference:** `Week3-Day12-AWS-Test-Automation.md`  

---

## 📋 Learning Objectives

By completing this assignment, you will:
- ✅ Create and secure an AWS account from scratch
- ✅ Launch and configure EC2 instances for test execution
- ✅ Store test artifacts in S3 buckets
- ✅ Create Lambda functions for health checks
- ✅ Integrate AWS with your test automation framework
- ✅ Implement cost optimization strategies
- ✅ Monitor and manage cloud resources

---

## ⚠️ Important Notes Before Starting

**Cost Management:**
- This assignment uses AWS Free Tier (12 months free)
- Estimated cost if done correctly: **$0-5**
- **CRITICAL:** Follow cleanup instructions to avoid charges
- Set up billing alerts (covered in Part A)

**Prerequisites:**
- Credit/debit card (for AWS verification)
- Email address
- Phone number (for verification)
- Basic command line knowledge
- Completed Playwright/Cypress assignments

**Time Commitment:**
- Part A (Setup): 2 hours
- Part B (EC2): 3 hours
- Part C (S3): 2 hours
- Part D (Lambda): 2 hours
- Bonus: 2 hours

---

## Part A: AWS Account Setup & Security (25 points)

### Exercise 1: Create AWS Account (5 points)

**Objective:** Set up your AWS account with proper security from day one.

**Step-by-Step Instructions:**

1. **Create Account:**
   ```
   1. Visit: https://aws.amazon.com
   2. Click: "Create an AWS Account"
   3. Enter:
      - Email: your.email@example.com
      - Account name: TestAutomation-YourName
      - Password: Strong password (save it!)
   4. Select: Professional account
   5. Enter: Company name, address, phone
   6. Add: Credit/debit card (will charge $1 to verify, then refund)
   7. Verify: Phone number (automated call/SMS)
   8. Select: Basic Support Plan (Free)
   9. Complete setup
   ```

2. **Save Important Information:**
   ```
   Create a file: aws-credentials.txt
   
   Save:
   - Account ID: ____________
   - Root email: ____________
   - Root password: ____________
   - Sign-in URL: https://____________.signin.aws.amazon.com/console
   
   ⚠️ Keep this file SECURE and PRIVATE!
   ```

**Deliverable:**
- Screenshot of AWS Console dashboard showing your account ID
- Document with saved credentials (don't share publicly!)

**Points Breakdown:**
- Account created successfully: 3 points
- Credentials documented: 2 points

---

### Exercise 2: Enable MFA (Multi-Factor Authentication) (5 points)

**Objective:** Secure your root account with two-factor authentication.

**Why This Matters:**
- Password alone = 1 layer of security
- Password + MFA = 2 layers (much safer!)
- Prevents unauthorized access even if password is stolen

**Instructions:**

1. **Install Authenticator App:**
   ```
   Choose one:
   - Google Authenticator (iOS/Android)
   - Microsoft Authenticator (iOS/Android)
   - Authy (iOS/Android/Desktop)
   ```

2. **Enable MFA:**
   ```
   1. AWS Console → Click your account name (top right)
   2. Security Credentials
   3. Multi-factor authentication (MFA)
   4. Activate MFA
   5. Select: Virtual MFA device
   6. Show QR code
   7. Scan with authenticator app
   8. Enter two consecutive codes from app
   9. Assign MFA device name: "MyPhone-Authenticator"
   10. Click: Assign MFA
   ```

3. **Test MFA:**
   ```
   1. Sign out of AWS Console
   2. Sign in again
   3. Enter password
   4. Enter 6-digit code from authenticator app
   5. Verify successful login
   ```

**Deliverable:**
- Screenshot showing MFA enabled in Security Credentials
- Document: "I successfully logged in using MFA"

**Points Breakdown:**
- MFA enabled: 3 points
- Successful test login: 2 points

---

### Exercise 3: Create IAM User (5 points)

**Objective:** Create a separate user for daily work (never use root account!).

**Why IAM Users?**
```
Root Account = Master key to everything
- Can delete entire account
- Can spend unlimited money
- High security risk

IAM User = Limited access badge
- Specific permissions only
- Can be revoked anytime
- Much safer for daily work
```

**Instructions:**

1. **Navigate to IAM:**
   ```
   AWS Console → Services → IAM → Users → Add users
   ```

2. **Create User:**
   ```
   User name: test-automation-user
   
   Access type:
   ✓ Programmatic access (for CLI/scripts)
   ✓ AWS Management Console access
   
   Console password:
   ✓ Custom password: YourStrongPassword123!
   □ Require password reset (uncheck for learning)
   
   Click: Next
   ```

3. **Set Permissions:**
   ```
   Attach existing policies directly:
   ✓ AdministratorAccess (for learning only!)
   
   Note: In production, use limited permissions
   
   Click: Next
   ```

4. **Add Tags:**
   ```
   Key: Department, Value: QA
   Key: Project, Value: TestAutomation
   Key: Owner, Value: YourName
   
   Click: Next
   ```

5. **Review and Create:**
   ```
   Click: Create user
   ```

6. **Download Credentials:**
   ```
   ⚠️ CRITICAL: Download credentials.csv
   
   This file contains:
   - Username
   - Password
   - Access Key ID
   - Secret Access Key
   - Console login link
   
   Save to: ~/aws-credentials/iam-user-credentials.csv
   
   ⚠️ You CANNOT download this again!
   ```

**Deliverable:**
- Screenshot of IAM user created
- Saved credentials.csv file (keep private!)
- Screenshot of successful login as IAM user

**Points Breakdown:**
- IAM user created: 2 points
- Credentials saved: 2 points
- Successful login: 1 point

---

### Exercise 4: Install & Configure AWS CLI (5 points)

**Objective:** Set up command-line access to AWS.

**Instructions:**

**Windows:**
```powershell
# Check if already installed
aws --version

# If not installed, download from:
# https://awscli.amazonaws.com/AWSCLIV2.msi

# Or use Chocolatey:
choco install awscli

# Verify installation
aws --version
# Expected: aws-cli/2.x.x ...
```

**macOS:**
```bash
# Using Homebrew
brew install awscli

# Verify
aws --version
```

**Linux:**
```bash
# Download installer
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# Unzip
unzip awscliv2.zip

# Install
sudo ./aws/install

# Verify
aws --version
```

**Configure AWS CLI:**
```bash
aws configure

# Enter (from credentials.csv):
AWS Access Key ID: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfi...
Default region name: us-east-1
Default output format: json
```

**Test Configuration:**
```bash
# Check who you are
aws sts get-caller-identity

# Expected output:
{
    "UserId": "AIDAI...",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/test-automation-user"
}

# List S3 buckets (should be empty)
aws s3 ls

# Check EC2 instances (should be empty)
aws ec2 describe-instances
```

**Deliverable:**
- Screenshot of `aws --version`
- Screenshot of `aws sts get-caller-identity` output
- Document showing successful configuration

**Points Breakdown:**
- AWS CLI installed: 2 points
- Successfully configured: 2 points
- Test commands work: 1 point

---

### Exercise 5: Set Up Billing Alert (5 points)

**Objective:** Prevent unexpected AWS charges.

**Instructions:**

1. **Enable Billing Alerts:**
   ```
   1. AWS Console → Account (top right) → Billing Dashboard
   2. Billing Preferences
   3. ✓ Receive Billing Alerts
   4. Save preferences
   ```

2. **Create Billing Alarm:**
   ```
   1. Services → CloudWatch
   2. Alarms → Create alarm
   3. Select metric → Billing → Total Estimated Charge
   4. Metric name: EstimatedCharges
   5. Statistic: Maximum
   6. Period: 6 hours
   7. Conditions:
      - Threshold type: Static
      - Whenever EstimatedCharges is: Greater than
      - than: 10 (USD)
   8. Configure actions:
      - Create new topic
      - Topic name: billing-alerts
      - Email: your.email@example.com
   9. Create alarm
   10. Confirm subscription email
   ```

**Deliverable:**
- Screenshot of billing alert created
- Screenshot of email confirmation

**Points Breakdown:**
- Billing preferences enabled: 2 points
- Alarm created: 2 points
- Email confirmed: 1 point

---

## Part B: EC2 for Test Execution (30 points)

### Exercise 6: Launch EC2 Instance (10 points)

**Objective:** Create a virtual machine for running tests.

**Step-by-Step:**

1. **Navigate to EC2:**
   ```
   Services → EC2 → Instances → Launch Instance
   ```

2. **Configure Instance:**
   ```
   Name: PlaywrightTestServer
   
   Tags:
   - Key: Environment, Value: Testing
   - Key: Project, Value: Automation
   - Key: Owner, Value: YourName
   ```

3. **Choose AMI:**
   ```
   ✓ Ubuntu Server 22.04 LTS (Free tier eligible)
   Architecture: 64-bit (x86)
   ```

4. **Choose Instance Type:**
   ```
   ✓ t2.micro (Free tier eligible)
   - 1 vCPU
   - 1 GB RAM
   - Good for: 50-100 tests
   ```

5. **Create Key Pair:**
   ```
   Click: Create new key pair
   
   Key pair name: playwright-test-key
   Key pair type: RSA
   Private key format: 
   - .pem (Mac/Linux)
   - .ppk (Windows/PuTTY)
   
   Click: Create key pair
   
   ⚠️ SAVE THE FILE! You can't download it again!
   Save to: ~/aws-credentials/playwright-test-key.pem
   ```

6. **Configure Network:**
   ```
   Create security group:
   
   Name: test-automation-sg
   Description: Security group for test automation
   
   Inbound rules:
   ✓ SSH (22) from My IP
   ✓ HTTP (80) from Anywhere (optional)
   ```

7. **Configure Storage:**
   ```
   ✓ 8 GB gp3 (Free tier eligible)
   ```

8. **Launch:**
   ```
   Click: Launch instance
   
   Wait 2-3 minutes for "Running" status
   ```

**Deliverable:**
- Screenshot of running EC2 instance
- Saved key pair file
- Instance details (Instance ID, Public IP)

**Points Breakdown:**
- Instance launched: 5 points
- Correct configuration: 3 points
- Key pair saved: 2 points

---

### Exercise 7: Connect to EC2 & Setup Environment (10 points)

**Objective:** SSH into EC2 and install test automation tools.

**Part 1: Connect via SSH**

**Mac/Linux:**
```bash
# Set key permissions
chmod 400 ~/aws-credentials/playwright-test-key.pem

# Connect (replace with your IP)
ssh -i ~/aws-credentials/playwright-test-key.pem ubuntu@54.123.45.67

# First time, type: yes
```

**Windows (PowerShell):**
```powershell
# Connect
ssh -i ~/aws-credentials/playwright-test-key.pem ubuntu@54.123.45.67
```

**Part 2: Install Software**

Create `setup-ec2.sh` on your local machine:
```bash
#!/bin/bash
set -e

echo "🚀 Setting up Test Automation Environment..."

# Update system
echo "📦 Updating packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Git
echo "📦 Installing Git..."
sudo apt install -y git

# Install Chrome
echo "🌐 Installing Chrome..."
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb

# Install Playwright
echo "🎭 Installing Playwright..."
sudo npm install -g @playwright/test
npx playwright install chromium firefox webkit
npx playwright install-deps

# Create workspace
echo "📁 Creating workspace..."
mkdir -p ~/test-automation
cd ~/test-automation

# Print versions
echo "✅ Setup complete!"
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
echo "Chrome: $(google-chrome --version)"
echo "Playwright: $(npx playwright --version)"
```

**Copy and run:**
```bash
# On local machine: Copy script to EC2
scp -i ~/aws-credentials/playwright-test-key.pem setup-ec2.sh ubuntu@54.123.45.67:~/

# On EC2: Run setup
chmod +x setup-ec2.sh
./setup-ec2.sh
```

**Deliverable:**
- Screenshot of successful SSH connection
- Screenshot showing installed versions (Node, Chrome, Playwright)
- Document: "Setup completed successfully"

**Points Breakdown:**
- Successful SSH connection: 3 points
- All software installed: 5 points
- Versions documented: 2 points

---

### Exercise 8: Run Tests on EC2 (10 points)

**Objective:** Execute Playwright tests on EC2 instance.

**Create Test on EC2:**

```bash
# SSH to EC2
ssh -i ~/aws-credentials/playwright-test-key.pem ubuntu@YOUR_EC2_IP

# Navigate to workspace
cd ~/test-automation

# Initialize project
npm init -y

# Install Playwright
npm install @playwright/test

# Create test file
cat > google-search.spec.js << 'EOF'
const { test, expect } = require('@playwright/test');

test('Google search for Playwright', async ({ page }) => {
  console.log('Starting test...');
  
  await page.goto('https://www.google.com');
  console.log('Navigated to Google');
  
  await page.locator('[name="q"]').fill('Playwright automation');
  console.log('Entered search query');
  
  await page.locator('[name="q"]').press('Enter');
  console.log('Pressed Enter');
  
  await page.waitForLoadState('networkidle');
  
  await expect(page).toHaveTitle(/Playwright/);
  console.log('✅ Test passed!');
});
EOF

# Run test
npx playwright test

# View results
ls -lh test-results/
cat test-results/*/stdout
```

**Deploy Your Own Tests:**

```bash
# On local machine: Package your tests
cd ~/your-playwright-project
tar -czf tests.tar.gz \
  --exclude='node_modules' \
  --exclude='playwright-report' \
  --exclude='test-results' \
  .

# Copy to EC2
scp -i ~/aws-credentials/playwright-test-key.pem \
  tests.tar.gz ubuntu@YOUR_EC2_IP:~/test-automation/

# On EC2: Extract and run
cd ~/test-automation
tar -xzf tests.tar.gz
npm install
npm test
```

**Deliverable:**
- Screenshot of test execution on EC2
- Test results output
- Screenshot showing test-results folder

**Points Breakdown:**
- Simple test runs successfully: 4 points
- Own tests deployed: 4 points
- Results captured: 2 points

---

## Part C: S3 for Test Artifacts (25 points)

### Exercise 9: Create S3 Bucket (8 points)

**Objective:** Set up cloud storage for test reports.

**Instructions:**

1. **Create Bucket:**
   ```
   Services → S3 → Create bucket
   
   Bucket name: test-automation-artifacts-yourname
   (Must be globally unique!)
   
   Region: us-east-1 (same as EC2)
   
   Object Ownership: ACLs disabled
   
   Block Public Access: ✓ Block all (keep private)
   
   Bucket Versioning: ✓ Enable
   
   Encryption: ✓ Server-side encryption (SSE-S3)
   
   Click: Create bucket
   ```

2. **Create Folder Structure:**
   ```
   Click bucket → Create folder
   
   Create folders:
   - reports/
   - screenshots/
   - videos/
   - logs/
   ```

**Via CLI:**
```bash
# Create bucket
aws s3 mb s3://test-automation-artifacts-yourname --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket test-automation-artifacts-yourname \
  --versioning-configuration Status=Enabled

# Create folders (by uploading empty files)
echo "" | aws s3 cp - s3://test-automation-artifacts-yourname/reports/.keep
echo "" | aws s3 cp - s3://test-automation-artifacts-yourname/screenshots/.keep
echo "" | aws s3 cp - s3://test-automation-artifacts-yourname/videos/.keep
echo "" | aws s3 cp - s3://test-automation-artifacts-yourname/logs/.keep
```

**Deliverable:**
- Screenshot of created bucket
- Screenshot showing folder structure
- Bucket name documented

**Points Breakdown:**
- Bucket created: 4 points
- Correct configuration: 2 points
- Folders created: 2 points

---

### Exercise 10: Upload Test Results to S3 (9 points)

**Objective:** Store test artifacts in cloud storage.

**From EC2:**

```bash
# SSH to EC2
ssh -i ~/aws-credentials/playwright-test-key.pem ubuntu@YOUR_EC2_IP

# Run tests to generate report
cd ~/test-automation
npx playwright test

# Upload report to S3
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H-%M-%S)

aws s3 sync playwright-report/ \
  s3://test-automation-artifacts-yourname/reports/playwright/$DATE/$TIME/ \
  --exclude "*" \
  --include "*.html" \
  --include "*.png" \
  --include "*.css" \
  --include "*.js"

# Verify upload
aws s3 ls s3://test-automation-artifacts-yourname/reports/playwright/$DATE/$TIME/
```

**Create Upload Script:**

Create `upload-to-s3.sh`:
```bash
#!/bin/bash

BUCKET="test-automation-artifacts-yourname"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H-%M-%S)
RUN_ID="${DATE}/${TIME}"

echo "📤 Uploading test results to S3..."

# Upload HTML report
echo "Uploading HTML report..."
aws s3 sync playwright-report/ \
  s3://$BUCKET/reports/playwright/$RUN_ID/ \
  --exclude "*" \
  --include "*.html" \
  --include "*.css" \
  --include "*.js"

# Upload screenshots
if [ -d "test-results" ]; then
  echo "Uploading screenshots..."
  find test-results -name "*.png" -exec \
    aws s3 cp {} s3://$BUCKET/screenshots/$RUN_ID/ \;
fi

# Upload videos
if [ -d "test-results" ]; then
  echo "Uploading videos..."
  find test-results -name "*.webm" -exec \
    aws s3 cp {} s3://$BUCKET/videos/$RUN_ID/ \;
fi

# Generate presigned URL for report
REPORT_URL=$(aws s3 presign \
  s3://$BUCKET/reports/playwright/$RUN_ID/index.html \
  --expires-in 604800)

echo "✅ Upload complete!"
echo "📊 Report URL (valid for 7 days):"
echo "$REPORT_URL"
echo ""
echo "Save this URL to share with your team!"
```

**Use the script:**
```bash
chmod +x upload-to-s3.sh
./upload-to-s3.sh
```

**Deliverable:**
- Screenshot of files in S3 bucket
- Presigned URL to your test report
- Screenshot of report accessed via URL

**Points Breakdown:**
- Files uploaded successfully: 4 points
- Upload script created: 3 points
- Presigned URL works: 2 points

---

### Exercise 11: Implement Lifecycle Policy (8 points)

**Objective:** Auto-delete old reports to save costs.

**Create Lifecycle Policy:**

Create `lifecycle-policy.json`:
```json
{
  "Rules": [
    {
      "Id": "DeleteOldReports",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "reports/"
      },
      "Expiration": {
        "Days": 30
      }
    },
    {
      "Id": "ArchiveScreenshots",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "screenshots/"
      },
      "Transitions": [
        {
          "Days": 7,
          "StorageClass": "GLACIER_INSTANT_RETRIEVAL"
        }
      ],
      "Expiration": {
        "Days": 90
      }
    },
    {
      "Id": "DeleteOldLogs",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "logs/"
      },
      "Expiration": {
        "Days": 90
      }
    }
  ]
}
```

**Apply Policy:**
```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket test-automation-artifacts-yourname \
  --lifecycle-configuration file://lifecycle-policy.json

# Verify
aws s3api get-bucket-lifecycle-configuration \
  --bucket test-automation-artifacts-yourname
```

**What This Does:**
```
Reports: Delete after 30 days
Screenshots: Move to cheaper storage after 7 days, delete after 90
Logs: Delete after 90 days

Savings: ~60% on storage costs!
```

**Deliverable:**
- lifecycle-policy.json file
- Screenshot of applied policy
- Document explaining what each rule does

**Points Breakdown:**
- Policy file created: 3 points
- Policy applied successfully: 3 points
- Documentation: 2 points

---

## Part D: Lambda for Health Checks (20 points)

### Exercise 12: Create Lambda Function (10 points)

**Objective:** Build serverless health check for your API.

**Create Function Code:**

Create `health-check.js`:
```javascript
exports.handler = async (event) => {
  const apiEndpoint = process.env.API_ENDPOINT || 'https://jsonplaceholder.typicode.com/posts/1';
  
  console.log(`🏥 Checking health of: ${apiEndpoint}`);
  
  const startTime = Date.now();
  
  try {
    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'User-Agent': 'AWS-Lambda-Health-Check',
        'Accept': 'application/json'
      }
    });
    
    const duration = Date.now() - startTime;
    const data = await response.json();
    
    console.log(`Response time: ${duration}ms`);
    console.log(`Status: ${response.status}`);
    
    if (response.ok) {
      console.log('✅ API is healthy');
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: 'healthy',
          endpoint: apiEndpoint,
          responseTime: duration,
          httpStatus: response.status,
          timestamp: new Date().toISOString()
        })
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'unhealthy',
        endpoint: apiEndpoint,
        error: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
};
```

**Deploy Lambda:**

```bash
# Create deployment package
zip function.zip health-check.js

# Create IAM role for Lambda
cat > trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Service": "lambda.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
  }]
}
EOF

aws iam create-role \
  --role-name lambda-health-check-role \
  --assume-role-policy-document file://trust-policy.json

# Attach basic execution policy
aws iam attach-role-policy \
  --role-name lambda-health-check-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Wait for role to propagate
sleep 10

# Create Lambda function
aws lambda create-function \
  --function-name api-health-check \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-health-check-role \
  --handler health-check.handler \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256 \
  --environment "Variables={API_ENDPOINT=https://jsonplaceholder.typicode.com/posts/1}"

# Test function
aws lambda invoke \
  --function-name api-health-check \
  --payload '{}' \
  response.json

# View response
cat response.json
```

**Deliverable:**
- health-check.js code file
- Screenshot of Lambda function created
- Screenshot of test invocation result
- response.json output

**Points Breakdown:**
- Function code created: 3 points
- Lambda deployed: 4 points
- Test successful: 3 points

---

### Exercise 13: Schedule Lambda with EventBridge (10 points)

**Objective:** Run health check every 5 minutes automatically.

**Instructions:**

```bash
# Create EventBridge rule (every 5 minutes)
aws events put-rule \
  --name health-check-every-5-min \
  --schedule-expression "rate(5 minutes)" \
  --description "Run health check every 5 minutes"

# Add Lambda as target
aws events put-targets \
  --rule health-check-every-5-min \
  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:api-health-check"

# Grant EventBridge permission to invoke Lambda
aws lambda add-permission \
  --function-name api-health-check \
  --statement-id AllowEventBridgeInvoke \
  --action 'lambda:InvokeFunction' \
  --principal events.amazonaws.com \
  --source-arn arn:aws:events:us-east-1:YOUR_ACCOUNT_ID:rule/health-check-every-5-min
```

**Monitor Execution:**

```bash
# Wait 10 minutes, then check CloudWatch logs
aws logs tail /aws/lambda/api-health-check --follow

# View recent invocations
aws lambda get-function \
  --function-name api-health-check \
  --query 'Configuration.LastModified'
```

**Schedule Options:**
```bash
rate(5 minutes)          # Every 5 minutes
rate(1 hour)             # Every hour
rate(1 day)              # Daily

cron(0 9 * * ? *)        # Daily at 9 AM UTC
cron(0 18 * * ? *)       # Daily at 6 PM UTC
cron(0 9 ? * MON-FRI *)  # Weekdays at 9 AM
cron(0/10 * * * ? *)     # Every 10 minutes
```

**Deliverable:**
- Screenshot of EventBridge rule created
- Screenshot of CloudWatch logs showing automated executions
- Document: "Lambda executed X times in 30 minutes"

**Points Breakdown:**
- EventBridge rule created: 4 points
- Lambda triggered automatically: 4 points
- Logs verified: 2 points

---

## Bonus Challenges (30 points)

### Exercise 14: Complete CI/CD Integration (15 points)

**Objective:** Integrate AWS with GitHub Actions.

Create `.github/workflows/aws-tests.yml`:
```yaml
name: AWS Test Execution

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM UTC

jobs:
  test-on-aws:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Start EC2 instance
      run: |
        aws ec2 start-instances --instance-ids ${{ secrets.EC2_INSTANCE_ID }}
        aws ec2 wait instance-running --instance-ids ${{ secrets.EC2_INSTANCE_ID }}
    
    - name: Get EC2 IP
      id: ec2-ip
      run: |
        IP=$(aws ec2 describe-instances \
          --instance-ids ${{ secrets.EC2_INSTANCE_ID }} \
          --query 'Reservations[0].Instances[0].PublicIpAddress' \
          --output text)
        echo "ip=$IP" >> $GITHUB_OUTPUT
    
    - name: Deploy and run tests
      run: |
        # Create SSH key
        echo "${{ secrets.EC2_SSH_KEY }}" > key.pem
        chmod 400 key.pem
        
        # Package tests
        tar -czf tests.tar.gz .
        
        # Upload to EC2
        scp -i key.pem -o StrictHostKeyChecking=no \
          tests.tar.gz ubuntu@${{ steps.ec2-ip.outputs.ip }}:~/test-automation/
        
        # Run tests
        ssh -i key.pem -o StrictHostKeyChecking=no \
          ubuntu@${{ steps.ec2-ip.outputs.ip }} << 'ENDSSH'
          cd ~/test-automation
          tar -xzf tests.tar.gz
          npm install
          npm test
        ENDSSH
    
    - name: Upload results to S3
      run: |
        ssh -i key.pem ubuntu@${{ steps.ec2-ip.outputs.ip }} \
          "cd ~/test-automation && \
           aws s3 sync playwright-report/ \
           s3://test-automation-artifacts-yourname/reports/${{ github.run_id }}/"
    
    - name: Stop EC2 instance
      if: always()
      run: |
        aws ec2 stop-instances --instance-ids ${{ secrets.EC2_INSTANCE_ID }}
```

**Deliverable:**
- GitHub Actions workflow file
- Screenshot of successful workflow run
- Test results in S3 from GitHub Actions

---

### Exercise 15: Cost Optimization Dashboard (15 points)

**Objective:** Track and optimize AWS costs.

**Create Cost Monitoring Script:**

Create `check-costs.sh`:
```bash
#!/bin/bash

echo "💰 AWS Cost Report"
echo "=================="
echo ""

# Get current month costs
START_DATE=$(date -d "$(date +%Y-%m-01)" +%Y-%m-%d)
END_DATE=$(date +%Y-%m-%d)

echo "Period: $START_DATE to $END_DATE"
echo ""

# Get costs by service
aws ce get-cost-and-usage \
  --time-period Start=$START_DATE,End=$END_DATE \
  --granularity MONTHLY \
  --metrics "UnblendedCost" \
  --group-by Type=SERVICE \
  --output table

echo ""
echo "💡 Optimization Tips:"
echo "- Stop EC2 when not testing"
echo "- Use lifecycle policies on S3"
echo "- Monitor Lambda invocations"
echo "- Delete unused resources"
```

**Deliverable:**
- Cost monitoring script
- Screenshot of cost breakdown
- Document with 5 cost optimization strategies you implemented

---

## Cleanup Instructions (IMPORTANT!)

**To avoid charges, clean up resources:**

```bash
# 1. Delete Lambda function
aws lambda delete-function --function-name api-health-check

# 2. Delete EventBridge rule
aws events remove-targets --rule health-check-every-5-min --ids 1
aws events delete-rule --name health-check-every-5-min

# 3. Empty and delete S3 bucket
aws s3 rm s3://test-automation-artifacts-yourname --recursive
aws s3 rb s3://test-automation-artifacts-yourname

# 4. Terminate EC2 instance
aws ec2 terminate-instances --instance-ids YOUR_INSTANCE_ID

# 5. Delete security group (after instance terminated)
aws ec2 delete-security-group --group-name test-automation-sg

# 6. Delete IAM role
aws iam detach-role-policy \
  --role-name lambda-health-check-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name lambda-health-check-role

# 7. Verify no resources remain
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'
aws s3 ls
aws lambda list-functions
```

---

## Submission Guidelines

1. **Create folder:** `assignment13_yourname/`

2. **Include:**
   - `README.md` - Summary of what you learned
   - `screenshots/` - All required screenshots
   - `scripts/` - All scripts created
   - `credentials/` - Credentials files (KEEP PRIVATE!)
   - `costs.txt` - Final AWS bill amount
   - `cleanup.txt` - Confirmation of resource cleanup

3. **README.md should contain:**
   - AWS Account ID
   - EC2 Instance details
   - S3 Bucket name
   - Lambda function name
   - Total cost incurred
   - Key learnings
   - Challenges faced

---

## Grading Rubric

### Part A: AWS Setup (25 points)
- Account creation & security: 15 points
- AWS CLI configuration: 5 points
- Billing alerts: 5 points

### Part B: EC2 (30 points)
- Instance launch & configuration: 10 points
- Environment setup: 10 points
- Test execution: 10 points

### Part C: S3 (25 points)
- Bucket creation: 8 points
- Artifact upload: 9 points
- Lifecycle policies: 8 points

### Part D: Lambda (20 points)
- Function creation: 10 points
- Scheduling: 10 points

### Bonus (30 points)
- CI/CD integration: 15 points
- Cost optimization: 15 points

### Documentation & Cleanup
- Proper documentation: 10 points
- Complete cleanup: 10 points

**Total: 100 + 30 Bonus + 20 Documentation = 150 points**

---

## Common Issues & Solutions

### Issue 1: Can't SSH to EC2
```
Error: Connection timed out

Solutions:
1. Check security group allows SSH from your IP
2. Verify instance is running
3. Check key file permissions: chmod 400 key.pem
4. Verify correct IP address
```

### Issue 2: AWS CLI Access Denied
```
Error: An error occurred (AccessDenied)

Solutions:
1. Verify AWS credentials: aws configure list
2. Check IAM user has required permissions
3. Ensure credentials.csv was used correctly
```

### Issue 3: S3 Upload Fails
```
Error: Access Denied

Solutions:
1. Configure AWS CLI on EC2: aws configure
2. Or attach IAM role to EC2 instance
3. Verify bucket name is correct
```

### Issue 4: Lambda Timeout
```
Error: Task timed out after 3.00 seconds

Solutions:
1. Increase timeout: aws lambda update-function-configuration --timeout 30
2. Optimize function code
3. Check API endpoint is reachable
```

---

## Tips for Success

✅ **Start early** - Don't wait until the last day  
✅ **Follow steps exactly** - Cloud can be unforgiving  
✅ **Save everything** - Credentials, screenshots, scripts  
✅ **Monitor costs daily** - Check billing dashboard  
✅ **Ask for help** - If stuck, reach out immediately  
✅ **Clean up resources** - Avoid unexpected charges  
✅ **Document learnings** - Write down what you learned  
✅ **Test incrementally** - Verify each step before moving on  

---

## Learning Outcomes

After completing this assignment, you will be able to:

✅ Set up and secure AWS accounts  
✅ Launch and manage EC2 instances  
✅ Deploy test automation to cloud  
✅ Store and manage test artifacts in S3  
✅ Create serverless functions with Lambda  
✅ Integrate AWS with CI/CD pipelines  
✅ Monitor and optimize cloud costs  
✅ Troubleshoot common AWS issues  

**You're now a Cloud QA Engineer!** ☁️🚀

---

**Total Points: 100 + 30 Bonus + 20 Documentation = 150 points**

Master AWS for test automation! ☁️
