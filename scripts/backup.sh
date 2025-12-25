#!/bin/bash

echo "🔄 ITS SYSTEMS - Backup Script"
echo "================================"

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Variables
BACKUP_DIR="./database/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="${DB_NAME:-its_systems_db}"
DB_USER="${DB_USER:-its_systems_user}"

# Crear directorio de backups
mkdir -p $BACKUP_DIR

# Backup de base de datos
echo -e "${YELLOW}Realizando backup de la base de datos...${NC}"
pg_dump -U $DB_USER -d $DB_NAME > "$BACKUP_DIR/db_backup_$DATE.sql"

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Backup de BD creado: db_backup_$DATE.sql${NC}"
else
  echo -e "${RED}✗ Error al crear backup de BD${NC}"
  exit 1
fi

# Backup de uploads
if [ -d "backend/uploads" ]; then
  echo -e "${YELLOW}Realizando backup de archivos...${NC}"
  tar -czf "$BACKUP_DIR/uploads_backup_$DATE.tar.gz" backend/uploads/
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backup de uploads creado: uploads_backup_$DATE.tar.gz${NC}"
  else
    echo -e "${RED}✗ Error al crear backup de uploads${NC}"
  fi
fi

# Limpiar backups antiguos (mantener últimos 7 días)
echo -e "${YELLOW}Limpiando backups antiguos...${NC}"
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "uploads_backup_*.tar.gz" -mtime +7 -delete

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Backup completado!${NC}"
echo -e "${GREEN}================================${NC}"
