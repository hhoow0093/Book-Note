CREATE TABLE themes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(193)
);

CREATE TABLE stories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT,
    theme_id INTEGER NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO themes (title, description) VALUES
('Adventure', 'Stories filled with exploration, danger, and excitement.'),
('Romance', 'Heartwarming tales of love and relationships.'),
('Mystery', 'Stories involving puzzles, secrets, and investigations.'),
('Horror', 'Frightening tales designed to scare and thrill the reader.'),
('Fantasy', 'Stories set in magical worlds with mythical creatures.'),
('Science Fiction', 'Futuristic tales involving advanced technology or space travel.'),
('Historical', 'Stories set in the past, inspired by real events or eras.');