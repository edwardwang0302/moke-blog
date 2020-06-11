module.exports = {
  title: '莫珂的博客',
  tagline: 'The tagline of my site',
  url: 'https://mokewy.top',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'edwardwang0302', // Usually your GitHub org/user name.
  projectName: 'moke-blog', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '莫珂的博客',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        // {
        //   to: 'docs/',
        //   activeBasePath: 'docs',
        //   label: 'Docs',
        //   position: 'left',
        // },
        {to: 'blog', label: '文章', position: 'left'},
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
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: '联系我',
          items: [
            {
              label: '关于我',
              to: 'about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/edwardwang0302',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        // docs: {
        //   // It is recommended to set document id as docs home page (`docs/` path).
        //   homePageId: 'doc1',
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/',
        // },
        blog: {
          path: "./blog",
          routeBasePath: "/",
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
