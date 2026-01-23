import express from 'express';
import pool from '../config/database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, first_name, last_name, role, is_admin, created_at FROM users ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID (Admin only or self)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin or requesting their own data
    if (req.userId !== parseInt(id)) {
      const adminCheck = await pool.query('SELECT is_admin FROM users WHERE id = $1', [req.userId]);
      if (!adminCheck.rows[0]?.is_admin) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
    }

    const result = await pool.query(
      'SELECT id, username, email, first_name, last_name, role, is_admin, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user investments
router.get('/:id/investments', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        i.id,
        i.amount,
        i.investment_date,
        i.status,
        p.id as project_id,
        p.title as project_title,
        p.category as project_category
      FROM investments i
      JOIN projects p ON i.project_id = p.id
      WHERE i.user_id = $1
      ORDER BY i.investment_date DESC`,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Make investment
router.post('/:id/invest', verifyToken, async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { projectId, amount } = req.body;

    // Verify user is investing in their own account or is admin
    if (req.userId !== parseInt(userId)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (!projectId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Project ID and valid amount are required' });
    }

    // Check if project exists
    const projectCheck = await pool.query('SELECT id, target_amount, collected_amount FROM projects WHERE id = $1', [projectId]);
    if (projectCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = projectCheck.rows[0];

    // Check if investment would exceed target
    if (project.collected_amount + amount > project.target_amount) {
      return res.status(400).json({
        message: 'Investment amount exceeds target',
        availableAmount: project.target_amount - project.collected_amount
      });
    }

    // Insert investment
    const result = await pool.query(
      `INSERT INTO investments (user_id, project_id, amount)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, project_id) DO UPDATE
       SET amount = investments.amount + $3, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [userId, projectId, amount]
    );

    // Update project collected amount
    await pool.query(
      'UPDATE projects SET collected_amount = collected_amount + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [amount, projectId]
    );

    res.status(201).json({
      message: 'Investment successful',
      investment: result.rows[0]
    });
  } catch (error) {
    console.error('Investment error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
