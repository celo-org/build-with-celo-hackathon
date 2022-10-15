import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

// need to make this futureprovider in order to get it working smooth.
final wrapperProvider = StateNotifierProvider<WrapperNotifier, bool>((ref) {
  return WrapperNotifier(ref);
});

class WrapperNotifier extends StateNotifier<bool> {
  WrapperNotifier(this.ref) : super(false);

  Ref ref; // not using right now
  final String key = "onboardOrGoToHome?";

  SharedPreferences? pref;

  void updateOnboarding() {
    state = !state;
    _saveToPrefs();
  }

  initPrefs() async {
    pref ??= await SharedPreferences.getInstance();
  }

  loadFromPrefs() async {
    await initPrefs();
    state = pref!.getBool(key) ?? false;
    return state;
  }

  _saveToPrefs() async {
    await initPrefs();
    pref!.setBool(key, state);
  }
}
