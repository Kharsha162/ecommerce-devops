import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('API Mocking Tests', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const response = await fetch('/api/products');
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data).toEqual(mockProducts);
    expect(data).toHaveLength(2);
  });

  it('should handle authentication', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'test-token', user: { id: 1, email: 'test@example.com' } }),
    });

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.token).toBe('test-token');
    expect(data.user.email).toBe('test@example.com');
  });

  it('should handle API errors', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    const response = await fetch('/api/protected');
    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);
  });

  it('should handle network errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    try {
      await fetch('/api/products');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).toBe('Network error');
    }
  });

  it('should send correct headers', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await fetch('/api/products', {
      headers: { 'Authorization': 'Bearer token' },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products',
      expect.objectContaining({
        headers: { 'Authorization': 'Bearer token' },
      })
    );
  });
});
