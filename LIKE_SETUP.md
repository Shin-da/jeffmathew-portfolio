# Interactive Gallery Likes Setup Guide (Netlify + Supabase)

This guide explains how to set up the interactive like functionality for your art gallery using **Netlify Functions** and **Supabase**.

## Features

✅ **Interactive Hearts**: Users can click hearts to like/unlike artworks  
✅ **Persistent Storage**: Likes are saved to Supabase and persist across sessions  
✅ **Real-time Updates**: Like counts update immediately with smooth animations  
✅ **Fallback System**: Works offline with local storage backup  
✅ **User Tracking**: Prevents duplicate likes from same user  
✅ **Beautiful Animations**: Heart beat effects and smooth transitions  
✅ **Serverless**: Powered by Netlify Functions for scalability  

## Setup Instructions

### 1. Supabase Database Setup

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your **Project URL** and **Anon Key** (you'll need these later)

#### Step 2: Run Database Setup
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase-setup.sql`
3. Run the script to create tables and insert default data

#### Step 3: Verify Setup
The script will create:
- `artworks` table - stores artwork information and base like counts
- `artwork_likes` table - stores user likes with IP tracking
- Proper indexes and Row Level Security (RLS) policies

### 2. Netlify Environment Variables

#### Step 1: Add Environment Variables
In your Netlify dashboard:
1. Go to **Site settings** → **Environment variables**
2. Add these variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

#### Step 2: Get Supabase Credentials
From your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Paste them into Netlify environment variables

### 3. File Structure

Ensure these files are in place:
```
JEFF-PORTFOLIO/
├── netlify/
│   └── functions/
│       └── like-artwork.js          # Netlify Function
├── js/
│   └── gallery.js                   # Updated with like functionality
├── css/modules/
│   └── gallery.css                  # Updated with like styles
├── gallery.html                     # Updated with interactive hearts
├── supabase-setup.sql               # Database setup script
├── package.json                     # Includes @supabase/supabase-js
└── LIKE_SETUP.md                    # This file
```

### 4. Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy automatically on push

#### Option B: Manual Deploy
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy --prod`

### 5. Testing the Setup

1. **Deploy your site** to Netlify
2. **Navigate to the gallery page**
3. **Click on any heart icon** - it should:
   - Turn red and animate
   - Update the like count
   - Save to Supabase
   - Persist on page refresh

## How It Works

### Frontend (JavaScript)
- **Event Listeners**: Captures clicks on heart icons
- **Netlify Functions**: Sends like/unlike requests to serverless functions
- **Local Storage**: Backup storage for offline functionality
- **Animations**: Smooth heart beat and pulse effects

### Backend (Netlify Functions + Supabase)
- **Serverless Functions**: Handle API requests without server management
- **Supabase Database**: PostgreSQL database with real-time capabilities
- **User Tracking**: Uses IP address to prevent duplicate likes
- **Row Level Security**: Secure database access policies

### Database Schema
```sql
-- Artworks table
artworks (id, title, image_path, category, created_date, base_likes, created_at)

-- User likes table  
artwork_likes (id, artwork_id, user_ip, user_agent, created_at)
```

## Customization Options

### 1. Change Heart Colors
Edit `css/modules/gallery.css`:
```css
.gallery-item-stat i.fas.fa-heart {
    color: #your-color; /* Change from #e74c3c */
}
```

### 2. Modify Animations
Adjust animation timing in CSS:
```css
@keyframes heartBeat {
    /* Modify animation keyframes */
}
```

### 3. Add More Artworks
Update the database via Supabase SQL Editor:
```sql
INSERT INTO artworks (title, image_path, category, created_date, base_likes) 
VALUES ('New Artwork', 'path/to/image.jpg', 'Category', '2025-01-01', 0);
```

### 4. Change User Tracking Method
Modify `netlify/functions/like-artwork.js` to use cookies or user accounts instead of IP addresses.

## Troubleshooting

### Common Issues

1. **Hearts not clickable**
   - Check if `gallery.js` is loaded
   - Verify CSS classes are applied correctly
   - Check browser console for JavaScript errors

2. **Netlify Function errors**
   - Check Netlify Function logs in dashboard
   - Verify environment variables are set correctly
   - Ensure Supabase credentials are valid

3. **Database connection errors**
   - Verify Supabase project is active
   - Check RLS policies are configured correctly
   - Ensure tables exist in Supabase

4. **Likes not persisting**
   - Check Netlify Function URL in JavaScript
   - Verify Supabase tables are created
   - Check browser network tab for API errors

### Debug Mode

Enable debug logging in Netlify Functions:
```javascript
console.log('Debug info:', { artwork_id, userIp, result });
```

Check logs in Netlify dashboard → Functions → like-artwork → Logs

## Security Considerations

- **Row Level Security**: Supabase RLS policies protect data
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Consider adding rate limiting for production
- **User Privacy**: IP addresses are stored for like tracking

## Performance Optimization

- **Database Indexes**: Already created for optimal queries
- **Serverless**: Automatic scaling with Netlify Functions
- **CDN**: Netlify provides global CDN
- **Caching**: Supabase provides query caching

## Future Enhancements

Potential improvements you could add:
- [ ] Real-time updates with Supabase subscriptions
- [ ] User accounts and authentication
- [ ] Like notifications
- [ ] Social sharing integration
- [ ] Analytics dashboard
- [ ] Comment system
- [ ] Favorite collections
- [ ] Email notifications

## Local Development

### Testing Netlify Functions Locally
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify dev`
3. Test functions at `http://localhost:8888/.netlify/functions/like-artwork`

### Testing Supabase Locally
1. Use Supabase CLI for local development
2. Or test directly against your Supabase project

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify Netlify Function logs
3. Test Supabase connection
4. Review environment variables

---

**Created by Jeff Mathew Garcia (シン/shin)**  
**Copyright © 2025 Jeff Mathew Garcia. All rights reserved.** 