import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Starting flash deals automation...')

    // Call the database function to auto-select flash deals
    const { error } = await supabase.rpc('auto_select_flash_deals')

    if (error) {
      console.error('Error auto-selecting flash deals:', error)
      throw error
    }

    // Get current flash deals count for logging
    const { data: flashDeals, error: countError } = await supabase
      .from('products')
      .select('id, name')
      .eq('flash_deal', true)
      .gte('flash_start_time', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

    if (countError) {
      console.error('Error fetching flash deals count:', countError)
    } else {
      console.log(`Flash deals automation completed. Current active deals: ${flashDeals?.length || 0}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Flash deals updated successfully',
        activeDeals: flashDeals?.length || 0
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Flash deals automation error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})