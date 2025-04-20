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
);

//app route
app.post("/register-user", async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.query;

  console.log("name and email", name, email);

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  try {
    const userId = (email as string).replace(/[^a-zA-Z0-9]/g, "_");
    //check if user already exists
    const userResponse = await chatClient.queryUsers({ id: { $eq: userId } });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
