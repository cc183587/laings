/**
 * 库存管理路由 - 独立物品库存系统
 */
import express from 'express';
import { getDb } from '../config/database.js';
const router = express.Router({ mergeParams: true });

// 获取所有库存物品
router.get('/items', (req, res) => {
  const { company } = req.params;
  const db = getDb();
  
  try {
    const items = db.prepare(`
      SELECT * FROM stock_items 
      WHERE company_code = ? 
      ORDER BY category, name
    `).all(company);
    
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 新增物品
router.post('/items', (req, res) => {
  const { company } = req.params;
  const db = getDb();
  const { name, category, unit, quantity, remark } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: '物品名称不能为空' });
  }
  
  const initQty = parseInt(quantity) || 0;
  
  try {
    const result = db.prepare(`
      INSERT INTO stock_items (company_code, name, category, unit, quantity, remark)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(company, name, category || '其他', unit || 'pcs', initQty, remark || '');
    
    // 如果有初始数量，记录入库日志
    if (initQty > 0) {
      db.prepare(`
        INSERT INTO stock_logs (item_id, type, quantity, unit, remark, created_at)
        VALUES (?, 'in', ?, ?, ?, datetime('now', 'localtime'))
      `).run(result.lastInsertRowid, initQty, unit || 'pcs', '初始入库');
    }
    
    res.json({ 
      id: result.lastInsertRowid,
      message: '物品添加成功'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 编辑物品
router.put('/items/:id', (req, res) => {
  const { company, id } = req.params;
  const db = getDb();
  const { name, category, unit, remark } = req.body;
  
  try {
    db.prepare(`
      UPDATE stock_items 
      SET name = ?, category = ?, unit = ?, remark = ?
      WHERE id = ? AND company_code = ?
    `).run(name, category, unit, remark || '', id, company);
    
    res.json({ message: '物品更新成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除物品
router.delete('/items/:id', (req, res) => {
  const { company, id } = req.params;
  const db = getDb();
  
  try {
    // 先删除相关日志
    db.prepare(`DELETE FROM stock_logs WHERE item_id = ?`).run(id);
    // 再删除物品
    db.prepare(`DELETE FROM stock_items WHERE id = ? AND company_code = ?`).run(id, company);
    
    res.json({ message: '物品删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 入库操作
router.post('/items/:id/in', (req, res) => {
  const { company, id } = req.params;
  const db = getDb();
  const { quantity, remark } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: '入库数量必须大于0' });
  }

  try {
    // 获取当前库存
    const item = db.prepare(`SELECT * FROM stock_items WHERE id = ? AND company_code = ?`).get(id, company);
    if (!item) {
      return res.status(404).json({ error: '物品不存在' });
    }
    
    // 更新库存
    const newQty = item.quantity + quantity;
    db.prepare(`UPDATE stock_items SET quantity = ? WHERE id = ?`).run(newQty, id);
    
    // 记录日志
    db.prepare(`
      INSERT INTO stock_logs (item_id, type, quantity, unit, remark, created_at)
      VALUES (?, 'in', ?, ?, ?, datetime('now', 'localtime'))
    `).run(id, quantity, item.unit, remark || '');
    
    res.json({ 
      message: '入库成功',
      newQuantity: newQty
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 出库操作
router.post('/items/:id/out', (req, res) => {
  const { company, id } = req.params;
  const db = getDb();
  const { quantity, remark } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: '出库数量必须大于0' });
  }

  try {
    // 获取当前库存
    const item = db.prepare(`SELECT * FROM stock_items WHERE id = ? AND company_code = ?`).get(id, company);
    if (!item) {
      return res.status(404).json({ error: '物品不存在' });
    }
    
    // 检查库存
    if (item.quantity < quantity) {
      return res.status(400).json({ error: `库存不足，当前库存: ${item.quantity}${item.unit}` });
    }
    
    // 更新库存
    const newQty = item.quantity - quantity;
    db.prepare(`UPDATE stock_items SET quantity = ? WHERE id = ?`).run(newQty, id);
    
    // 记录日志
    db.prepare(`
      INSERT INTO stock_logs (item_id, type, quantity, unit, remark, created_at)
      VALUES (?, 'out', ?, ?, ?, datetime('now', 'localtime'))
    `).run(id, quantity, item.unit, remark || '');
    
    res.json({ 
      message: '出库成功',
      newQuantity: newQty
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取物品日志
router.get('/items/:id/logs', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const limit = req.query.limit || 100;
  
  try {
    const logs = db.prepare(`
      SELECT * FROM stock_logs 
      WHERE item_id = ? 
      ORDER BY created_at DESC 
      LIMIT ?
    `).all(id, limit);
    
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取全部日志
router.get('/logs', (req, res) => {
  const { company } = req.params;
  const db = getDb();

  try {
    const logs = db.prepare(`
      SELECT l.*, i.name as item_name, i.unit
      FROM stock_logs l
      JOIN stock_items i ON l.item_id = i.id
      WHERE i.company_code = ?
      ORDER BY l.created_at DESC 
      LIMIT 500
    `).all(company);
    
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
