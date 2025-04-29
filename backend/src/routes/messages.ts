import { Router } from 'express';
import { Message } from '../models/Message';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

let messages: Message[] = [];

router.post('/', (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ error: 'senderId, receiverId, and content are required.' });
  }

  const newMessage: Message = {
    id: uuidv4(),
    senderId,
    receiverId,
    content,
    createdAt: new Date(),
  };

  messages.push(newMessage);

  res.status(201).json(newMessage);
});

router.get('/:user1Id/:user2Id', (req, res) => {
  const { user1Id, user2Id } = req.params;

  const conversation = messages.filter(msg =>
    (msg.senderId === user1Id && msg.receiverId === user2Id) ||
    (msg.senderId === user2Id && msg.receiverId === user1Id)
  );

  res.json(conversation);
});

export default router;
