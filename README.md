# React + Vite

# Proyecto: Sistema de Gestión de Pólizas 

Este proyecto es una aplicación web desarrollada con ASP.NET Core y Entity Framework Core en el backend, y React con Material UI en el frontend. Permite gestionar clientes, pólizas y realizar búsquedas avanzadas mediante filtros.

## 📦 Tecnologías Utilizadas

- **Backend:** ASP.NET Core 7.0, Entity Framework Core, SQL Server
- **Frontend:** React, Redux Toolkit, Material UI
- **Base de datos:** SQL Server LocalDB o SQL Server Express

---

## 🚀 Instrucciones para ejecutar el proyecto

### 🔧 Requisitos previos

- Visual Studio 2022 (o superior)
- .NET 7 SDK
- SQL Server Express o LocalDB
- Node.js (v16+)
- npm o yarn

---

### 1️⃣ Backend (.NET API)

1. Abre el archivo de solución `.sln` en Visual Studio.
2. Establece el proyecto `BP-Proyecto` como **proyecto de inicio**.
3. Verifica la cadena de conexión en `appsettings.json`. Ejemplo:
   ```json
   "ConnectionStrings": {
     "Conexion": "Server=(localdb)\\MSSQLLocalDB;Database=BPProyectoDB;Trusted_Connection=True;"
   }
