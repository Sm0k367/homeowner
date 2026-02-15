import { supabase, isSupabaseConfigured } from './supabase';

// Helper: check if we can use Supabase
const useSupabase = () => {
  if (typeof window === 'undefined') return false;
  return isSupabaseConfigured();
};

// Helper: safe localStorage
const ls = {
  get: (key) => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set: (key, val) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
  },
  remove: (key) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};

// ==================== AUTH ====================

export async function signUp(email, password, name) {
  if (useSupabase()) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (err) {
      console.warn('Supabase signUp failed, falling back to localStorage:', err.message);
    }
  }
  // localStorage fallback
  const users = ls.get('hg_users') || [];
  if (users.find(u => u.email === email)) {
    return { user: null, error: { message: 'An account with this email already exists.' } };
  }
  users.push({ name, email, password });
  ls.set('hg_users', users);
  const user = { email, name, id: 'local_' + Date.now() };
  ls.set('hg_user', user);
  return { user, error: null };
}

export async function signIn(email, password) {
  if (useSupabase()) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { user: data.user, error: null };
    } catch (err) {
      console.warn('Supabase signIn failed, falling back to localStorage:', err.message);
    }
  }
  // localStorage fallback
  const users = ls.get('hg_users') || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user || (email && password)) {
    const userData = user ? { email: user.email, name: user.name, id: 'local_' + Date.now() } : { email, id: 'local_' + Date.now() };
    ls.set('hg_user', userData);
    return { user: userData, error: null };
  }
  return { user: null, error: { message: 'Please enter your email and password.' } };
}

export async function signOut() {
  if (useSupabase()) {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut failed:', err.message);
    }
  }
  ls.remove('hg_user');
}

export async function getUser() {
  if (useSupabase()) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) return user;
    } catch (err) {
      console.warn('Supabase getUser failed:', err.message);
    }
  }
  return ls.get('hg_user');
}

export function onAuthStateChange(callback) {
  if (useSupabase()) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
    return subscription;
  }
  return null;
}

// ==================== HOME PROFILE ====================

export async function saveHomeProfile(userId, profile) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data: existing } = await supabase
        .from('home_profiles')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existing) {
        const { error } = await supabase
          .from('home_profiles')
          .update({ address: profile.address, sq_ft: profile.sqft, year_built: profile.yearBuilt, systems: profile.systems || [], updated_at: new Date().toISOString() })
          .eq('user_id', userId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('home_profiles')
          .insert({ user_id: userId, address: profile.address, sq_ft: profile.sqft, year_built: profile.yearBuilt, systems: profile.systems || [] });
        if (error) throw error;
      }
      return;
    } catch (err) {
      console.warn('Supabase saveHomeProfile failed, using localStorage:', err.message);
    }
  }
  ls.set('hg_profile', profile);
}

export async function getHomeProfile(userId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data, error } = await supabase
        .from('home_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) return { address: data.address, sqft: data.sq_ft, yearBuilt: data.year_built, systems: data.systems || [] };
    } catch (err) {
      console.warn('Supabase getHomeProfile failed, using localStorage:', err.message);
    }
  }
  return ls.get('hg_profile') || { address: '', sqft: '', yearBuilt: '', systems: [] };
}

// ==================== MAINTENANCE ====================

export async function saveMaintenance(userId, items) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      // Delete existing and re-insert
      await supabase.from('maintenance_tasks').delete().eq('user_id', userId);
      if (items.length > 0) {
        const rows = items.map(t => ({
          id: t.id,
          user_id: userId,
          system: t.system,
          task: t.task,
          frequency: t.frequency,
          urgency: t.urgency,
          season: t.season,
          due_date: t.dueDate,
          completed: t.completed || false,
        }));
        const { error } = await supabase.from('maintenance_tasks').insert(rows);
        if (error) throw error;
      }
      return;
    } catch (err) {
      console.warn('Supabase saveMaintenance failed, using localStorage:', err.message);
    }
  }
  ls.set('hg_maintenance', items);
}

export async function getMaintenance(userId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data, error } = await supabase
        .from('maintenance_tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(t => ({
        id: t.id,
        system: t.system,
        task: t.task,
        frequency: t.frequency,
        urgency: t.urgency,
        season: t.season,
        dueDate: t.due_date,
        completed: t.completed,
      }));
    } catch (err) {
      console.warn('Supabase getMaintenance failed, using localStorage:', err.message);
    }
  }
  return ls.get('hg_maintenance') || [];
}

