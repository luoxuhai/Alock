import { appId } from '../../app.json';

interface IBaseConfig {
  persistNavigation: 'always' | 'dev' | 'prod' | 'never';

  email: string;
  appId: string;
  productId: string;

  appStoreUrl: {
    cn: string;
    global: string;
  };

  privacyPolicy: {
    zh_cn: string;
    en_us: string;
  };
  userAgreement: {
    zh_cn: string;
    en_us: string;
  };
}

const BaseConfig: IBaseConfig = {
  persistNavigation: 'dev',

  appId,
  productId: 'net.darkce.nvd.donate_1',
  email: 'darkce97@gmail.com',

  appStoreUrl: {
    cn: `https://apps.apple.com/cn/app/id${appId}`,
    global: `https://apps.apple.com/app/id${appId}`,
  },

  privacyPolicy: {
    zh_cn: 'https://zh-cn/privacy-policy',
    en_us: 'https://en-us/privacy-policy',
  },

  userAgreement: {
    zh_cn: 'https://zh-cn/user-agreement',
    en_us: 'https://en-us/user-agreement',
  },
};

export type PersistNavigationConfig = IBaseConfig['persistNavigation'];

export default BaseConfig;
