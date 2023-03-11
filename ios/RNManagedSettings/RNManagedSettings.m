#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNManagedSettings, NSObject)

RCT_EXTERN_METHOD(setBlockedApplications:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearBlockedApplications:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setShieldApplications:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(clearShieldApplications:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(requestAuthorization:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getSelectedApplicationsCount:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getAuthorizationStatus:(RCTPromiseResolveBlock)resolve
withRejecter:(RCTPromiseRejectBlock)reject)

@end
