import express from 'express';
import db, { dbAll, dbGet, dbRun } from '../config/database.js';

const router = express.Router();

// 获取所有标签
router.get('/', async (req, res) => {
  try {
    const tags = await dbAll(`
      SELECT
        t.*,
        COUNT(at.article_id) as article_count
      FROM tags t
      LEFT JOIN article_tags at ON t.id = at.tag_id
      GROUP BY t.id
      ORDER BY t.name
    `);

    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// 获取单个标签
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const tag = await dbGet(`
      SELECT
        t.*,
        COUNT(at.article_id) as article_count
      FROM tags t
      LEFT JOIN article_tags at ON t.id = at.tag_id
      WHERE t.slug = ?
      GROUP BY t.id
    `, [slug]);

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

// 创建标签
router.post('/', async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    // 检查 slug 是否已存在
    const existing = await dbGet('SELECT id FROM tags WHERE slug = ?', [slug]);
    if (existing) {
      return res.status(409).json({ error: 'Tag with this slug already exists' });
    }

    const result = await dbRun('INSERT INTO tags (name, slug) VALUES (?, ?)', [name, slug]);

    res.status(201).json({ id: result.id, message: 'Tag created successfully' });
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// 删除标签
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 检查标签是否存在
    const existing = await dbGet('SELECT id FROM tags WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // 删除标签（文章标签关联会自动删除）
    await dbRun('DELETE FROM tags WHERE id = ?', [id]);

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

export default router;
