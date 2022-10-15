import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sustain/common/app/providers/wrapper_provider.dart';
import 'package:sustain/common/app/views/bottom_navigation_bar.dart';
import 'package:sustain/features/onboarding/views/onboarding_view.dart';

class Wrapper extends ConsumerStatefulWidget {
  const Wrapper({Key? key}) : super(key: key);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _WrapperState();
}

class _WrapperState extends ConsumerState<Wrapper> {
  @override
  void initState() {
    loadSharedPreferences();
    super.initState();
  }

  loadSharedPreferences() async {
    await ref.read(wrapperProvider.notifier).loadFromPrefs();
  }

  // the actuall wrapper

  // FirebaseAuth.instance
  // .authStateChanges()
  // .listen((User? user) {
  //   if (user == null) {
  //     print('User is currently signed out!');
  //   } else {
  //     print('User is signed in!');
  //   }
  // });

  @override
  Widget build(BuildContext context) {
    bool value = ref.watch(wrapperProvider);
    if (value) {
      return const BottomNav();
    } else {
      return const OnboardingView();
    }
  }
}
