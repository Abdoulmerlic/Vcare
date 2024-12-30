import { createClient } from '@supabase/supabase-js';

// Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User Authentication
export async function signUp(email, password, name, role) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { name, role },
        },
    });

    if (error) {
        console.error('Error signing up:', error.message);
    }
    return { data, error };
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Error logging in:', error.message);
    }
    return { data, error };
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error logging out:', error.message);
    }
    return error;
}

// Data Management
export async function fetchAppointments() {
    const { data, error } = await supabase.from('appointments').select('*');

    if (error) {
        console.error('Error fetching appointments:', error.message);
    }
    return { data, error };
}

// Real-Time Features
export function subscribeToAppointments(callback) {
    const subscription = supabase
        .channel('appointments')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'appointments' },
            (payload) => {
                console.log('New appointment:', payload.new);
                callback(payload.new); // Call the provided callback function
            }
        )
        .subscribe();

    return subscription;
}
