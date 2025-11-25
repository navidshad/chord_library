#!/bin/bash

# Generate self-signed SSL certificate for development
# Usage: ./generate-self-signed-cert.sh [domain]

DOMAIN=${1:-localhost}
CERT_DIR="$(dirname "$0")/ssl"

echo "Generating self-signed certificate for $DOMAIN..."
echo "Certificate will be saved to: $CERT_DIR"

mkdir -p "$CERT_DIR"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "$CERT_DIR/key.pem" \
  -out "$CERT_DIR/cert.pem" \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=$DOMAIN"

chmod 600 "$CERT_DIR/key.pem"
chmod 644 "$CERT_DIR/cert.pem"

echo "Certificate generated successfully!"
echo "Files:"
echo "  - $CERT_DIR/cert.pem"
echo "  - $CERT_DIR/key.pem"

