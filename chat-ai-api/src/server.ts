import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StreamChat } from "stream-chat";

dotenv.config();

const app = express();

//initialize stream client
const chatClient = StreamChat.getInstance(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!
)

//app route
app.post("/", async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.query;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  return res
    .status(200)
    .json({ message: `Hello ${name}, your email is ${email}` });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
