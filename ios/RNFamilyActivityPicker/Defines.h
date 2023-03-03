#import <React/RCTViewManager.h>
#import <React/RCTComponentData.h>
#import <React/RCTComponentEvent.h>


#define RCT_CUSTOM_SWIFTUI_PROPERTY(name, type, proxyClass)                                            \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                        \
- (void)set_##name:(id)json forView:(UIView *)view withDefaultView:(UIView *)defaultView RCT_DYNAMIC { \
  NSMutableDictionary *storage = [proxyClass storage];                                                 \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                              \
  proxy.name = [self custom_##name:json];                                                              \
}                                                                                                      \
- (type *)custom_##name:(id)json RCT_DYNAMIC

#define RCT_EXPORT_SWIFTUI_PROPERTY(name, type, proxyClass)                                                 \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                             \
- (void)set_##name:(id)json forView:(UIView *)view withDefaultView:(UIView *)defaultView RCT_DYNAMIC {      \
  NSMutableDictionary *storage = [proxyClass storage];                                                      \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                                   \
  proxy.name = [json type##Value];                                                                          \
}

#define RCT_EXPORT_SWIFTUI_CALLBACK(name, type, proxyClass)                                                 \
RCT_REMAP_VIEW_PROPERTY(name, __custom__, type)                                                             \
- (void)set_##name:(id)json forView:(UIView *)view withDefaultView:(UIView *)defaultView RCT_DYNAMIC {      \
  NSMutableDictionary *storage = [proxyClass storage];                                                      \
  proxyClass *proxy = storage[[NSValue valueWithNonretainedObject:view]];                                   \
  void (^eventHandler)(NSDictionary *event) = ^(NSDictionary *event) {                                      \
  RCTComponentEvent *componentEvent = [[RCTComponentEvent alloc] initWithName:@""#name                      \
                                                                        viewTag:view.reactTag               \
                                                                           body:event];                     \
    [self.bridge.eventDispatcher sendEvent:componentEvent];                                                 \
  };                                                                                                        \
  proxy.name = eventHandler;                                                                                \
}
