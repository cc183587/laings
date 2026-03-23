const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

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

// API 错误类
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 通用 fetch 封装
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(response.status, error.error || error.message || 'Request failed');
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error or server unavailable');
  }
}

// 文章相关 API
export const articleApi = {
  // 获取所有文章
  getAll: async (params?: { tag?: string; search?: string; limit?: number; offset?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const endpoint = `/api/articles${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchAPI<Article[]>(endpoint);
  },

  // 根据 slug 获取文章
  getBySlug: async (slug: string) => {
    return fetchAPI<Article>(`/api/articles/${slug}`);
  },

  // 创建文章
  create: async (data: Partial<Article>) => {
    return fetchAPI<{ id: number; message: string }>('/api/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 更新文章
  update: async (id: number, data: Partial<Article>) => {
    return fetchAPI<{ message: string }>(`/api/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // 删除文章
  delete: async (id: number) => {
    return fetchAPI<{ message: string }>(`/api/articles/${id}`, {
      method: 'DELETE',
    });
  },

  // 获取统计信息
  getStats: async () => {
    return fetchAPI<{ total_articles: number; total_views: number; total_tags: number; popular_articles: Article[] }>('/api/articles/stats/overview');
  },
};

// 标签相关 API
export const tagApi = {
  // 获取所有标签
  getAll: async () => {
    return fetchAPI<Tag[]>('/api/tags');
  },

  // 根据 slug 获取标签
  getBySlug: async (slug: string) => {
    return fetchAPI<Tag>(`/api/tags/${slug}`);
  },

  // 创建标签
  create: async (data: { name: string; slug: string }) => {
    return fetchAPI<{ id: number; message: string }>('/api/tags', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // 删除标签
  delete: async (id: number) => {
    return fetchAPI<{ message: string }>(`/api/tags/${id}`, {
      method: 'DELETE',
    });
  },
};
