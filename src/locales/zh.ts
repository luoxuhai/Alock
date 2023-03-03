const zh = {
  common: {
    ok: '好',
    confirm: '确认',
    cancel: '取消',
    back: '返回',
    enable: '启动',
    disable: '禁用',
    enabled: '已启动',
    disabled: '已禁用',
    closed: '已关闭',
    opened: '已打开',
    close: '关闭',
    done: '完成',
    share: '分享',
  },
  homeScreen: {
    hello: '你好！',
  },
  appLockScreen: {},
  settingsScreen: {
    title: '设置',
    version: '版本',
    connect: '联系开发者',
    goodReview: '给个5星好评',
    recommend: {
      title: '我的更多 App',
      appName: '隐私盒子',
      desc: '隐藏私密图片、视频和文件',
    },
    agreement: '协议',
    privacyPolicy: '隐私政策',
    userAgreement: '用户协议',
    security: {
      title: '安全设置',
      lock: '{{type}} 解锁',
    },
    donate: {
      purchasing: '支付中',
      success: '感谢您的捐助',
      fail: '捐助失败',
      title: '请我喝咖啡（捐助）',
      subtitle: '支持我们开发更多免费好用的 App',
    },
    openSource: {
      title: '该 APP 已开源，欢迎 Star 和 PR 👉',
    },
  },
  permissionManager: {
    camera: '相机',
    unavailable: '{{permission}}功能不可用',
    blocked: '请前往设置授予{{permissions}}权限，才能正常使用该功能',
    openSettings: '打开设置',
  },
};

export default zh;

export type Translations = typeof zh;
