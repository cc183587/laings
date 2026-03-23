import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Mail, Heart, Code, BookOpen, Coffee } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function About() {
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
              <Link to="/about" className="text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors">
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
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              关于我
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              了解更多关于博主和这个博客的故事
            </p>
          </div>

          {/* Profile Card */}
          <Card className="mb-8 border-slate-200 dark:border-slate-800">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  博
                </div>

                {/* Bio */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    欢迎来到我的博客！
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 text-lg mb-4">
                    我是一名热爱技术的开发者，喜欢分享自己的学习和经验。这个博客是我记录思考、总结知识的地方。
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      Vue.js
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      Python
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="mailto:example@email.com"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interest Sections */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    编程开发
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    热爱探索新技术，专注于前端开发和用户体验设计
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    学习成长
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    持续学习，分享知识，与社区共同成长
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <Coffee className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    生活分享
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    工作之余，分享生活点滴和有趣见解
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About This Blog */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                关于这个博客
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                这个博客是使用以下技术栈构建的：
              </p>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  React 19 - 用户界面框架
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  TypeScript - 类型安全的 JavaScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Vite - 快速的构建工具
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Tailwind CSS - 实用优先的 CSS 框架
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  shadcn/ui - 精美的 UI 组件库
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  React Markdown - Markdown 渲染支持
                </li>
              </ul>
              <Separator className="mb-6" />
              <p className="text-slate-600 dark:text-slate-400 text-center flex items-center justify-center gap-2">
                用 <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 构建于 2026
              </p>
            </CardContent>
          </Card>
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
