import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {
  createNote,
  createTag,
  deleteNote,
  deleteTag,
  getNotes,
  updateNoteContent,
  updateTagContent
} from "./dao";
import { CreateReqBody, DeleteReqBody, UpdateReqBody } from "./types/types";

dotenv.config();
const app = express();
app.use(express.json());

// TODO?: Separate into routes folder

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Express + Typescript server");
});

app.get("/test", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Testing content" });
});


app.get("/notes", async (req: Request, res: Response) => {
  const areActive: boolean = req.query.areActive === 'true';
  console.debug("areActive", areActive)
  const notes = await getNotes(areActive);
  res.status(200).send(notes);
});

app.post("/update-tag-content", async (req: Request<{}, {}, UpdateReqBody>, res: Response) => {
  const { id, newContent } = req.body;
  if (!id) return res.status(400).send("Query parameter tagId is missing in Request");
  if (newContent === null || newContent === undefined)
    return res.status(400).send("Query parameter newContent is missing in Request");
  if (Number.isNaN(id)) return res.status(400).send("Query parameter noteId has to be a number");
  try {
    await updateTagContent(id, newContent);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

app.post("/update-note-content", async (req: Request<{}, {}, UpdateReqBody>, res: Response) => {
  const { id, newContent } = req.body;
  if (!id) return res.status(400).send("Query parameter noteId is missing in Request");
  if (!newContent) return res.status(400).send("Query parameter newContent is missing in Request");
  if (Number.isNaN(id)) return res.status(400).send("Query parameter noteId has to be a number");
  try {
    await updateNoteContent(id, newContent);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

app.post("/create-note", async (req: Request, res: Response) => {
  try {
    const newNoteId = await createNote();
    res.status(201).json({ newNoteId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

app.post("/create-tag", async (req: Request<{}, {}, CreateReqBody>, res: Response) => {
  const { noteId } = req.body;
  try {
    const newTagId = await createTag(noteId);
    res.status(201).json({ newTagId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

app.delete("/delete-note", async (req: Request<{}, {}, DeleteReqBody>, res: Response) => {
  const { id } = req.body;
  try {
    await deleteNote(id);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

app.delete("/delete-tag", async (req: Request<{}, {}, DeleteReqBody>, res: Response) => {
  const { id } = req.body;
  try {
    await deleteTag(id);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send(error);
    }
  }
});

const port = process.env.BACKEND_PORT || 3333;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
