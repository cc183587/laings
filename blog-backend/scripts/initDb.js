import db from '../config/database.js';

// 初始化数据库表
async function initDatabase() {
  console.log('📝 Initializing database...');

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 创建文章表
      db.run(`
        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          excerpt TEXT,
          content TEXT NOT NULL,
          cover_image TEXT,
          author TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          views INTEGER DEFAULT 0
        )
      `, (err) => {
        if (err) {
          console.error('Error creating articles table:', err);
          reject(err);
          return;
        }
        console.log('✅ Articles table created');

        // 创建标签表
        db.run(`
          CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            slug TEXT NOT NULL UNIQUE
          )
        `, (err) => {
          if (err) {
            console.error('Error creating tags table:', err);
            reject(err);
            return;
          }
          console.log('✅ Tags table created');

          // 创建文章标签关联表
          db.run(`
            CREATE TABLE IF NOT EXISTS article_tags (
              article_id INTEGER NOT NULL,
              tag_id INTEGER NOT NULL,
              PRIMARY KEY (article_id, tag_id),
              FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
              FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
            )
          `, (err) => {
            if (err) {
              console.error('Error creating article_tags table:', err);
              reject(err);
              return;
            }
            console.log('✅ Article_tags table created');

            // 创建索引
            db.run(`CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_articles_tags ON article_tags(article_id)`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_tags_articles ON article_tags(tag_id)`);

            console.log('✅ Database initialized successfully');
            console.log(`📍 Database location: ${db.name}`);
            resolve();
          });
        });
      });
    });
  });
}

// 如果直接运行此脚本
initDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default initDatabase;
