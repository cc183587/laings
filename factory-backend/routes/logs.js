import { Router } from 'express';
import { getDb } from '../config/database.js';

const router = Router({ mergeParams: true });
// 路由前缀：/api/companies/:company/logs

// ── 查看记录（登录时间 + 产量金额）────────────────────────────
// GET ?date=2026-04-21&empId=A001
router.get('/', (req, res) => {
  const { company } = req.params;
  const { date, empId } = req.query;
  const db = getDb();

  // 确保表存在
  try {
    db.exec(`CREATE TABLE IF NOT EXISTS login_sessions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      company_code TEXT NOT NULL,
      emp_id       TEXT,
      emp_name     TEXT,
      role         TEXT NOT NULL,
      ip           TEXT,
      created_at   TEXT DEFAULT (datetime('now', 'localtime'))
    )`);
  } catch(e) {}

  // 1. 登录记录（只取员工登录，排除管理员）
  let loginsSql = `SELECT id, emp_id AS empId, emp_name AS empName, role, ip,
                    created_at AS time, 0 AS amount, 'login' AS type
                   FROM login_sessions WHERE company_code=? AND role='employee'`;
  const loginsParams = [company];

  if (date)   { loginsSql += ` AND date(created_at)=date(?)`;   loginsParams.push(date); }
  if (empId)  { loginsSql += ` AND emp_id=?`;                     loginsParams.push(empId); }

  const logins = db.prepare(loginsSql).all(...loginsParams);

  // 2. 产量记录（按 reg_id 分组，每条登记算一行，显示合计金额）
  let recordsSql = `
    SELECT r.reg_id, r.emp_id AS empId, e.name AS empName,
           r.date, r.time, r.prod_key AS prodKey,
           r.batch_code AS batchCode,
           SUM(r.qty * r.price) AS amount,
           GROUP_CONCAT(r.process_name || '(' || r.qty || ')', ', ') AS processDetail,
           'record' AS type
    FROM records r
    LEFT JOIN employees e ON e.id = r.emp_id AND e.company_code = r.company_code
    WHERE r.company_code=?
  `;
  const recParams = [company];

  if (date)   { recordsSql += ` AND date(r.date)=date(?)`; recParams.push(date); }
  if (empId)  { recordsSql += ` AND r.emp_id=?`;               recParams.push(empId); }

  recordsSql += ` GROUP BY r.reg_id ORDER BY r.date DESC, r.reg_id DESC`;

  const records = db.prepare(recordsSql).all(...recParams);

  // 合并并按时间排序
  const all = [...logins.map(l => ({
    ...l,
    _sortKey: l.time
  }))].concat(records.map(r => ({
    ...r,
    _sortKey: (r.date || '') + ' ' + (r.time || '')
  })));

  all.sort((a, b) => b._sortKey.localeCompare(a._sortKey));

  res.json({ list: all });
});

export default router;
