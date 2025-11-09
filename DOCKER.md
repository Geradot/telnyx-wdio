# Docker for Telnyx WDIO Tests

## Why Docker?

- ✅ Consistent environment locally and in CI/CD
- ✅ No need to install browsers on host system
- ✅ Isolated test execution
- ✅ Reproducible results

## Quick Start

### 1. Run via Docker Compose (recommended)

**Run tests in Chrome:**

```bash
docker-compose up tests-chrome
```

**Run tests in Firefox:**

```bash
docker-compose up tests-firefox
```

**Run both browsers:**

```bash
docker-compose up tests-chrome tests-firefox
```

**Run with Allure server:**

```bash
# First run tests
docker-compose up tests-chrome

# Then start Allure server to view reports
docker-compose up allure

# Open browser: http://localhost:5050
```

### 2. Run via Docker directly

**Build image:**

```bash
docker build -t telnyx-wdio:latest .
```

**Run tests in Chrome:**

```bash
docker run --rm \
  -e BROWSER=chrome \
  -e HEADLESS=true \
  -v ${PWD}/allure-results:/app/allure-results \
  telnyx-wdio:latest
```

**Run tests in Firefox:**

```bash
docker run --rm \
  -e BROWSER=firefox \
  -e HEADLESS=true \
  -v ${PWD}/allure-results:/app/allure-results \
  telnyx-wdio:latest
```

**Run specific suite:**

```bash
docker run --rm \
  -e BROWSER=chrome \
  -e HEADLESS=true \
  telnyx-wdio:latest npm run test:headless:main
```

### 3. PowerShell commands (for Windows)

**Run in Chrome:**

```powershell
docker run --rm -e BROWSER=chrome -e HEADLESS=true -v ${PWD}/allure-results:/app/allure-results telnyx-wdio:latest
```

**Run in Firefox:**

```powershell
docker run --rm -e BROWSER=firefox -e HEADLESS=true -v ${PWD}/allure-results:/app/allure-results telnyx-wdio:latest
```

## Docker Files Structure

- **Dockerfile** - Docker image description with Node.js and browsers
- **docker-compose.yml** - orchestration of multiple containers
- **.dockerignore** - exclusions when copying files to image

## Environment Variables

- `BROWSER` - browser for tests (`chrome` or `firefox`)
- `HEADLESS` - headless mode (`true` or `false`)

## Usage in CI/CD

GitHub Actions automatically uses Docker to run tests.
See `.github/workflows/ci.yml`

## Troubleshooting

**Issue: Permission denied on Windows**

```powershell
# Grant Docker Desktop access to your drive
# Settings → Resources → File Sharing → add your drive
```

**Issue: Tests fail with browser error**

```bash
# Rebuild image without cache
docker build --no-cache -t telnyx-wdio:latest .
```

**Issue: Allure report not generated**

```bash
# Check that directory is created
mkdir -p allure-results

# Check permissions
chmod -R 777 allure-results
```

## Cleanup

**Remove all containers:**

```bash
docker-compose down
```

**Remove image:**

```bash
docker rmi telnyx-wdio:latest
```

**Full Docker cleanup:**

```bash
docker system prune -a
```
