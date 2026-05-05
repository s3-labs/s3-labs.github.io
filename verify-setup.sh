#!/bin/bash

echo "S3 Lab Website - Supabase Setup Verification"
echo "=============================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "   Copy .env.local.example to .env.local and fill in your values"
    exit 1
fi

echo "✓ .env.local file found"
echo ""

# Check environment variables
if grep -q "NEXT_PUBLIC_SUPABASE_URL=" .env.local; then
    SUPABASE_URL=$(grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local | cut -d '=' -f2)
    if [ -z "$SUPABASE_URL" ] || [ "$SUPABASE_URL" = "your_supabase_url_here" ]; then
        echo "❌ NEXT_PUBLIC_SUPABASE_URL is not set properly"
    else
        echo "✓ NEXT_PUBLIC_SUPABASE_URL is set"
    fi
else
    echo "❌ NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
fi

if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local; then
    ANON_KEY=$(grep "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local | cut -d '=' -f2)
    if [ -z "$ANON_KEY" ] || [ "$ANON_KEY" = "your_supabase_anon_key_here" ]; then
        echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set properly"
    else
        echo "✓ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
    fi
else
    echo "❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local"
fi

if grep -q "NEXT_PUBLIC_ADMIN_PASSWORD=" .env.local; then
    echo "✓ NEXT_PUBLIC_ADMIN_PASSWORD is set"
else
    echo "❌ NEXT_PUBLIC_ADMIN_PASSWORD not found in .env.local"
fi

echo ""
echo "Setup Steps:"
echo "1. Create 'blogs' table in Supabase:"
echo "   SQL: See BLOG_SETUP.md"
echo ""
echo "2. Create 'blog-images' storage bucket:"
echo "   - Go to Storage in Supabase"
echo "   - Click 'New bucket'"
echo "   - Name: 'blog-images'"
echo "   - Make it Public"
echo ""
echo "3. Set RLS policies (optional for public read):"
echo "   - In Storage > Policies, create a policy for public read access"
echo ""
echo "4. Verify credentials in .env.local"
echo ""
