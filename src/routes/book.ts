import Joi from "joi";
import express from "express";
const router = express.Router();

// postgresql client
import { pool } from "../db/postgresql/index.js"


// user schema definition
const bookSchema = Joi.object({
  name: Joi.string().required()
})


/**
 * List of Books
 * GET /books
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from Books order by name asc");
    if (!result.rowCount) {
      return res.status(200).json({ message: "No books found in the database" })
    }

    const bookData = result.rows;

    res.status(200).json(bookData)
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})

/**
 * List specific Book
 * GET /books/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json({ message: "book id must be supplied in the route" });
    }

    const result = await pool.query("select * from Books where id = $1", [bookId]);
    if (!result.rowCount) {
      return res.status(200).json({ message: "No book found with given id" })
    }

    const bookData = result.rows[0];

    res.status(200).json(bookData)
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})

/**
 * Create a new Book
 * POST /books
 */
router.post("/", async (req, res) => {
  try {
    try {
      const value = await bookSchema.validateAsync(req.body);
      const result = await pool.query("insert into Books (name) values ($1)", [value.name]);

      res.status(201).json({ message: "Book was added successfuly" })
    } catch (err) {
      throw err;
    }
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})


export default router;