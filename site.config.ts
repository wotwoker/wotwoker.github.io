import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://wotwoker.github.io/',
  lang: 'zh-CN',
  title: 'Flowing Lantingarden',
  subtitle: '兰亭流水集',
  author: {
    name: '空流酱',
    avatar: '/sadaharu.jpg', // 或你的图片 URL
    status: { emoji: '', message: '' }, // 设为空
  },
  favicon: 'https://www.yunyoujun.cn/favicon.svg',
  description: 'Welcome to Kongliu-chan\'s Lantingarden',
  social: [
    {
      name: 'GitHub',
      link: 'https://github.com/wotwoker',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/361098179',
      icon: 'i-ri-bilibili-fill',
      color: '#FF8EB3',
    },
    // {
    //   name: '微信公众号',
    //   link: 'https://cdn.yunyoujun.cn/img/about/white-qrcode-and-search.jpg',
    //   icon: 'i-ri-wechat-2-line',
    //   color: '#1AAD19',
    // },
    {
      name: 'Bangumi',
      link: 'https://bgm.tv/user/gen_river',
      icon: 'i-pixelarticons-device-tv',
      color: '#FF8EB3',
    },
    {
      name: 'E-Mail',
      link: 'xean2020@outlook.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://www.travellings.cn/go.html',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],

  search: {
    enable: false,
  },

  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [
      {
        name: '支付宝',
        url: 'https://cdn.yunyoujun.cn/img/donate/alipay-qrcode.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      {
        name: 'QQ 支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
        color: '#12B7F5',
        icon: 'i-ri-qq-line',
      },
      {
        name: '微信支付',
        url: 'https://cdn.yunyoujun.cn/img/donate/wechatpay-qrcode.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },
})
