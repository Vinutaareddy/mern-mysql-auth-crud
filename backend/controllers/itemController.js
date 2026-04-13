import db from "../config/db.js";

export const getItems = async (req, res) => {
  const [items] = await db.query(
    "SELECT * FROM items WHERE user_id=?",
    [req.user.id]
  );
  res.json(items);
};

export const addItem = async (req, res) => {
  const { title, description, status } = req.body;

  await db.query(
    "INSERT INTO items (user_id, title, description, status) VALUES (?, ?, ?, ?)",
    [req.user.id, title, description, status]
  );

  res.json({ msg: "Added" });
};

export const updateItem = async (req, res) => {
  const { title, description, status } = req.body;

  await db.query(
    "UPDATE items SET title=?, description=?, status=? WHERE id=? AND user_id=?",
    [title, description, status, req.params.id, req.user.id]
  );

  res.json({ msg: "Updated" });
};

export const deleteItem = async (req, res) => {
  await db.query(
    "DELETE FROM items WHERE id=? AND user_id=?",
    [req.params.id, req.user.id]
  );

  res.json({ msg: "Deleted" });
};

export const stats = async (req, res) => {
  const [rows] = await db.query(
    `SELECT 
      COUNT(*) AS total,
      COALESCE(SUM(status='active'), 0) AS active,
      COALESCE(SUM(status='pending'), 0) AS pending,
      COALESCE(SUM(status='completed'), 0) AS completed
     FROM items 
     WHERE user_id=?`,
    [req.user.id]
  );
  res.json(rows[0]);
};