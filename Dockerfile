# Use official Node.js image with pre-installed browsers
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

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
