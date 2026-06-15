# Todo App with AppDB
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDomoApps%2Fbasic-react-app-todo-tutorial.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FDomoApps%2Fbasic-react-app-todo-tutorial?ref=badge_shield)


A shared task manager built as a Domo Custom App — React + TypeScript + Redux Toolkit, backed by [AppDB](https://domo.com/docs/portal/API-Reference/app-framework-apis/AppDB-API). Stamps ownership (`ownerId` / `ownerName`) onto every todo, fetches the current user's identity and avatar, and exposes CRUD through typed Redux slices.

This repo is the companion sample for the **[Todo App with AppDB tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/Todo-App)**.

## What it demonstrates

- Scaffolding a Vite + React + TypeScript app with the [DA CLI](https://domo.com/docs/portal/Apps/App-Framework/Tools/da-cli)
- Declaring an AppDB collection in `manifest.json` with `defaultPermission`
- Typed `AppDBClient` + `IdentityClient` + `UserClient` service layer
- Redux Toolkit slices with `buildCreateSlice` + `asyncThunkCreator` for async CRUD
- Per-user ownership stamping and an avatar fallback

## Project layout

```
src/
├── main.tsx                       # Provider-wrapped app entry
├── components/
│   ├── App/                       # Root: kicks off loads, shows errors
│   ├── UserHeader/                # Avatar, name, role
│   ├── TodoForm/                  # New-todo form (stamps ownership)
│   ├── TodoList/                  # Filter UI + list
│   └── TodoItem/                  # Row with toggle/delete
├── reducers/
│   ├── createAppSlice.ts          # buildCreateSlice helper
│   ├── index.ts                   # Store + typed hooks
│   ├── app/slice.ts               # User identity
│   └── todos/slice.ts             # CRUD thunks
└── services/
    ├── app.ts                     # AppDB + Identity + User clients
    └── types.ts                   # TodoData, Todo, UserInfo
```

## Prerequisites

- Node 18+
- The [DA CLI](https://www.npmjs.com/package/@domoinc/da) and the [Domo CLI](https://domo.com/docs/portal/Apps/App-Framework/Quickstart/Setup-and-Installation)
- `domo login` completed against your target instance
- An AppDB-enabled Domo instance

## Getting started

```bash
pnpm install
pnpm start
```

On first run, publish an initial design to provision the `Todos` collection and copy the `id` + `proxyId` back into `public/manifest.json`:

```bash
pnpm upload
```

See the [tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/Todo-App) for the full walk-through, including the Asset Library card-creation step.

## Scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm start`     | Vite dev server with the Domo proxy                   |
| `pnpm build`     | Lint, test, and build for production                  |
| `pnpm upload`    | Build and `domo publish` in one step                  |
| `pnpm generate`  | Scaffold new components / reducers with `da generate` |
| `pnpm test`      | Run Vitest                                            |
| `pnpm storybook` | Launch Storybook                                      |


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDomoApps%2Fbasic-react-app-todo-tutorial.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FDomoApps%2Fbasic-react-app-todo-tutorial?ref=badge_large)