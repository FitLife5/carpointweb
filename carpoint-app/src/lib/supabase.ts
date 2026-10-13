import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bkavonoyjfcnqqvyntnv.supabase.co';
const supabaseAnonKey = 'sb_publishable_qUQeFNKmcjiq1dM4OAykjA_6qDYpKmq';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);