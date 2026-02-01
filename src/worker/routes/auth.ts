import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const auth = new Hono<{ Bindings: Env }>();

const signupSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(6),
});

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

// Signup endpoint
auth.post('/signup', zValidator('json', signupSchema), async (c) => {
  const { email, fullName, username, password } = c.req.valid('json');

  try {
    // Check if username or email already exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE username = ? OR email = ?'
    )
      .bind(username, email)
      .first();

    if (existing) {
      return c.json({ error: 'Username or email already exists' }, 400);
    }

    // Insert new user
    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, full_name, username, password) VALUES (?, ?, ?, ?)'
    )
      .bind(email, fullName, username, password)
      .run();

    return c.json({
      success: true,
      userId: result.meta.last_row_id,
      username,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

// Login endpoint
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { username, password } = c.req.valid('json');

  try {
    // Find user by username or email
    const user = await c.env.DB.prepare(
      'SELECT id, username, email, full_name, password FROM users WHERE username = ? OR email = ?'
    )
      .bind(username, username)
      .first();

    if (!user) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    // Check password
    if (user.password !== password) {
      return c.json({ error: 'Invalid username or password' }, 401);
    }

    return c.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Failed to login' }, 500);
  }
});

export default auth;
