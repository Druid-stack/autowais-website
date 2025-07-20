# Infrastructure & Deployment

This workspace contains all deployment configurations, infrastructure scripts, and environment management tools.

## Structure

- **docker/**: Docker configurations and container orchestration
- **scripts/**: Deployment and maintenance scripts
- **configurations/**: Environment configs, settings, and service configurations
- **environments/**: Environment-specific variables and settings

## Docker Deployment

The docker directory contains:

- `docker-compose.yml` - Multi-service orchestration
- `Dockerfile.*` - Container build configurations
- `nginx-autowais.conf` - Reverse proxy configuration
- `ecosystem.config.js` - PM2 process management

## Scripts

Automated deployment and maintenance scripts:

- Deployment automation
- Database setup and migration
- Security configuration
- Backup and restore procedures

## Configurations

Environment and service configurations:

- `.env` files and environment variables
- Cursor IDE configurations
- N8N limits and service configs
- Security and firewall rules

## Environment Management

- Development environment setup
- Production deployment configurations
- Staging and testing environments
- Environment variable management

## Quick Deploy

1. Copy appropriate environment variables to `.env`
2. Run `docker-compose up -d` for containerized deployment
3. Use deployment scripts for custom setups
4. Monitor with PM2 or your preferred process manager

## Security

This workspace includes security configurations and monitoring scripts. Review and customize according to your security requirements.
