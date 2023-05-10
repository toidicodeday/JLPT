
LIÊN MINH TAXI TẢI - WEB ADMIN
===========================

> This project is for Web admin
> Purpose:  admin control web app, support customer and manage driver

## Quick start
```
$ yarn install 
$ yarn dev
```

## Main tools
> Template: [Vite JS](https://vitejs.dev/)
> Css: [TailwindCss](https://tailwindcss.com/docs/installation)
> Components: [Antd](https://ant.design/)
> Store: [Redux Toolkit](https://redux-toolkit.js.org)
> Query: [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

## Directory layout

    .
    ├── .husky    
    ├── nginx                       # Config file nginx
    ├── src                         # Source files
    │   ├── assets
    │   │   ├── fonts               #  
    │   │   ├── img                 # List public image
    │   │   └── styles              # Global styles
    │   ├── components              # common components
    │   ├── constants
    │   ├── components              # common components
    │   ├── hooks                   # custom hooks
    │   ├── layout                  # layout components
    │   ├── pages                   # web pages
    │   ├── routes                  # routers config
    │   │   ├── index.tsx           # map all routes, check auth
    │   │   ├── pages-routes.ts     
    │   │   └── public-routes.ts    
    │   ├── services                # RTK query api
    │   ├── store                   # Pages slices
    │   └── util                    
    │       └── helpers             # function helper
    ├── .env.development            # env for dev
    ├── .env.production             # env for production
    ├── ...
    └── README.md

## Contributing
This project is private.

## License
[MIT](https://choosealicense.com/licenses/mit/)