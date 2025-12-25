#!/bin/bash

echo "🚀 ITS SYSTEMS - Setup Script"
echo "================================"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Crear carpetas necesarias
echo -e "${YELLOW}Creando carpetas...${NC}"
mkdir -p backend/logs
mkdir -p backend/uploads/{products,pages,temp}
mkdir -p database

# Backend setup
echo -e "${YELLOW}Instalando dependencias del backend...${NC}"
cd backend
if [ ! -f "package.json" ]; then
  echo "Error: package.json no encontrado"
  exit 1
fi

pnpm install

# Copiar .env si no existe
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    echo -e "${YELLOW}Copiando .env.example a .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ Archivo .env creado. Por favor configúralo antes de continuar.${NC}"
  else
    echo -e "${YELLOW}⚠ No se encontró .env.example${NC}"
  fi
fi

cd ..

# Frontend setup
if [ -d "frontend" ]; then
  echo -e "${YELLOW}Instalando dependencias del frontend...${NC}"
  cd frontend
  if [ -f "package.json" ]; then
    pnpm install
  fi
  cd ..
fi

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup completado!${NC}"
echo -e "${GREEN}================================${NC}"
