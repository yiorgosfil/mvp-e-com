CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    category_id INT REFERENCES categories (category_id)
);
