/* eslint-disable import/no-unresolved */
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@modules/home/index'),
    children: [
      {
        path: 'headline/:newsId',
        name: 'headline_detail',
        components: {
          detail: () => import('@modules/home/detail/index'),
        },
        props: true,
      },
      {
        path: 'headline',
        redirect: '/',
      },
    ],
  },
];
