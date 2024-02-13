# Projeto em construção

## API ROUTES

### STORE
api / stores / route
  - POST | CREATE A STORE

api / stores / [storeId] / route
  - PATCH  | UPDATE A SPECIFIC STORE
  - DELETE | DELETE A SPECIFIC STORE

## BILLBOARD
api / [storeId] / billboards / route
  - GET  | FIND A BILLBOARD FOR A SPECIFIC STORE
  - POST | CREATE A BILLBOARD FOR A SPECIFIC STORE

api / [storeId] / billboards / [billboardId] / route
  - GET    | FIND A SPECIFIC BILLBOARD
  - PATCH  | UPDATE A BILLBOARD
  - DELETE | DELETE BILLBOARD

## CATEGORY
api / [storeId] / categories / route
  - GET  | FIND ALL CATEGORIES FOR SPECIFIC STORE
  - POST | CREATE A CATEGORY FOR A SPECIFIC ST0RE AND A SPECIFIC BILLBOARD
 
api / [storeId] / categories / [categoryId] / route
  - GET    | FIND A SPECIFIC CATEGORY BY ID
  - PATCH  | UPDATE A CATEGORY BY ID
  - DELETE | DELETE A CATEGORY BY ID

## SIZE
api / [storeId] / sizes / route
  - GET  | FIND ALL SIZES FOR SPECIFIC STORE
  - POST | CREATE A SIZE FOR A SPECIFIC ST0RE
 
api / [storeId] / sizes / [categoryId] / route
  - GET    | FIND A SPECIFIC SIZE BY ID
  - PATCH  | UPDATE A SIZE BY ID
  - DELETE | DELETE A SIZE BY ID