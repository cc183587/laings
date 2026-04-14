/**
 * 库存管理路由 - 独立物品库存系统
 */
const express = require('express');
const router = express.Router({ mergeParams: true });

// 获取所有库存物品
router.get('/items', (req, res) => {
  const { company } = req.params;
  const db = req.db;
  
  try {
    const items = db.prepare(`
      SELECT * FROM stock_items 
      WHERE company = ? 
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
  const db = req.db;
  const { name, category, unit, remark } = req.body;
  
  if (!name || !unit) {
    return res.status(400).json({ error: '物品名称和单位不能为空' });
  }
  
  try {
    const result = db.prepare(`
      INSERT INTO stock_items (company, name, category, unit, quantity, remark)
      VALUES (?, ?, ?, ?, 0, ?)
    `).run(company, name, category || '其他', unit, remark || '');
    
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
  const db = req.db;
  const { name, category, unit, remark } = req.body;
  
  try {
    db.prepare(`
      UPDATE stock_items 
      SET name = ?, category = ?, unit = ?, remark = ?
      WHERE id = ? AND company = ?
    `).run(name, category, unit, remark || '', id, company);
    
    res.json({ message: '物品更新成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 删除物品
router.delete('/items/:id', (req, res) => {
  const { company, id } = req.params;
  const db = req.db;
  
  try {
    // 先删除相关日志
    db.prepare(`DELETE FROM stock_logs WHERE item_id = ?`).run(id);
    // 再删除物品
    db.prepare(`DELETE FROM stock_items WHERE id = ? AND company = ?`).run(id, company);
    
    res.json({ message: '物品删除成功' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 出入库操作
router.post('/items/:id/log', (req, res) => {
  const { company, id } = req.params;
  const db = req.db;
  const { type, qty, remark } = req.body;
  
  if (!type || !qty || qty <= 0) {
    return res.status(400).json({ error: '类型和数量不能为空' });
  }
  
  try {
    // 获取当前库存
    const item = db.prepare(`SELECT * FROM stock_items WHERE id = ? AND company = ?`).get(id, company);
    if (!item) {
      return res.status(404).json({ error: '物品不存在' });
    }
    
    // 出库时检查库存
    if (type === 'out' && item.quantity < qty) {
      return res.status(400).json({ error: `库存不足，当前库存: ${item.quantity}${item.unit}` });
    }
    
    // 更新库存
    const newQty = type === 'in' ? item.quantity + qty : item.quantity - qty;
    db.prepare(`UPDATE stock_items SET quantity = ? WHERE id = ?`).run(newQty, id);
    
    // 记录日志
    db.prepare(`
      INSERT INTO stock_logs (item_id, type, qty, unit, remark, log_time)
      VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `).run(id, type, qty, item.unit, remark || '');
    
    res.json({ 
      message: type === 'in' ? '入库成功' : '出库成功',
      newQuantity: newQty
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 获取物品日志
router.get('/items/:id/logs', (req, res) => {
  const { id } = req.params;
  const db = req.db;
  const limit = req.query.limit || 100;
  
  try {
    const logs = db.prepare(`
      SELECT * FROM stock_logs 
      WHERE item_id = ? 
      ORDER BY log_time DESC 
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
  const db = req.db;
  const { item_id, type, date } = req.query;
  
  try {
    let sql = `
      SELECT l.*, i.name as item_name, i.category
      FROM stock_logs l
      JOIN stock_items i ON l.item_id = i.id
      WHERE i.company = ?
    `;
    const params = [company];
    
    if (item_id) {
      sql += ` AND l.item_id = ?`;
      params.push(item_id);
    }
    if (type) {
      sql += ` AND l.type = ?`;
      params.push(type);
    }
    if (date) {
      sql += ` AND date(l.log_time) = ?`;
      params.push(date);
    }
    
    sql += ` ORDER BY l.log_time DESC LIMIT 500`;
    
    const logs = db.prepare(sql).all(...params);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
