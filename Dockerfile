# Use Selenium standalone image with Chrome
FROM selenium/standalone-chrome:latest

# Switch to root to install Node.js
USER root

# Install Node.js 22.x
RUN apt-get update && \
  apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get install -y nodejs && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy entire project
COPY . .

# Create directories for test results
RUN mkdir -p allure-results allure-report

# Set permissions
RUN chmod -R 777 allure-results allure-report

# Default command - run tests
CMD ["npm", "run", "test:headless"]
