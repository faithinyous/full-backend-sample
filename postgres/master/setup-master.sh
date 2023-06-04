#!/bin/bash
echo "host replication postgres_replica 10.5.0.0/16 trust" >> "$PGDATA/pg_hba.conf"
tail "$PGDATA/pg_hba.conf"
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $PG_REP_USER REPLICATION LOGIN CONNECTION LIMIT 100 ENCRYPTED PASSWORD '$PG_REP_PASSWORD';
EOSQL

cat >> ${PGDATA}/postgresql.conf <<EOF

wal_level = logical
wal_log_hints = on
archive_mode = on
archive_command = 'cd .'
max_wal_senders = 8
hot_standby = on
EOF