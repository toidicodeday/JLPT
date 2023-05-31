import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   'primary-color': '#424F6F', // primary color for all components
        //   'link-color': '#2978b5', // link color
        //   'success-color': '#6EE7B7', // success state color
        //   'warning-color': '#ffb037', // warning state color
        //   'error-color': '#EF4444', // error state color
        //   'font-size-base': '13px', // major text font size
        //   'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
        //   'text-color': 'rgba(0, 0, 0, 0.65)', // major text color
        //   'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
        //   'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
        //   'border-radius-base': '6px', // major border radius
        //   'border-color-base': '#d9d9d9', // major border color
        //   'box-shadow-base':
        //     '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers

        //   // TABLE SETTING
        //   'table-padding-vertical': '12px',
        //   'table-padding-horizontal': '12px',
        // },
        javascriptEnabled: true,
      },
    },
  },
})
