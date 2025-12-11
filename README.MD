# Library Management API
Restful API untuk sistem manajemen perpustakaan dengan Express.js dengan DB PostgreSQL

## Teknologi
- Node.js = v18
- Express.js = v4
- PostgreSQL = v15
- Docker Compose = v3.8

## Cara Menjalankan API
- **Clone Repository**
    ```bash
    git clone https://github.com/GENESISASM/Lib_Management_API.git
- **Pindah Directory**
    ```bash
    cd library-management-api
- **Jalankan Docker-compose.yml**
    ```bash
    docker-compose up --build 
    atau
    docker-compose up --build -d
- **API dapat diakses di endpoint**
    ```bash
    http://localhost:3000/health
    http://localhost:3000/api/books