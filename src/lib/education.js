import { supabase } from '@/lib/supabase'

export async function getEducationDetails() {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('order_index', { ascending: true })
    .order('start_date', { ascending: false })

  if (error) {
    console.error('Error fetching education details:', error)
    throw new Error('Could not fetch education details.')
  }

  return data || []
}
