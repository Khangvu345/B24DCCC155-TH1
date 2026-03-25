// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/Code/Project/B24DCCC155-TH1/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'D:/Code/Project/B24DCCC155-TH1/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/~demos/:uuid",
        "layout": false,
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent})],
        "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ 'D:/Code/Project/B24DCCC155-TH1/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
      },
      {
        "path": "/_demos/:uuid",
        "redirect": "/~demos/:uuid"
      },
      {
        "__dumiRoot": true,
        "layout": false,
        "path": "/~docs",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'D:/Code/Project/B24DCCC155-TH1/node_modules/dumi-theme-default/es/layout.js'), loading: LoadingComponent})],
        "routes": [
          {
            "path": "/~docs",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'README.md' */'D:/Code/Project/B24DCCC155-TH1/README.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "locale": "en-US",
              "order": null,
              "filePath": "README.md",
              "updatedTime": 1772589214000,
              "slugs": [
                {
                  "depth": 1,
                  "value": "This is my practice 02 in PTIT",
                  "heading": "this-is-my-practice-02-in-ptit"
                }
              ],
              "title": "This is my practice 02 in PTIT"
            },
            "title": "This is my practice 02 in PTIT"
          }
        ],
        "title": "ant-design-pro",
        "component": (props) => props.children
      },
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "path": "/user/login",
            "layout": false,
            "name": "login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'D:/Code/Project/B24DCCC155-TH1/src/pages/user/Login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          }
        ]
      },
      {
        "path": "/dashboard",
        "name": "Dashboard",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TrangChu' */'D:/Code/Project/B24DCCC155-TH1/src/pages/TrangChu'), loading: LoadingComponent}),
        "icon": "HomeOutlined",
        "exact": true
      },
      {
        "path": "/gioi-thieu",
        "name": "About",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TienIch__GioiThieu' */'D:/Code/Project/B24DCCC155-TH1/src/pages/TienIch/GioiThieu'), loading: LoadingComponent}),
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/random-user",
        "name": "RandomUser",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RandomUser' */'D:/Code/Project/B24DCCC155-TH1/src/pages/RandomUser'), loading: LoadingComponent}),
        "icon": "ArrowsAltOutlined",
        "exact": true
      },
      {
        "path": "/game",
        "name": "Game",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Game' */'D:/Code/Project/B24DCCC155-TH1/src/pages/Game'), loading: LoadingComponent}),
        "icon": "TrophyOutlined",
        "exact": true
      },
      {
        "path": "/todo",
        "name": "To Do List",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TodoList' */'D:/Code/Project/B24DCCC155-TH1/src/pages/TodoList'), loading: LoadingComponent}),
        "icon": "CheckSquareOutlined",
        "exact": true
      },
      {
        "path": "/oan-tu-ti",
        "name": "Oẳn tù tì",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__OanTuTi' */'D:/Code/Project/B24DCCC155-TH1/src/pages/OanTuTi'), loading: LoadingComponent}),
        "icon": "ScissorOutlined",
        "exact": true
      },
      {
        "path": "/quan-ly-ngan-hang-cau-hoi",
        "name": "Quản lý ngân hàng câu hỏi",
        "routes": [
          {
            "name": "Khối kiến thức",
            "path": "/quan-ly-ngan-hang-cau-hoi/khoi-kien-thuc",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__QuanLyNganHangCauHoi__KhoiKienThuc' */'D:/Code/Project/B24DCCC155-TH1/src/pages/QuanLyNganHangCauHoi/KhoiKienThuc'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "Môn học",
            "path": "/quan-ly-ngan-hang-cau-hoi/mon-hoc",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__QuanLyNganHangCauHoi__MonHoc' */'D:/Code/Project/B24DCCC155-TH1/src/pages/QuanLyNganHangCauHoi/MonHoc'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "Câu hỏi",
            "path": "/quan-ly-ngan-hang-cau-hoi/cau-hoi",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__QuanLyNganHangCauHoi__CauHoi' */'D:/Code/Project/B24DCCC155-TH1/src/pages/QuanLyNganHangCauHoi/CauHoi'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "Đề thi",
            "path": "/quan-ly-ngan-hang-cau-hoi/de-thi",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__QuanLyNganHangCauHoi__DeThi' */'D:/Code/Project/B24DCCC155-TH1/src/pages/QuanLyNganHangCauHoi/DeThi'), loading: LoadingComponent}),
            "exact": true
          }
        ],
        "icon": "QuestionOutlined"
      },
      {
        "path": "/notification",
        "routes": [
          {
            "path": "/notification/subscribe",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Subscribe' */'D:/Code/Project/B24DCCC155-TH1/src/pages/ThongBao/Subscribe'), loading: LoadingComponent})
          },
          {
            "path": "/notification/check",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Check' */'D:/Code/Project/B24DCCC155-TH1/src/pages/ThongBao/Check'), loading: LoadingComponent})
          },
          {
            "path": "/notification/",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__NotifOneSignal' */'D:/Code/Project/B24DCCC155-TH1/src/pages/ThongBao/NotifOneSignal'), loading: LoadingComponent})
          }
        ],
        "layout": false,
        "hideInMenu": true
      },
      {
        "path": "/index.html",
        "exact": true
      },
      {
        "path": "/",
        "exact": true
      },
      {
        "path": "/403",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__403__403Page' */'D:/Code/Project/B24DCCC155-TH1/src/pages/exception/403/403Page'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "path": "/hold-on",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__DangCapNhat' */'D:/Code/Project/B24DCCC155-TH1/src/pages/exception/DangCapNhat'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__404' */'D:/Code/Project/B24DCCC155-TH1/src/pages/exception/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
