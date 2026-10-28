CREATE TABLE public.faculty (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 degree text NOT NULL DEFAULT 'Titulação a confirmar',
 area text NOT NULL DEFAULT 'Área a confirmar',
 department text NOT NULL DEFAULT 'Unisa',
 bio text NOT NULL DEFAULT '',
 keywords text[] NOT NULL DEFAULT '{}',
 lattes_id text,
 lattes_updated_at date,
 published boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faculty TO anon, authenticated;
GRANT ALL ON public.faculty TO service_role;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published faculty are public" ON public.faculty FOR SELECT TO anon, authenticated USING (published = true);
CREATE INDEX faculty_published_idx ON public.faculty(published);
COMMENT ON TABLE public.faculty IS 'Curated institutional faculty catalogue. Writes restricted to institutional service operators; public readers only access published records.';