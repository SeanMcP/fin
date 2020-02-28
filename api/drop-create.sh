#!/usr/bin/env bash

psql -c "DROP DATABASE fin"

psql -c "CREATE DATABASE fin"

psql fin -f sql/create.sql
