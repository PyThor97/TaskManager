CREATE TABLE users_taskM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    uname VARCHAR(100) NOT NULL,
    passwd VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE categories_taskM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_taskM(id)
);

CREATE TABLE tasks_taskM (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT,
    description VARCHAR(200) NOT NULL,
    due_date DATE NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users_taskM(id),
    FOREIGN KEY (category_id) REFERENCES categories_taskM(id)
);
