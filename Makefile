# AI Doctor Platform Makefile
# Comprehensive build and deployment automation

# Variables
PYTHON_VERSION = 3.9
VENV_NAME = ai_doctor_env
MYSQL_DB = ai_doctor_db
MYSQL_USER = root
MYSQL_HOST = localhost
MYSQL_PORT = 3306

# Python and Flask settings
FLASK_APP = app.py
FLASK_ENV = development
FLASK_PORT = 5000

# C++ compilation settings
CXX = g++
CXXFLAGS = -std=c++17 -fPIC -O2 -Wall
LDFLAGS = -shared -ljsoncpp

# Directories
SRC_DIR = src
BUILD_DIR = build
STATIC_DIR = static
TEMPLATES_DIR = templates
SCRIPTS_DIR = scripts

# Colors for output
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
BLUE = \033[0;34m
NC = \033[0m # No Color

.PHONY: help install setup-db run-dev test clean build-cpp lint format backup-db

# Default target
help:
	@echo "$(BLUE)AI Doctor Platform - Available Commands:$(NC)"
	@echo "$(GREEN)Development:$(NC)"
	@echo "  make install          - Install Python dependencies"
	@echo "  make setup-db         - Setup MySQL database and tables"
	@echo "  make seed-db          - Populate database with sample data"
	@echo "  make run-dev          - Start development server"
	@echo "  make test             - Run tests"
	@echo ""
	@echo "$(GREEN)Build:$(NC)"
	@echo "  make build-cpp        - Compile C++ medical analysis library"
	@echo "  make build-all        - Build all components"
	@echo ""
	@echo "$(GREEN)Code Quality:$(NC)"
	@echo "  make lint             - Run code linting"
	@echo "  make format           - Format code"
	@echo ""
	@echo "$(GREEN)Database:$(NC)"
	@echo "  make backup-db        - Backup database"
	@echo "  make restore-db       - Restore database from backup"
	@echo ""
	@echo "$(GREEN)Deployment:$(NC)"
	@echo "  make deploy-prod      - Deploy to production"
	@echo "  make clean            - Clean build files"

# Install system dependencies
install-system-deps:
	@echo "$(YELLOW)Installing system dependencies...$(NC)"
	@if command -v apt-get >/dev/null 2>&1; then \
		sudo apt-get update && \
		sudo apt-get install -y python3-pip python3-venv mysql-server mysql-client \
		build-essential libjsoncpp-dev pkg-config curl; \
	elif command -v yum >/dev/null 2>&1; then \
		sudo yum install -y python3-pip python3-venv mysql-server mysql \
		gcc-c++ jsoncpp-devel pkgconfig curl; \
	elif command -v brew >/dev/null 2>&1; then \
		brew install python mysql jsoncpp pkg-config curl; \
	else \
		echo "$(RED)Unsupported package manager. Please install dependencies manually.$(NC)"; \
		exit 1; \
	fi

# Setup Python virtual environment and install dependencies
install:
	@echo "$(YELLOW)Setting up Python environment...$(NC)"
	@if [ ! -d "$(VENV_NAME)" ]; then \
		python3 -m venv $(VENV_NAME); \
	fi
	@echo "$(YELLOW)Installing Python dependencies...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip install --upgrade pip && \
	pip install flask flask-sqlalchemy flask-cors mysql-connector-python \
	werkzeug requests openai python-dotenv pytest black flake8 \
	gunicorn supervisor
	@echo "$(GREEN)Python environment setup complete!$(NC)"

# Setup MySQL database
setup-mysql:
	@echo "$(YELLOW)Setting up MySQL...$(NC)"
	@if ! systemctl is-active --quiet mysql; then \
		sudo systemctl start mysql; \
		sudo systemctl enable mysql; \
	fi
	@echo "$(GREEN)MySQL service started!$(NC)"

# Create database and tables
setup-db: setup-mysql
	@echo "$(YELLOW)Creating database and tables...$(NC)"
	@mysql -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p < database/schema.sql
	@echo "$(GREEN)Database schema created successfully!$(NC)"

# Seed database with sample data
seed-db:
	@echo "$(YELLOW)Seeding database with sample data...$(NC)"
	@mysql -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p $(MYSQL_DB) < database/seed_data.sql
	@echo "$(GREEN)Database seeded successfully!$(NC)"

# Compile C++ medical analysis library
build-cpp:
	@echo "$(YELLOW)Compiling C++ medical analysis library...$(NC)"
	@mkdir -p $(BUILD_DIR)
	@$(CXX) $(CXXFLAGS) -c medical_analysis.cpp -o $(BUILD_DIR)/medical_analysis.o
	@$(CXX) $(LDFLAGS) $(BUILD_DIR)/medical_analysis.o -o medical_analysis.so
	@echo "$(GREEN)C++ library compiled successfully!$(NC)"

# Build all components
build-all: build-cpp
	@echo "$(GREEN)All components built successfully!$(NC)"

# Run development server
run-dev:
	@echo "$(YELLOW)Starting development server...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	export FLASK_APP=$(FLASK_APP) && \
	export FLASK_ENV=$(FLASK_ENV) && \
	python -m flask run --host=0.0.0.0 --port=$(FLASK_PORT)

# Run tests
test:
	@echo "$(YELLOW)Running tests...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	python -m pytest tests/ -v --tb=short
	@echo "$(GREEN)Tests completed!$(NC)"

# Code linting
lint:
	@echo "$(YELLOW)Running code linting...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	flake8 app.py --max-line-length=100 --ignore=E203,W503 && \
	echo "$(GREEN)Python linting passed!$(NC)"

# Code formatting
format:
	@echo "$(YELLOW)Formatting code...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	black app.py --line-length=100
	@echo "$(GREEN)Code formatted!$(NC)"

# Backup database
backup-db:
	@echo "$(YELLOW)Backing up database...$(NC)"
	@mkdir -p backups
	@mysqldump -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p $(MYSQL_DB) > backups/$(MYSQL_DB)_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Database backup created!$(NC)"

# Restore database from backup
restore-db:
	@echo "$(YELLOW)Restoring database from backup...$(NC)"
	@if [ -z "$(BACKUP_FILE)" ]; then \
		echo "$(RED)Please specify BACKUP_FILE=path/to/backup.sql$(NC)"; \
		exit 1; \
	fi
	@mysql -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p $(MYSQL_DB) < $(BACKUP_FILE)
	@echo "$(GREEN)Database restored successfully!$(NC)"

# Production deployment
deploy-prod:
	@echo "$(YELLOW)Deploying to production...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	export FLASK_ENV=production && \
	gunicorn --bind 0.0.0.0:$(FLASK_PORT) --workers 4 --timeout 120 app:app
	@echo "$(GREEN)Production deployment started!$(NC)"

# Clean build files
clean:
	@echo "$(YELLOW)Cleaning build files...$(NC)"
	@rm -rf $(BUILD_DIR)
	@rm -f medical_analysis.so
	@rm -rf __pycache__
	@rm -rf *.pyc
	@find . -name "*.pyc" -delete
	@find . -name "__pycache__" -delete
	@echo "$(GREEN)Build files cleaned!$(NC)"

# Development workflow shortcuts
dev-setup: install-system-deps install setup-db seed-db build-cpp
	@echo "$(GREEN)Development environment setup complete!$(NC)"
	@echo "$(BLUE)Run 'make run-dev' to start the development server$(NC)"

# Quick start for new developers
quick-start: dev-setup
	@echo "$(GREEN)Quick start complete! Starting development server...$(NC)"
	@make run-dev

# Health check
health-check:
	@echo "$(YELLOW)Performing health check...$(NC)"
	@curl -f http://localhost:$(FLASK_PORT)/api/health || echo "$(RED)Server not responding$(NC)"
	@mysql -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p -e "SELECT 1" $(MYSQL_DB) && echo "$(GREEN)Database connection OK$(NC)" || echo "$(RED)Database connection failed$(NC)"

# Monitor logs
logs:
	@echo "$(YELLOW)Monitoring application logs...$(NC)"
	@tail -f logs/app.log

# Update dependencies
update-deps:
	@echo "$(YELLOW)Updating dependencies...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U
	@echo "$(GREEN)Dependencies updated!$(NC)"

# Security scan
security-scan:
	@echo "$(YELLOW)Running security scan...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip install safety && \
	safety check
	@echo "$(GREEN)Security scan completed!$(NC)"

# Performance test
perf-test:
	@echo "$(YELLOW)Running performance tests...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip install locust && \
	locust -f tests/performance_test.py --host=http://localhost:$(FLASK_PORT)

# Docker commands
docker-build:
	@echo "$(YELLOW)Building Docker image...$(NC)"
	@docker build -t ai-doctor-platform .
	@echo "$(GREEN)Docker image built successfully!$(NC)"

docker-run:
	@echo "$(YELLOW)Running Docker container...$(NC)"
	@docker run -p $(FLASK_PORT):$(FLASK_PORT) -e FLASK_ENV=production ai-doctor-platform

# Documentation generation
docs:
	@echo "$(YELLOW)Generating documentation...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip install sphinx && \
	sphinx-build -b html docs/ docs/_build/
	@echo "$(GREEN)Documentation generated in docs/_build/$(NC)"

# Database migration
migrate-db:
	@echo "$(YELLOW)Running database migrations...$(NC)"
	@mysql -h$(MYSQL_HOST) -P$(MYSQL_PORT) -u$(MYSQL_USER) -p $(MYSQL_DB) < database/migrations/$(MIGRATION_FILE)
	@echo "$(GREEN)Database migration completed!$(NC)"

# SSL certificate setup
setup-ssl:
	@echo "$(YELLOW)Setting up SSL certificates...$(NC)"
	@sudo certbot --nginx -d yourdomain.com
	@echo "$(GREEN)SSL certificates configured!$(NC)"

# Monitoring setup
setup-monitoring:
	@echo "$(YELLOW)Setting up monitoring...$(NC)"
	@. $(VENV_NAME)/bin/activate && \
	pip install prometheus-client && \
	echo "$(GREEN)Monitoring setup complete!$(NC)"
