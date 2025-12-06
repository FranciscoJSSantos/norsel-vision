// Types baseados nos schemas da API do blog

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: "draft" | "published" | "archived";
  category_id?: number;
  author_id: number;
  views: number;
  reading_time?: number;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface PostDetail extends Post {
  author: User;
  category?: Category;
  tags: Tag[];
}

export interface PostCreate {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status?: "draft" | "published" | "archived";
  category_id?: number;
  author_id: number;
  reading_time?: number;
  seo_title?: string;
  seo_description?: string;
  tag_ids?: number[];
}

export interface PostUpdate {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  status?: "draft" | "published" | "archived";
  category_id?: number;
  reading_time?: number;
  seo_title?: string;
  seo_description?: string;
  tag_ids?: number[];
}

export interface Comment {
  id: number;
  post_id: number;
  author_name: string;
  author_email: string;
  content: string;
  status: "pending" | "approved" | "spam";
  created_at: string;
}

export interface PostFilters {
  status?: string;
  category_id?: number;
  author_id?: number;
  search?: string;
  skip?: number;
  limit?: number;
}