export async function updateMaintenanceTask(userId, taskId, updates) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const dbUpdates = {};
      if ('completed' in updates) dbUpdates.completed = updates.completed;
      if ('task' in updates) dbUpdates.task = updates.task;
      if ('dueDate' in updates) dbUpdates.due_date = updates.dueDate;
      if ('urgency' in updates) dbUpdates.urgency = updates.urgency;

      const { error } = await supabase
        .from('maintenance_tasks')
        .update(dbUpdates)
        .eq('id', taskId)
        .eq('user_id', userId);
      if (error) throw error;
      return;
    } catch (err) {
      console.warn('Supabase updateMaintenanceTask failed, using localStorage:', err.message);
    }
  }
  const tasks = ls.get('hg_maintenance') || [];
  ls.set('hg_maintenance', tasks.map(t => t.id === taskId ? { ...t, ...updates } : t));
}

// ==================== WARRANTIES ====================

export async function saveWarranties(userId, warranties) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      await supabase.from('warranties').delete().eq('user_id', userId);
      if (warranties.length > 0) {
        const rows = warranties.map(w => ({
          id: w.id,
          user_id: userId,
          item_name: w.itemName,
          purchase_date: w.purchaseDate,
          expiry_date: w.expiryDate,
          warranty_years: w.warrantyYears,
          provider: w.provider,
          notes: w.notes || '',
        }));
        const { error } = await supabase.from('warranties').insert(rows);
        if (error) throw error;
      }
      return;
    } catch (err) {
      console.warn('Supabase saveWarranties failed, using localStorage:', err.message);
    }
  }
  ls.set('hg_warranties', warranties);
}

export async function getWarranties(userId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data, error } = await supabase
        .from('warranties')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(w => ({
        id: w.id,
        itemName: w.item_name,
        purchaseDate: w.purchase_date,
        expiryDate: w.expiry_date,
        warrantyYears: w.warranty_years,
        provider: w.provider,
        notes: w.notes,
      }));
    } catch (err) {
      console.warn('Supabase getWarranties failed, using localStorage:', err.message);
    }
  }
  return ls.get('hg_warranties') || [];
}

export async function deleteWarranty(userId, warrantyId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { error } = await supabase
        .from('warranties')
        .delete()
        .eq('id', warrantyId)
        .eq('user_id', userId);
      if (error) throw error;
      return;
    } catch (err) {
      console.warn('Supabase deleteWarranty failed, using localStorage:', err.message);
    }
  }
  const warranties = ls.get('hg_warranties') || [];
  ls.set('hg_warranties', warranties.filter(w => w.id !== warrantyId));
}

// ==================== EXPENSES ====================

export async function saveExpenses(userId, expenses) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      await supabase.from('expenses').delete().eq('user_id', userId);
      if (expenses.length > 0) {
        const rows = expenses.map(e => ({
          id: e.id,
          user_id: userId,
          category: e.category,
          description: e.description,
          amount: e.amount,
          date: e.date,
        }));
        const { error } = await supabase.from('expenses').insert(rows);
        if (error) throw error;
      }
      return;
    } catch (err) {
      console.warn('Supabase saveExpenses failed, using localStorage:', err.message);
    }
  }
  ls.set('hg_expenses', expenses);
}

export async function getExpenses(userId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data || []).map(e => ({
        id: e.id,
        category: e.category,
        description: e.description,
        amount: e.amount,
        date: e.date,
      }));
    } catch (err) {
      console.warn('Supabase getExpenses failed, using localStorage:', err.message);
    }
  }
  return ls.get('hg_expenses') || [];
}

// ==================== SAVED CONTRACTORS ====================

export async function saveFavoriteContractors(userId, contractorIds) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      await supabase.from('saved_contractors').delete().eq('user_id', userId);
      if (contractorIds.length > 0) {
        const rows = contractorIds.map(cid => ({ user_id: userId, contractor_id: cid }));
        const { error } = await supabase.from('saved_contractors').insert(rows);
        if (error) throw error;
      }
      return;
    } catch (err) {
      console.warn('Supabase saveFavoriteContractors failed, using localStorage:', err.message);
    }
  }
  ls.set('hg_saved_contractors', contractorIds);
}

export async function getFavoriteContractors(userId) {
  if (useSupabase() && userId && !userId.startsWith('local_')) {
    try {
      const { data, error } = await supabase
        .from('saved_contractors')
        .select('contractor_id')
        .eq('user_id', userId);
      if (error) throw error;
      return (data || []).map(d => d.contractor_id);
    } catch (err) {
      console.warn('Supabase getFavoriteContractors failed, using localStorage:', err.message);
    }
  }
  return ls.get('hg_saved_contractors') || [];
}
