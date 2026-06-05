import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM projects';
  const params = [];
  const conditions = [];

  if (search) {
    conditions.push('(title LIKE ? OR description LIKE ? OR author_name LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  const projects = db.prepare(query).all(...params);
  res.json(projects.map(p => ({ ...p, tech_stack: JSON.parse(p.tech_stack || '[]') })));
});

router.get('/:id', (req, res) => {
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ ...project, tech_stack: JSON.parse(project.tech_stack || '[]') });
});

export default router;
