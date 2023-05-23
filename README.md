
JLPT - WEB ADMIN
===========================

> This project is for Web admin
> Purpose:  admin control web app, support customer and manage driver

## Quick start
```
$ yarn install 
$ yarn dev
```

## Code rules
1. Tạo branch theo format
- feature/{mã ticket}_{nội dung tóm tắt}
    vd: feature/2_update_tailwind_color_config

- fix/{mãticket (nếu  có)}_{nội dung tóm tắt fĩx}
    vd: fix/error_page_update


2. Tạo commit theo format
- commit lint conversion https://www.conventionalcommits.org/en/v1.0.0/

    2 loại chính fix và feat
    VD: feat: #2 done cat giao dien home page
        fix: #2 sua loi giao dien reponsive
        feat: update logic cho login

3. Tạo merge request và add reviewer
- Tạo merge request: Nêu rõ làm cho ticket nào
    title: #3 done cat giao dien login 
- Kéo ticket sang cột chờ need review

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
