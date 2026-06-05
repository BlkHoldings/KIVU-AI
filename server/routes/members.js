import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/', (req, res) => {
  const { search, role } = req.query;
  let query = 'SELECT * FROM members';
  const params = [];
  const conditions = [];

  if (search) {
    conditions.push('(name LIKE ? OR bio LIKE ? OR location LIKE ? OR skills LIKE ?)');
    const like = `%${search}%`;
    params.push(like, like, like, like);
  }

  if (role) {
    conditions.push('role = ?');
    params.push(role);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY created_at DESC';

  const members = db.prepare(query).all(...params);
  res.json(members.map(m => ({ ...m, skills: JSON.parse(m.skills || '[]') })));
});

router.get('/:id', (req, res) => {
  const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json({ ...member, skills: JSON.parse(member.skills || '[]') });
});

export default router;
