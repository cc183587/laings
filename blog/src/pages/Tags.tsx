import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Tag as TagIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Article, Tag } from '../types/blog';
import { tagApi, articleApi } from '../services/api';

export default function Tags() {
  const [searchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [tagsData] = await Promise.all([
          tagApi.getAll(),
        ]);
        setTags(tagsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tags');
        console.error('Error fetching tags:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchArticlesByTag() {
      if (selectedTag) {
        try {
          setLoading(true);
          const articlesData = await articleApi.getAll({ tag: selectedTag });
          setFilteredArticles(articlesData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load articles');
          console.error('Error fetching articles by tag:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setFilteredArticles([]);
      }
    }

    fetchArticlesByTag();
  }, [selectedTag]);

  if (loading && !selectedTag) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (error && !selectedTag) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            加载失败
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{error}</p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            请确保后端服务器正在运行 (http://localhost:3001)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              我的博客
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                文章列表
              </Link>
              <Link to="/tags" className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors">
                标签分类
              </Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                关于
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TagIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">
                {selectedTag ? `标签: ${selectedTag}` : '标签分类'}
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {selectedTag
                ? `找到 ${filteredArticles.length} 篇相关文章`
                : '通过标签探索不同的文章主题'}
            </p>
          </div>

          {/* Tags Grid */}
          {!selectedTag && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-3 justify-center">
                {tags.map((tag) => (
                  <Link key={tag.id} to={`/tags?tag=${encodeURIComponent(tag.slug)}`}>
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-base hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer"
                    >
                      <span className="mr-2">{tag.name}</span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-xs">
                        {tag.article_count}
                      </span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Button (when tag is selected) */}
          {selectedTag && (
            <div className="mb-6">
              <Link to="/tags">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回所有标签
                </Button>
              </Link>
            </div>
          )}

          {/* Articles for Selected Tag */}
          {selectedTag && loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">加载中...</p>
            </div>
          )}

          {selectedTag && !loading && filteredArticles.length > 0 && (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Link to={`/article/${article.slug}`} key={article.id}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-200 dark:border-slate-800">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.map((tag, index) => (
                          <Badge
                            key={tag}
                            variant={article.tag_slugs[index] === selectedTag ? "default" : "secondary"}
                            className={article.tag_slugs[index] === selectedTag
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-800 dark:group-hover:text-blue-200"
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-2">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>{article.views} 次阅读</span>
                        </div>
                        <div className="flex items-center gap-1 ml-auto text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>阅读全文</span>
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* No Articles Found */}
          {selectedTag && filteredArticles.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  没有找到标签为 "{selectedTag}" 的文章
                </p>
                <Link to="/tags">
                  <Button variant="outline">
                    查看所有标签
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© 2026 我的博客. 保留所有权利。</p>
        </div>
      </footer>
    </div>
  );
}
