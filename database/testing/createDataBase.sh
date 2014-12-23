#! /bin/bash
psql -c "CREATE DATABASE cookupsdb;"
psql -d cookupsdb --file=./setup_database/drop.sql
psql -d cookupsdb --file=./setup_database/schema.sql
psql -d cookupsdb --file=./setup_database/populate_db.sql
