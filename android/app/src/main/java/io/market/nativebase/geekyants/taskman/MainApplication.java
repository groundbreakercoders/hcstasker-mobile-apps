package io.market.nativebase.geekyants.taskman;

import android.app.Application;

import com.facebook.react.ReactApplication;

import com.oblador.vectoricons.VectorIconsPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// import io.sentry.RNSentryPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
// import com.microsoft.codepush.react.CodePush;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.appevents.AppEventsLogger;

// import io.invertase.firebase.RNFirebasePackage;
// optional packages - add/remove as appropriate
import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage; // Crashlytics
import io.invertase.firebase.functions.RNFirebaseFunctionsPackage; // Cloud Functions
// import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;  // notifications

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

        //  @Override
        // protected String getJSBundleFile() {
        // return CodePush.getJSBundleFile();
        // }

 private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new MapsPackage(),
            new ReactNativeLocalizationPackage(),
            new RNI18nPackage(),
            new RNGooglePlacesPackage(),
            new RNFirebasePackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFetchBlobPackage(),
        // add/remove these packages as appropriate
        new RNFirebaseAdMobPackage(),
        new RNFirebaseAnalyticsPackage(),
        new RNFirebaseAuthPackage(),
        new RNFirebaseRemoteConfigPackage(),
        new RNFirebaseCrashPackage(),
        new RNFirebaseDatabasePackage(),
        new RNFirebaseFirestorePackage(),
        new RNFirebaseMessagingPackage(),
        new RNFirebasePerformancePackage(),
        new RNFirebaseStoragePackage(),
        new RNFirebaseCrashlyticsPackage(),
        new RNFirebaseNotificationsPackage(),
        new RNFirebaseFunctionsPackage()
      );
    }
    
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.setApplicationId("468405990567287");
    FacebookSdk.sdkInitialize(this);
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);

  }
  
}
