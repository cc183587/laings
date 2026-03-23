import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Article } from '../types/blog';
import { articleApi } from '../services/api';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticle() {
      if (!slug) {
        setError('Invalid article slug');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await articleApi.getBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            {error || '文章未找到'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            请确保后端服务器正在运行 (http://localhost:3001)
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('分享失败:', err);
      }
    }
  };

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
              <Link to="/tags" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>

          {/* Article Header */}
          <article className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <Link key={tag} to={`/tags?tag=${encodeURIComponent(tag)}`}>
                  <Badge variant="secondary" className="hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2">
                  <span>作者: {article.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>{article.views} 次阅读</span>
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-50">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-50">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-50">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-lg leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700 dark:text-slate-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700 dark:text-slate-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="pl-2">{children}</li>
                  ),
                  code: ({ inline, className, children }) => {
                    return inline ? (
                      <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
                        {children}
                      </code>
                    ) : (
                      <code className={className}>{children}</code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-slate-900 dark:bg-slate-950 p-4 rounded-lg overflow-x-auto mb-4 border border-slate-700">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-slate-50 dark:bg-slate-800/50 italic text-slate-700 dark:text-slate-300">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="min-w-full border border-slate-200 dark:border-slate-700">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody>{children}</tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-50">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                      {children}
                    </td>
                  ),
                  hr: () => <hr className="my-8 border-slate-200 dark:border-slate-700" />,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Share Button */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <Button onClick={handleShare} variant="outline" className="w-full sm:w-auto">
                <Share2 className="w-4 h-4 mr-2" />
                分享文章
              </Button>
            </div>
          </article>
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
