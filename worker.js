CREATE TABLE IF NOT EXISTS visitors (
    id          BIGSERIAL PRIMARY KEY,
    page        TEXT,
    ip          TEXT,
    visited_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_visitors_date ON visitors(visited_at DESC);