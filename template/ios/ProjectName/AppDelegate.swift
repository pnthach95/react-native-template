import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication
      .LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // Xử lý nhiều file GoogleService-Info
    // https://stackoverflow.com/a/59875881
//    if let path = (Bundle.main.bundleIdentifier?.contains(".dev"))!
//      ? "GoogleService-Info_dev" : "GoogleService-Info",
//      let filePath = Bundle.main.path(forResource: path, ofType: "plist"),
//      let options = FirebaseOptions(contentsOfFile: filePath)
//    {
//      FirebaseApp.configure(options: options)
//    } else {
//      fatalError("Thiếu GoogleService-Info")
//    }
    return true
  }
}
