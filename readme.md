# Reaphsoft Workmen Mono Repo
Now you can run the code below from the root of the project and it will start both the front and backend server at 
the same time.
```
npm start
```

## Stacks
1. The **Frontend** is built using `React` and `Bootstrap`. See the _frontend_ dir for the frontend codes.
2. The **Backend** is built using [NestJS](https://nestjs.com/). See the _backend_ dir for its codes.

Please head to [backend](https://github.com/reaphsoft-org/Reaphsoft-Workman-portal/tree/main/backend#readme) for details on working with the backend.

## Points to note
1. Ensure that the backend port and the front end ports are not the same. You can change the backend port in `src/main.ts`
2. Please install packages (i.e. `npm install package`) from the relevant directory (frontend or backend). Don't run install commands from the root directory.
3. Run `npm install` when pulling new codes to ensure new packages are installed locally.