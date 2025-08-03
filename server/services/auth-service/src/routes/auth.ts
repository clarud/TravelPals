import { Router , Response, Request } from 'express';
import supabase from '../supabase/client';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({error: error.message});

    res.json({ message: `Account has been registered. Check your email to confirm.`, data });
});

router.post('/login', async (req: Request, res: Response) => {
    const { method, email, password, provider } = req.body;

    try {
        if (method === 'email') {
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password required' });
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            return res.status(200).json({ user: data.user, session: data.session });
        } else if (method === 'oauth') {
            if (!provider) {
                return res.status(400).json({ error: 'OAuth provider required'});
            }

            const { data, error } = await supabase.auth.signInWithOAuth({provider,});

            if (error) throw error;

            return res.status(200).json({ url: data.url });

        } else {
        return res.status(400).json({ error: 'Invalid login method' });
        }
    } catch (err) {
        if (err instanceof Error) {
            return res.status(500).json({ error: err.message || 'Auth failed' });
        }
        return res.status(500).json({ error: 'Unexpected error' });
    }

});

export default router;