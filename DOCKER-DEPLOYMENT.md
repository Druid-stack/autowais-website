# Docker LEMP Deployment Guide

## Quick Docker Deployment

### Prerequisites

- Docker and Docker Compose installed
- Domain name (optional)

### 1. Start Services

```bash
docker-compose up -d
```

### 2. Check Status

```bash
docker-compose ps
docker-compose logs
```

### 3. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5001/api
- MongoDB: localhost:27017

### 4. Stop Services

```bash
docker-compose down
```

## Production Deployment

### 1. Update Environment Variables

Edit `docker-compose.yml` with your domain and secrets.

### 2. Setup SSL

```bash
# Create SSL directory
mkdir ssl

# Add your SSL certificates
cp your-cert.pem ssl/
cp your-key.pem ssl/
```

### 3. Deploy

```bash
docker-compose -f docker-compose.yml up -d
```

## Backup and Restore

### Backup

```bash
# Backup MongoDB
docker exec autowais-mongodb mongodump --out /data/backup

# Backup application data
docker-compose exec mongodb tar -czf /data/backup.tar.gz /data/db
```

### Restore

```bash
# Restore MongoDB
docker exec -i autowais-mongodb mongorestore /data/backup
```

## Monitoring

```bash
# View logs
docker-compose logs -f

# Check resource usage
docker stats

# Health checks
docker-compose ps
```

## Security Notes

- Change default passwords in docker-compose.yml
- Use secrets management for production
- Enable MongoDB authentication
- Configure firewall rules
