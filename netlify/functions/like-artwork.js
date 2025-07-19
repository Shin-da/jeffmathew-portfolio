const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod } = event;

    switch (httpMethod) {
      case 'GET':
        return await handleGetLikes(event, headers);
      case 'POST':
        return await handleToggleLike(event, headers);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

/**
 * Handle GET request - retrieve like counts
 */
async function handleGetLikes(event, headers) {
  const { artwork_id } = event.queryStringParameters || {};

  try {
    if (artwork_id) {
      // Get specific artwork likes
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          id,
          title,
          base_likes,
          artwork_likes (id)
        `)
        .eq('id', artwork_id)
        .single();

      if (error) throw error;

      const totalLikes = data.base_likes + (data.artwork_likes?.length || 0);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          base_likes: data.base_likes,
          user_likes: data.artwork_likes?.length || 0,
          total_likes: totalLikes
        })
      };
    } else {
      // Get all artworks with like counts
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          id,
          title,
          base_likes,
          artwork_likes (id)
        `)
        .order('id');

      if (error) throw error;

      const results = data.map(artwork => ({
        id: artwork.id,
        title: artwork.title,
        base_likes: artwork.base_likes,
        user_likes: artwork.artwork_likes?.length || 0,
        total_likes: artwork.base_likes + (artwork.artwork_likes?.length || 0)
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(results)
      };
    }
  } catch (error) {
    console.error('Get likes error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve likes' })
    };
  }
}

/**
 * Handle POST request - toggle like
 */
async function handleToggleLike(event, headers) {
  try {
    const { artwork_id, action = 'toggle' } = JSON.parse(event.body);
    
    if (!artwork_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Artwork ID is required' })
      };
    }

    // Get user identifier (IP address or user ID)
    const userIp = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown';
    const userAgent = event.headers['user-agent'] || '';

    // Check if user already liked this artwork
    const { data: existingLike, error: checkError } = await supabase
      .from('artwork_likes')
      .select('id')
      .eq('artwork_id', artwork_id)
      .eq('user_ip', userIp)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    let liked = false;

    if (existingLike) {
      // User has already liked - remove like
      if (action === 'like') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Already liked' })
        };
      }

      const { error: deleteError } = await supabase
        .from('artwork_likes')
        .delete()
        .eq('artwork_id', artwork_id)
        .eq('user_ip', userIp);

      if (deleteError) throw deleteError;
      liked = false;
    } else {
      // User hasn't liked - add like
      if (action === 'unlike') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Not liked yet' })
        };
      }

      const { error: insertError } = await supabase
        .from('artwork_likes')
        .insert({
          artwork_id,
          user_ip: userIp,
          user_agent: userAgent
        });

      if (insertError) throw insertError;
      liked = true;
    }

    // Get updated like count
    const { data: artworkData, error: countError } = await supabase
      .from('artworks')
      .select(`
        base_likes,
        artwork_likes (id)
      `)
      .eq('id', artwork_id)
      .single();

    if (countError) throw countError;

    const totalLikes = artworkData.base_likes + (artworkData.artwork_likes?.length || 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        liked,
        total_likes: totalLikes,
        user_likes: artworkData.artwork_likes?.length || 0,
        base_likes: artworkData.base_likes
      })
    };

  } catch (error) {
    console.error('Toggle like error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to update like' })
    };
  }
} 