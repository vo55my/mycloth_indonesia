import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzjwyjtvxknqcupiwhbx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6and5anR2eGtucWN1cGl3aGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMTg1MzgsImV4cCI6MjA3MDg5NDUzOH0.MFjL25qEfAMYsn_hdKqP0F_BIICQESmVD9kJG9ij0Lk';

export const supabase = createClient(supabaseUrl, supabaseKey);
