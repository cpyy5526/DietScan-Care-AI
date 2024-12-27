# AI 기반 바이오파울링 모니터링 시스템


This project provides a biofouling detection service using AI models. It includes a backend API and a frontend dashboard. The system is containerized with Docker for easy deployment.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Contact](#contact)

---

## Overview
The biofouling detection service uses sensor data to detect biofouling and visualize the results on a web dashboard. The backend provides REST APIs to process the AI model's results and communicate with the frontend.

---

## Features
- Hourly biofouling detection using AI models.
- Visualization of detection results and sensor data.
- Alert notifications for biofouling occurrences.
- Simple and intuitive web interface.

---

## Prerequisites
Before starting, ensure you have the following installed:
- Docker
- Docker Compose
- Python (if running locally without Docker)

---

## Installation

### Clone the Repository
```bash
git clone https://github.com/your-organization/biofouling-detection.git
cd biofouling-detection