#!/bin/bash

# Script to test ghcr.io connectivity and image access
# Run this on your server to diagnose connection issues

echo "=== Testing ghcr.io Connectivity ==="
echo ""

# Test 1: Basic connectivity to ghcr.io
echo "1. Testing basic connectivity to ghcr.io..."
if curl -I --max-time 10 https://ghcr.io 2>&1 | grep -q "HTTP"; then
    echo "   ✓ ghcr.io is reachable"
else
    echo "   ✗ Cannot reach ghcr.io"
    echo "   Check your internet connection and firewall settings"
fi
echo ""

# Test 2: Test Docker registry API
echo "2. Testing Docker registry API..."
if curl -I --max-time 10 https://ghcr.io/v2/ 2>&1 | grep -q "HTTP"; then
    echo "   ✓ Docker registry API is accessible"
    curl -I --max-time 10 https://ghcr.io/v2/ 2>&1 | head -1
else
    echo "   ✗ Cannot access Docker registry API"
fi
echo ""

# Test 3: Check if you're logged in to ghcr.io
echo "3. Checking Docker login status for ghcr.io..."
if docker login ghcr.io --username test --password-stdin <<< "test" 2>&1 | grep -q "unauthorized\|authentication required"; then
    echo "   ⚠ Not logged in (this is expected if you haven't logged in)"
else
    echo "   Checking current login status..."
    cat ~/.docker/config.json 2>/dev/null | grep -q "ghcr.io" && echo "   ✓ Found ghcr.io in Docker config" || echo "   ✗ Not logged in to ghcr.io"
fi
echo ""

# Test 4: Test specific image access (without pulling)
echo "4. Testing access to specific images..."
echo "   Testing MongoDB image..."
if curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library_mongodb/manifests/4.4.28" 2>&1 | grep -q "HTTP.*200\|HTTP.*401\|HTTP.*404"; then
    STATUS=$(curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library_mongodb/manifests/4.4.28" 2>&1 | head -1)
    echo "   MongoDB image: $STATUS"
    if echo "$STATUS" | grep -q "401\|403"; then
        echo "   ⚠ Image exists but requires authentication"
    elif echo "$STATUS" | grep -q "404"; then
        echo "   ✗ Image not found (404)"
    elif echo "$STATUS" | grep -q "200"; then
        echo "   ✓ Image is accessible"
    fi
else
    echo "   ✗ Cannot check image (timeout or connection error)"
fi
echo ""

echo "   Testing Nginx image..."
if curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library_nginx/manifests/latest" 2>&1 | grep -q "HTTP.*200\|HTTP.*401\|HTTP.*404"; then
    STATUS=$(curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library_nginx/manifests/latest" 2>&1 | head -1)
    echo "   Nginx image: $STATUS"
    if echo "$STATUS" | grep -q "401\|403"; then
        echo "   ⚠ Image exists but requires authentication"
    elif echo "$STATUS" | grep -q "404"; then
        echo "   ✗ Image not found (404)"
    elif echo "$STATUS" | grep -q "200"; then
        echo "   ✓ Image is accessible"
    fi
else
    echo "   ✗ Cannot check image (timeout or connection error)"
fi
echo ""

echo "   Testing App image..."
if curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library/manifests/latest" 2>&1 | grep -q "HTTP.*200\|HTTP.*401\|HTTP.*404"; then
    STATUS=$(curl -I --max-time 10 "https://ghcr.io/v2/navidshad/chord_library/manifests/latest" 2>&1 | head -1)
    echo "   App image: $STATUS"
    if echo "$STATUS" | grep -q "401\|403"; then
        echo "   ⚠ Image exists but requires authentication"
    elif echo "$STATUS" | grep -q "404"; then
        echo "   ✗ Image not found (404)"
    elif echo "$STATUS" | grep -q "200"; then
        echo "   ✓ Image is accessible"
    fi
else
    echo "   ✗ Cannot check image (timeout or connection error)"
fi
echo ""

# Test 5: DNS resolution
echo "5. Testing DNS resolution..."
if nslookup ghcr.io > /dev/null 2>&1; then
    echo "   ✓ DNS resolution works"
    nslookup ghcr.io | grep -A 1 "Name:"
else
    echo "   ✗ DNS resolution failed"
fi
echo ""

# Test 6: Docker pull test (dry run - will fail but shows if connection works)
echo "6. Testing Docker pull (this will fail but shows connection)..."
echo "   Attempting to pull (will timeout after 10 seconds)..."
timeout 10 docker pull ghcr.io/navidshad/chord_library_mongodb:4.4.28 2>&1 | head -5
echo ""

echo "=== Summary ==="
echo "If you see connection timeouts:"
echo "  1. Check your server's internet connection"
echo "  2. Check firewall/proxy settings"
echo "  3. Check if ghcr.io is blocked in your region"
echo ""
echo "If images require authentication:"
echo "  1. You need to login: docker login ghcr.io -u YOUR_GITHUB_USERNAME"
echo "  2. Use a GitHub Personal Access Token (PAT) with 'read:packages' permission"
echo "  3. Or make the packages public in GitHub repository settings"

