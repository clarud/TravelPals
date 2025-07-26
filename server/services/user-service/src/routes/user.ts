import { Router } from "express";
import supabase from "../supabase/client";

const router = Router();

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('user_profiles').select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
} 
);

export default router