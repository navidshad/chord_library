# Nginx SSL Configuration

This directory contains nginx configuration files for SSL/TLS setup.

## Directory Structure

- `nginx.conf` - Main nginx configuration
- `default.conf` - Site-specific configuration with SSL
- `ssl/` - Directory for SSL certificates (cert.pem and key.pem)
- `certbot/` - Directory for Let's Encrypt challenges

## SSL Certificate Setup

### Option 1: Self-Signed Certificate (Development)

For development/testing, you can generate a self-signed certificate:

```bash
mkdir -p nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
```

### Option 2: Let's Encrypt (Production)

For production, use Let's Encrypt with certbot:

1. **Initial certificate request** (run this once):
```bash
docker run -it --rm \
  -v "$(pwd)/nginx/certbot:/var/www/certbot" \
  -v "$(pwd)/nginx/ssl:/etc/letsencrypt" \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com
```

2. **Copy certificates to nginx ssl directory**:
```bash
cp nginx/ssl/live/yourdomain.com/fullchain.pem nginx/ssl/cert.pem
cp nginx/ssl/live/yourdomain.com/privkey.pem nginx/ssl/key.pem
```

3. **Auto-renewal** (add to crontab or systemd timer):
```bash
docker run --rm \
  -v "$(pwd)/nginx/certbot:/var/www/certbot" \
  -v "$(pwd)/nginx/ssl:/etc/letsencrypt" \
  certbot/certbot renew
```

After renewal, restart nginx:
```bash
docker-compose restart nginx
```

## Configuration

The nginx configuration:
- Listens on ports 80 (HTTP) and 443 (HTTPS)
- Redirects all HTTP traffic to HTTPS
- Proxies requests to the `website` service on port 8080
- Includes security headers (HSTS, X-Frame-Options, etc.)

## Notes

- Make sure the `nginx/ssl` directory exists and contains `cert.pem` and `key.pem`
- The `nginx/certbot` directory is used for Let's Encrypt webroot challenges
- Update `server_name` in `default.conf` with your actual domain name

