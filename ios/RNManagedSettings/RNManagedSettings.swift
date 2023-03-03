import ManagedSettings
import FamilyControls
import Foundation
import React

@objc(RNManagedSettings)
class RNManagedSettings: NSObject {
  var store: AnyObject?
  let decoder = JSONDecoder()

  override init() {
    if #available(iOS 15.0, *) {
      self.store = ManagedSettingsStore()
    } else {
      self.store = nil
    }
  }

  @available(iOS 15.0, *)
  @objc(setBlockedApplications:withRejecter:)
  func setBlockedApplications(resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock) -> Void {
      if let object = UserDefaults.standard.object(forKey: SelectedAppTokensKey) as? Data {
        if let appTokens = try? self.decoder.decode(Set<ApplicationToken>.self, from: object) {
          var applications = Set<Application>();
          for token in appTokens {
            applications.insert(Application(token: token))
          }
          (self.store as! ManagedSettingsStore).application.blockedApplications = applications
        }
        resolve("ok");
      }

      reject("error", nil, nil)
    }

  @available(iOS 15.0, *)
  @objc(clearBlockedApplications:withRejecter:)
  func clearBlockedApplications(resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock) -> Void {
    (self.store as! ManagedSettingsStore).application.blockedApplications?.removeAll()
      resolve("ok");
    }

  @objc(requestAuthorization:withRejecter:)
    func requestAuthorization(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      if #available(iOS 16.0, *) {
        Task {
            do {
              let center = AuthorizationCenter.shared
              try await center.requestAuthorization(for: FamilyControlsMember.individual)
              resolve([:]);
            } catch {
              reject("ERROR_requestAuthorization", nil, nil)
            }
        }
      } else {
        reject("ERROR_requestAuthorization", nil, nil)
      }
  }

  @available(iOS 15.0, *)
  @objc(getBlockedApplicationsCount:withRejecter:)
    func getBlockedApplicationsCount(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      resolve((self.store as! ManagedSettingsStore).application.blockedApplications?.count ?? 0);
    }

  @available(iOS 15.0, *)
  @objc(getAuthorizationStatus:withRejecter:)
    func getAuthorizationStatus(resolve:@escaping RCTPromiseResolveBlock,reject:@escaping RCTPromiseRejectBlock) -> Void {
      let authorizationStatus = AuthorizationCenter.shared.authorizationStatus
      resolve(authorizationStatus.rawValue);
    }
}
