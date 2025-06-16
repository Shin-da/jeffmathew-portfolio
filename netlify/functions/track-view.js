// This file will contain the Netlify Function logic.
// We will add content to this in the next step. 

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { page_name } = JSON.parse(event.body);

    if (!page_name) {
        return {
            statusCode: 400,
            body: 'Missing page_name parameter.',
        };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // --- DEBUGGING LINE --- 
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key (first 5 chars):', supabaseKey ? supabaseKey.substring(0, 5) + '...' : 'Not Set');
    // --- END DEBUGGING LINE --- 

    if (!supabaseUrl || !supabaseKey) {
        return {
            statusCode: 500,
            body: 'Supabase environment variables not set.',
        };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // Try to find the page_name
        let { data, error } = await supabase
            .from('page_views')
            .select('view_count')
            .eq('page_name', page_name)
            .single();

        let newViewCount;

        if (error && error.code === 'PGRST116') { // No rows found (page_name doesn't exist)
            // Insert new page with count 1
            const { data: insertData, error: insertError } = await supabase
                .from('page_views')
                .insert([{ page_name: page_name, view_count: 1 }])
                .select()
                .single();

            if (insertError) throw insertError;
            newViewCount = insertData.view_count;

        } else if (error) {
            throw error; // Other errors
        } else {
            // Page exists, increment view_count
            newViewCount = data.view_count + 1;
            const { error: updateError } = await supabase
                .from('page_views')
                .update({ view_count: newViewCount })
                .eq('page_name', page_name);

            if (updateError) throw updateError;
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ view_count: newViewCount }),
        };

    } catch (error) {
        console.error('Supabase error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Failed to update view count.' }),
        };
    }
}; 