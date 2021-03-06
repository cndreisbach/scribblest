import { app, Menu } from 'electron'
import { isMac } from './utils'

export function setupMenu (contents) {
  const menuTemplate = [
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Export as SVG...',
          click: function (menuItem, focusedWin) {
            contents.send('export-svg')
          }
        },
        {
          label: 'Export as PNG...',
          click: function (menuItem, focusedWin) {
            contents.send('export-png')
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click: function (menuItem, focusedWin) {
            contents.send('undo')
          }
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Shift+Z',
          click: function (menuItem, focusedWin) {
            contents.send('redo')
          }
        }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Pen',
          type: 'radio',
          checked: true,
          accelerator: 'P',
          click: function (menuItem, focusedWin) {
            contents.send('useTool', 'pen')
          }
        },
        {
          label: 'Eraser',
          type: 'radio',
          accelerator: 'E',
          click: function (menuItem, focusedWin) {
            contents.send('useTool', 'eraser')
          }
        },
        {
          label: 'Drag Tool',
          type: 'radio',
          accelerator: 'D',
          click: function (menuItem, focusedWin) {
            contents.send('useTool', 'dragTool')
          }
        },
        {
          label: 'Line Tool',
          type: 'radio',
          accelerator: 'L',
          click: function (menuItem, focusedWin) {
            contents.send('useTool', 'lineTool')
          }
        },
        {
          label: 'Highlighter',
          type: 'radio',
          accelerator: 'H',
          click: function (menuItem, focusedWin) {
            contents.send('useTool', 'highlighter')
          }
        }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        { role: 'forcereload' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}
