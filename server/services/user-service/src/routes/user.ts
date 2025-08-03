import { Router } from "express";
import supabase from "../supabase/client";

const router = Router();

router.get('/', async (req, res) => {
  const user = (req as any).user;
  const userId = user.id;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
} 
);

export default router