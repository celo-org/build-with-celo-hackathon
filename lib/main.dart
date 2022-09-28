import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sustain/common/theme/theme.dart';
import 'package:sustain/common/utils/media_query.dart';
import 'package:sustain/features/onboarding/views/onboarding_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    SizeData();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Sustain',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.light,
      home: const OnboardingView(),
    );
  }
}
