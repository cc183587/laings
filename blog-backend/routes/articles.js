import express from 'express';
import db, { dbAll, dbGet, dbRun } from '../config/database.js';

const router = express.Router();

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    const { tag, search, limit = 20, offset = 0 } = req.query;

    let query = `
      SELECT
        a.*,
        GROUP_CONCAT(t.name, ',') as tags,
        GROUP_CONCAT(t.slug, ',') as tag_slugs
      FROM articles a
      LEFT JOIN article_tags at ON a.id = at.article_id
      LEFT JOIN tags t ON at.tag_id = t.id
    `;

    const params = [];
    const conditions = [];

    // 标签筛选
    if (tag) {
      conditions.push('t.slug = ?');
      params.push(tag);
    }

    // 搜索
    if (search) {
      conditions.push('(a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += `
      GROUP BY a.id
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;

    params.push(parseInt(limit), parseInt(offset));

    const articles = await dbAll(query, params);

    // 转换标签为数组
    const articlesWithTags = articles.map(article => ({
      ...article,
      tags: article.tags ? article.tags.split(',') : [],
      tag_slugs: article.tag_slugs ? article.tag_slugs.split(',') : []
    }));

    res.json(articlesWithTags);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// 获取单篇文章
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await dbGet(`
      SELECT
        a.*,
        GROUP_CONCAT(t.name, ',') as tags,
        GROUP_CONCAT(t.slug, ',') as tag_slugs
      FROM articles a
      LEFT JOIN article_tags at ON a.id = at.article_id
      LEFT JOIN tags t ON at.tag_id = t.id
      WHERE a.slug = ?
      GROUP BY a.id
    `, [slug]);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // 增加阅读量
    await dbRun('UPDATE articles SET views = views + 1 WHERE slug = ?', [slug]);

    // 转换标签为数组
    const articleWithTags = {
      ...article,
      tags: article.tags ? article.tags.split(',') : [],
      tag_slugs: article.tag_slugs ? article.tag_slugs.split(',') : []
    };

    res.json(articleWithTags);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// 创建文章
router.post('/', async (req, res) => {
  try {
    const { title, slug, excerpt, content, cover_image, author, tags } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'Title, slug, and content are required' });
    }

    // 检查 slug 是否已存在
    const existing = await dbGet('SELECT id FROM articles WHERE slug = ?', [slug]);
    if (existing) {
      return res.status(409).json({ error: 'Article with this slug already exists' });
    }

    // 插入文章
    const result = await dbRun(`
      INSERT INTO articles (title, slug, excerpt, content, cover_image, author)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [title, slug, excerpt, content, cover_image, author]);

    const articleId = result.id;

    // 关联标签
    if (tags && tags.length > 0) {
      for (const tagSlug of tags) {
        const tag = await dbGet('SELECT id FROM tags WHERE slug = ?', [tagSlug]);
        if (tag) {
          await dbRun(
            'INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)',
            [articleId, tag.id]
          );
        }
      }
    }

    res.status(201).json({ id: articleId, message: 'Article created successfully' });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, cover_image, author, tags } = req.body;

    // 检查文章是否存在
    const existing = await dbGet('SELECT id FROM articles WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // 更新文章
    await dbRun(`
      UPDATE articles
      SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, author = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, slug, excerpt, content, cover_image, author, id]);

    // 更新标签关联
    if (tags) {
      // 删除旧的关联
      await dbRun('DELETE FROM article_tags WHERE article_id = ?', [id]);

      // 添加新的关联
      for (const tagSlug of tags) {
        const tag = await dbGet('SELECT id FROM tags WHERE slug = ?', [tagSlug]);
        if (tag) {
          await dbRun(
            'INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)',
            [id, tag.id]
          );
        }
      }
    }

    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 检查文章是否存在
    const existing = await dbGet('SELECT id FROM articles WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // 删除文章（文章标签关联会自动删除，因为有外键约束）
    await dbRun('DELETE FROM articles WHERE id = ?', [id]);

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// 获取文章统计
router.get('/stats/overview', async (req, res) => {
  try {
    const totalArticlesResult = await dbGet('SELECT COUNT(*) as count FROM articles');
    const totalArticles = totalArticlesResult.count;

    const totalViewsResult = await dbGet('SELECT SUM(views) as views FROM articles');
    const totalViews = totalViewsResult.views || 0;

    const totalTagsResult = await dbGet('SELECT COUNT(*) as count FROM tags');
    const totalTags = totalTagsResult.count;

    // 最受欢迎的文章
    const popularArticles = await dbAll(`
      SELECT title, slug, views
      FROM articles
      ORDER BY views DESC
      LIMIT 5
    `);

    res.json({
      total_articles: totalArticles,
      total_views: totalViews,
      total_tags: totalTags,
      popular_articles: popularArticles
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
