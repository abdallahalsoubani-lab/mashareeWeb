#!/bin/sh

echo "🚀 Starting Masharee Application..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 3

echo "✅ Application ready - starting server!"

# Execute the main command
exec "$@"
