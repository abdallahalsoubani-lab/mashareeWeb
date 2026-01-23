import express from 'express';
import pool from '../config/database.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        p.id,
        p.title,
        p.description,
        p.category,
        p.image_url,
        p.target_amount,
        p.collected_amount,
        p.start_date,
        p.end_date,
        p.duration_months,
        p.return_percentage,
        p.location,
        p.status,
        p.created_at,
        u.username as created_by_name
      FROM projects p
      LEFT JOIN users u ON p.created_by = u.id
      ORDER BY p.created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT
        p.*,
        u.username as created_by_name
      FROM projects p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create project (Admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      targetAmount,
      durationMonths,
      returnPercentage,
      location
    } = req.body;

    // Validate required fields
    if (!title || !targetAmount) {
      return res.status(400).json({ message: 'Title and target amount are required' });
    }

    const result = await pool.query(
      `INSERT INTO projects
        (title, description, category, image_url, target_amount, duration_months, return_percentage, location, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [title, description || '', category || '', imageUrl || '', targetAmount, durationMonths || 0, returnPercentage || 0, location || '', req.userId]
    );

    res.status(201).json({
      message: 'Project created successfully',
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update project (Admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      imageUrl,
      targetAmount,
      collectedAmount,
      durationMonths,
      returnPercentage,
      location,
      status
    } = req.body;

    const result = await pool.query(
      `UPDATE projects
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           category = COALESCE($3, category),
           image_url = COALESCE($4, image_url),
           target_amount = COALESCE($5, target_amount),
           collected_amount = COALESCE($6, collected_amount),
           duration_months = COALESCE($7, duration_months),
           return_percentage = COALESCE($8, return_percentage),
           location = COALESCE($9, location),
           status = COALESCE($10, status),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11
       RETURNING *`,
      [title, description, category, imageUrl, targetAmount, collectedAmount, durationMonths, returnPercentage, location, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      message: 'Project updated successfully',
      project: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete project (Admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
