-- Insert Sample Data for Books
INSERT INTO books (title, author, published_year, stock, isbn) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 5, '9780743273565'),
('To Kill a Mockingbird', 'Harper Lee', 1960, 3, '9780446310789'),
('1984', 'George Orwell', 1949, 4, '9780451524935'),
('Pride and Prejudice', 'Jane Austen', 1813, 6, '9780141439518'),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 3, '9780316769488'),
('The Hobbit', 'J.R.R. Tolkien', 1937, 7, '9780547928227'),
('The Da Vinci Code', 'Dan Brown', 2003, 4, '9780307474278'),
('The Alchemist', 'Paulo Coelho', 1988, 5, '9780062315007'),
('The Little Prince', 'Antoine de Saint-Exupéry', 1943, 8, '9780156012195'),
('Brave New World', 'Aldous Huxley', 1932, 4, '9780060850524'),
('The Lord of the Rings', 'J.R.R. Tolkien', 1954, 6, '9780618640157'),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 1997, 7, '9780590353427'),
('The Chronicles of Narnia', 'C.S. Lewis', 1950, 5, '9780066238501'),
('One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 3, '9780060883287'),
('The Hunger Games', 'Suzanne Collins', 2008, 6, '9780439023481'),
('The Road', 'Cormac McCarthy', 2006, 4, '9780307387899'),
('The Kite Runner', 'Khaled Hosseini', 2003, 5, '9781594631931'),
('The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 4, '9780307949486'),
('The Book Thief', 'Markus Zusak', 2005, 6, '9780375842207'),
('Life of Pi', 'Yann Martel', 2001, 5, '9780156027328');

-- Insert Sample Data for Members
INSERT INTO members (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '081234567890', '123 Main St, City'),
('Jane Smith', 'jane.smith@email.com', '081234567891', '456 Oak Ave, Town'),
('Robert Johnson', 'robert.j@email.com', '081234567892', '789 Pine Rd, Village'),
('Mary Williams', 'mary.w@email.com', '081234567893', '321 Elm St, Borough'),
('Michael Brown', 'michael.b@email.com', '081234567894', '654 Maple Dr, District'),
('Sarah Davis', 'sarah.d@email.com', '081234567895', '987 Cedar Ln, County'),
('James Wilson', 'james.w@email.com', '081234567896', '147 Birch Ave, State'),
('Emily Taylor', 'emily.t@email.com', '081234567897', '258 Spruce St, Province'),
('David Anderson', 'david.a@email.com', '081234567898', '369 Ash Rd, Territory'),
('Lisa Thomas', 'lisa.t@email.com', '081234567899', '741 Walnut Ct, Region'),
('Kevin Martin', 'kevin.m@email.com', '081234567800', '852 Cherry Ln, Area'),
('Jennifer White', 'jennifer.w@email.com', '081234567801', '963 Palm Ave, Zone'),
('Christopher Lee', 'chris.l@email.com', '081234567802', '159 Beach Rd, Sector'),
('Amanda Clark', 'amanda.c@email.com', '081234567803', '357 Coast St, District'),
('Daniel Martinez', 'daniel.m@email.com', '081234567804', '468 River Dr, County'),
('Michelle Garcia', 'michelle.g@email.com', '081234567805', '789 Lake Ave, State'),
('Andrew Robinson', 'andrew.r@email.com', '081234567806', '951 Ocean Blvd, Province'),
('Patricia Rodriguez', 'patricia.r@email.com', '081234567807', '753 Bay St, Territory'),
('Joseph Hall', 'joseph.h@email.com', '081234567808', '246 Harbor Rd, Region'),
('Nicole King', 'nicole.k@email.com', '081234567809', '135 Port Ave, Area');

-- Insert Sample Data for Borrowings
 INSERT INTO borrowings (book_id, member_id, borrow_date, return_date, status)
 SELECT 
    b.id, 
    m.id, 
    d.borrow_date, 
    d.return_date, 
    d.status
 FROM (
    VALUES
        (1, 1, '2024-11-21'::DATE, '2024-11-28'::DATE, 'RETURNED'),
        (3, 3, '2024-11-23'::DATE, '2024-11-30'::DATE, 'RETURNED'),
        (4, 4, '2024-11-24'::DATE, NULL, 'BORROWED'),
        (5, 5, '2024-11-25'::DATE, NULL, 'BORROWED'),
        (2, 2, '2024-11-22'::DATE, '2024-11-29', 'RETURNED'),
        (6, 6, '2024-11-26'::DATE, '2024-12-03'::DATE, 'RETURNED'),
        (7, 7, '2024-11-27'::DATE, NULL, 'BORROWED'),
        (8, 8, '2024-11-28'::DATE, '2024-12-05'::DATE, 'RETURNED'),
        (9, 9, '2024-11-29'::DATE, NULL, 'BORROWED'),
        (10, 10, '2024-11-30'::DATE, '2024-12-07'::DATE, 'RETURNED'),
        (11, 11, '2024-12-01'::DATE, NULL, 'BORROWED'),
        (12, 12, '2024-12-02'::DATE, '2024-12-09'::DATE, 'RETURNED'),
        (13, 13, '2024-12-03'::DATE, NULL, 'BORROWED'),
        (14, 14, '2024-12-04'::DATE, '2024-12-11'::DATE, 'RETURNED'),
        (15, 15, '2024-12-05'::DATE, NULL, 'BORROWED'),
        (16, 16, '2024-12-06'::DATE, '2024-12-13'::DATE, 'RETURNED'),
        (17, 17, '2024-12-07'::DATE, NULL, 'BORROWED'),
        (18, 18, '2024-12-08'::DATE, NULL, 'BORROWED'),
        (19, 19, '2024-12-09'::DATE, NULL, 'BORROWED'),
        (20, 20, '2024-12-10'::DATE, '2024-12-17'::DATE, 'RETURNED')
 ) AS d(book_rn, member_rn, borrow_date, return_date, status)
 JOIN (SELECT id, ROW_NUMBER() OVER () AS rn FROM books) b ON b.rn = d.book_rn
 JOIN (SELECT id, ROW_NUMBER() OVER () AS rn FROM members) m ON m.rn = d.member_rn