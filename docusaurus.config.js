module.exports = {
  title: '莫珂的博客',
  tagline: 'Release my personality and pursuing my dream',
  url: 'https://mokewy.top',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'edwardwang0302', // Usually your GitHub org/user name.
  projectName: 'moke-blog', // Usually your repo name.
  themeConfig: {
    // algolia: {
    //   apiKey: 'api-key',
    //   indexName: 'index-name',
    //   appId: 'app-id', // Optional, if you run the DocSearch crawler on your own
    //   algoliaOptions: {}, // Optional, if provided by Algolia
    // },
    navbar: {
      title: '莫珂的博客',
      logo: {
        alt: 'My Site Logo',
        src: 'img/favicon.png',
      },
      links: [
        {to: '/blog', label: '文章', position: 'left'},
        {to: '/about', label: '关于我', position: 'left'},
        {to: '/blog/tags', label: '分类标签', position: 'left'},
        // {
        //   to: 'docs/',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        {
          href: 'https://github.com/edwardwang0302',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Style Guide',
        //       to: 'docs/',
        //     },
        //     {
        //       label: 'Second Doc',
        //       to: 'docs/doc2/',
        //     },
        //   ],
        // },
        {
          title: '',
          items: [
            {
              label: 'Github: edwardwang0302',
              href: 'https://github.com/edwardwang0302',
            },
          ],
        },
        {
          title: '',
          items: [
            {
              label: 'Bilibili: 莫珂(uid:401622255)',
              href: 'https://space.bilibili.com/401622255',
            },
          ],
        },
        {
          title: '',
          items: [
            {
              label: '邮箱：edwardwang19920302@gmail.com',
            },
          ],
        },
        // {
        //   title: '联系我',
        //   items: [
        //     {
        //       label: '关于我',
        //       to: 'about',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/edwardwang0302',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          // path: './blog',
          // routeBasePath: "/blog",
          // showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
