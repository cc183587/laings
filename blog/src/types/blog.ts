export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author?: string;
  created_at: string;
  updated_at: string;
  views: number;
  tags: string[];
  tag_slugs: string[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  article_count: number;
}
