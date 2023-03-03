import SwiftUI
import FamilyControls
import React
import ManagedSettings

class RNFamilyActivityPickerProps : ObservableObject {
  @Published var headerText: String = ""
  @Published var footerText: String = ""
  @Published var onActivityChange: RCTDirectEventBlock = { _ in }
}

public let SelectedAppTokensKey = "selectedAppTokens"

@available(iOS 15.0, *)
struct RNFamilyActivityPicker: View {
  let store = ManagedSettingsStore()
  let encoder = JSONEncoder()
  let decoder = JSONDecoder()

  @ObservedObject var props = RNFamilyActivityPickerProps()
  @State var selection = FamilyActivitySelection(includeEntireCategory: true)

    var body: some View {
      Group {
        if #available(iOS 16.0, *) {
          FamilyActivityPicker(headerText: self.props.headerText,footerText: self.props.footerText, selection: $selection)
        } else {
          FamilyActivityPicker(selection: $selection)
        }
      }
      .onChange(of: selection) { newSelection in
        let appTokens = newSelection.applicationTokens
        let appTokensCount = appTokens.count
        self.props.onActivityChange(["appTokensCount": appTokensCount])
        if (appTokensCount == 0) {
          UserDefaults.standard.removeObject(forKey: SelectedAppTokensKey)
          return
        }

        if let appTokensData = try? encoder.encode(appTokens) {
          UserDefaults.standard.set(appTokensData, forKey: SelectedAppTokensKey)
        }
      }
      .onAppear() {
        if let object = UserDefaults.standard.object(forKey: SelectedAppTokensKey) as? Data {
            if let appTokens = try? decoder.decode(Set<ApplicationToken>.self, from: object) {
              self.selection.applicationTokens = appTokens
            }
        }
      }
   }
}
  
