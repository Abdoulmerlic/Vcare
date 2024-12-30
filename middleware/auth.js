const supabase = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY } = process.env;

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabaseClient.auth.api.getUser(token);
  if (error || !data) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = data;
  next();
};

module.exports = authMiddleware;