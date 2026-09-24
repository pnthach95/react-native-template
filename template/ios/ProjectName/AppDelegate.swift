import RNBootSplash
import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

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

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "ProjectName",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
    #if DEBUG
      //      if (RCTBundleURLProvider.sharedSettings().jsLocation?.starts(
      //        with: "localhost"
      //      )) == true
      //        || (RCTBundleURLProvider.sharedSettings().jsLocation == nil)
      //      {
      //        // cài lại port mặc định
      //        RCTBundleURLProvider.sharedSettings().jsLocation = "localhost:8083"
      //      }
      return RCTBundleURLProvider.sharedSettings().jsBundleURL(
        forBundleRoot: "index"
      )
    #else
      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }

  override func customize(_ rootView: RCTRootView!) {
    super.customize(rootView)
    RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)
  }
}
