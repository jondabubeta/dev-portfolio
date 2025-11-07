# Anirepo

Anirepo is a full-stack media inventory platform for cataloging anime-related items such as books, figures, art, games, and autographs. It exposes a RESTful API and a modular server architecture so frontends or community tools can integrate easily.

## Overview

The server is built on Node.js and Express and uses MongoDB for persistence. Each media type (books, figures, games, art, autographs) is handled by its own router and controller, keeping concerns isolated and enabling incremental extension.

## Features

- RESTful API endpoints for CRUD operations per media type
- Filtering and aggregation for dashboards
- Modular controller + router structure for easy extension
- CORS and JSON body parsing middleware for modern frontend integration

## Tech

Node.js · Express · MongoDB · JavaScript

## Notes

This project is structured to be a backend-first platform—client apps can be built as separate repos and consume the API. Authentication and user accounts are not implemented in the initial version but the architecture is prepared for adding auth and per-user collections.
