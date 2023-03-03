import { EmitterSubscription } from 'react-native';
import {
  purchaseUpdatedListener,
  requestPurchase,
  initConnection,
  endConnection,
  finishTransaction,
  getProducts,
  SubscriptionPurchase,
  ProductPurchase,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';
import { Alert, Confetti, Toast } from '@react-native-library/overlay';
import { t } from '@/locales';
import Config from '@/config';

export class InAppPurchase {
  static shared = new InAppPurchase();

  private purchaseUpdateSubscription?: EmitterSubscription;
  private purchaseErrorSubscription?: EmitterSubscription;

  public isInitialized = false;
  private productId = Config.productId;

  public async init() {
    await this.connection();
    this.removeAllListener();
    this.addPurchaseUpdatedListener();
    this.addPurchaseErrorListener();
  }

  public async destroy() {
    this.removeAllListener();
    const end = await endConnection();
    this.isInitialized = false;
    return end;
  }

  public async getProduct() {
    try {
      return (await getProducts({ skus: [this.productId] }))[0];
    } catch (error) {
      throw error;
    }
  }

  public async requestPurchase() {
    Alert.show({
      preset: 'spinner',
      title: t('settingsScreen.donate.purchasing'),
      duration: 0,
    });

    try {
      return await requestPurchase({
        sku: this.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (error) {
      throw error;
    }
  }

  private removeAllListener() {
    this.purchaseUpdateSubscription?.remove();
    this.purchaseErrorSubscription?.remove();
    this.purchaseUpdateSubscription = undefined;
    this.purchaseErrorSubscription = undefined;
  }

  private async connection() {
    if (this.isInitialized) {
      return;
    }

    try {
      await initConnection();
    } catch (error) {
      throw error;
    }

    this.isInitialized = true;
  }

  private addPurchaseUpdatedListener() {
    if (!this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: SubscriptionPurchase | ProductPurchase) => {
          Alert.dismissAll();

          if (purchase.productId !== this.productId) {
            return;
          }

          try {
            await finishTransaction({ purchase, isConsumable: false });
            Confetti.start({ duration: 2 });
            Toast.show({ preset: 'done', title: t('settingsScreen.donate.success') });
          } catch (error) {
            this.purchaseErrorHandler(error as unknown as PurchaseError);
          }
        },
      );
    }
  }

  /**
   * 购买失败
   */
  private addPurchaseErrorListener() {
    if (!this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
        this.purchaseErrorHandler(error);
      });
    }
  }

  public purchaseErrorHandler(error?: PurchaseError) {
    Alert.dismissAll();

    Toast.show({
      preset: 'error',
      title: t('settingsScreen.donate.fail'),
      message: error?.message ?? '',
    });
  }
}
