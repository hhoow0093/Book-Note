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
('Intro to DBMS', 'Learned about databases, difference between relational and non-relational, importance of primary keys, and how tables are structured.'),
('Networking 101', 'Covered OSI model, especially physical, data link, and network layers. IP addressing basics introduced with IPv4 examples.'),
('C Programming', 'Discussed variables, loops, and functions. Wrote simple programs like calculating factorials and Fibonacci sequence using recursion.'),
('Web Basics', 'HTML structure explained. Practiced creating forms and links. CSS introduction with inline, internal, and external styles.'),
('Cybersecurity', 'Explored phishing, malware, and brute force attacks. Learned about password hashing and importance of multi-factor authentication.'),
('Data Structures', 'Focused on arrays, linked lists, and stacks. Implemented stack push/pop operations in C and discussed their time complexity.');

ALTER TABLE themes
ALTER COLUMN description TYPE VARCHAR(186);

INSERT INTO stories (title, created_at, theme_id) VALUES
('ER Models', '2025-01-15 09:00:00', 17),
('Relational Keys', '2025-01-16 10:30:00', 17),
('SQL Basics', '2025-01-17 14:00:00', 17),
('Joins Practice', '2025-01-18 08:45:00', 17),
('Normalization', '2025-01-19 13:20:00', 17),
('Indexes Intro', '2025-01-20 15:10:00', 17),
('Transactions', '2025-01-21 11:00:00', 17);