import express from 'express';
import { PrismaClient } from '@prisma/client';
import { faker } from "@faker-js/faker";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/register', async (req, res) => {
  const { password, email } = req.body;
  console.log(password,email)
  try {
    // const user = await prisma.users.create({
    //   data: { username, email },
    // });
    // res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/users', async (req, res) => {
    try {
      const users = await prisma.users.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.users.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.post('/api/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const newUser = await prisma.users.create({
        data: { username, email, password },
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: { username, email, password },
      });
  
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.users.delete({
        where: { id: parseInt(id) },
      });
  
      res.json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  