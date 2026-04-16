import { supabase } from './supabase';

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*, category:category_id');
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase.from('products').select('*, category:category_id').eq('id', id).single();
  if (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export async function getClinicServices() {
  const { data, error } = await supabase.from('clinic_services').select('*');
  if (error) {
    console.error('Error fetching clinic services:', error);
    return [];
  }
  return data;
}

export async function getBlogPosts() {
  const { data, error } = await supabase.from('blog_posts').select('*');
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  return data;
}

export async function getBlogPostById(id) {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return null;
  }
  return data;
}

// === ADMIN CRUD OPERATIONS ===

// Products
export async function uploadProductImage(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function createProduct(productData) {
  const { data, error } = await supabase.from('products').insert([productData]).select();
  if (error) throw error;
  return data[0];
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Blog Posts
export async function createBlogPost(postData) {
  const { data, error } = await supabase.from('blog_posts').insert([postData]).select();
  if (error) throw error;
  return data[0];
}

export async function updateBlogPost(id, updates) {
  const { data, error } = await supabase.from('blog_posts').update(updates).eq('id', id).select();
  if (error) throw error;
  return data[0];
}

export async function deleteBlogPost(id) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// Orders
export async function createOrder(orderData) {
  const { data, error } = await supabase.from('orders').insert([orderData]).select();
  if (error) throw error;
  return data[0];
}

export async function getOrders() {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

