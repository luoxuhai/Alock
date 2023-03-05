#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"
#import "React/RCTComponentEvent.h"
#import "Defines.h"
#import "AppLocker-Swift.h"

@interface RNFamilyActivityPickerManager : RCTViewManager
@end

@implementation RNFamilyActivityPickerManager

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_CUSTOM_SWIFTUI_PROPERTY(headerText, NSString, RNFamilyActivityPickerProxy) {
  return [RCTConvert NSString:json] ?: @"";
}

RCT_CUSTOM_SWIFTUI_PROPERTY(footerText, NSString, RNFamilyActivityPickerProxy) {
  return [RCTConvert NSString:json] ?: @"";
}

RCT_EXPORT_SWIFTUI_CALLBACK(onActivityChange, RCTDirectEventBlock, RNFamilyActivityPickerProxy)

- (UIView *)view {
  if (@available(iOS 15.0, *)) {
    RNFamilyActivityPickerProxy *proxy = [[RNFamilyActivityPickerProxy alloc] init];
    UIView *view = [proxy view];
    NSMutableDictionary *storage = [RNFamilyActivityPickerProxy storage];
    storage[[NSValue valueWithNonretainedObject:view]] = proxy;
    return view;
  } else {
    return nil;
  }
}

@end
  
