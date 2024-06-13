# Reaphsoft Workmen Mono Repo
When running locally, set the environment variable below (for the backend)
```
HOSTING = local
```
For the frontend, create a `.env` file and add below
```
REACT_APP_HOSTING = local
```
Now you can run the code below from the root of the project, and it will start both the front and backend server at 
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

## Deployment
1. For the frontend, install serve according to the React deployment recommendations `npm install --save serve`
2. run `npm run build; serve -s build -l tcp://0.0.0.0:80` which builds and serves the file on windows.
3. For the backend, run the command `npm run build; npm run start:prod`
4. Commands should be run from the respective directories.