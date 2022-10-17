import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'package:sustain/common/utils/media_query.dart';
import 'package:sustain/features/introduction/views/introduction_view.dart';

class OnboardingView extends StatefulWidget {
  const OnboardingView({super.key});

  @override
  State<OnboardingView> createState() => _OnboardingViewState();
}

class _OnboardingViewState extends State<OnboardingView> {
  final introKey = GlobalKey<IntroductionScreenState>();

  // when you press get started this runs.
  void _onIntroEnd(context) {
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (BuildContext context) => const IntroductionView()));
  }

  @override
  Widget build(BuildContext context) {
    // need to inititalize this here so that we can use screen width and stuff in all the children screens
    SizeData().init(context);

    // all 3 pages in the  intro screen use this page decoration for their style
    final pageDecoration = PageDecoration(
      titleTextStyle:
          const TextStyle(fontSize: 28.0, fontWeight: FontWeight.w700),
      bodyTextStyle:
          Theme.of(context).textTheme.bodyText1!.copyWith(fontSize: 19),
      bodyPadding: const EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 16.0),
      pageColor: Colors.white,
      imagePadding: EdgeInsets.zero,
    );

    // both the next and done button use this function
    Widget nextOrDoneButton({required String title}) {
      return SizedBox(
        width: title == 'Next' ? 140 : 170,
        height: 50,
        child: Material(
          color: Theme.of(context).primaryColor,
          borderRadius: const BorderRadius.all(Radius.circular(10)),
          elevation: 4,
          child: Container(
            decoration: BoxDecoration(
                border: Border.all(
                  color: Theme.of(context).primaryColor,
                ),
                color: Theme.of(context).primaryColor,
                borderRadius: const BorderRadius.all(Radius.circular(10))),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: Theme.of(context)
                        .textTheme
                        .headline6!
                        .copyWith(color: Colors.white, fontSize: 21),
                  ),
                  const SizedBox(width: 15),
                  const Icon(
                    Icons.arrow_forward,
                    color: Colors.white,
                    size: 20,
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            Image.asset(
              'lib/common/assets/mother-earth-day.png',
              height: 40,
              // height: 250,
            ),
            const SizedBox(width: 10),
            Text(
              'Sustain',
              style: Theme.of(context)
                  .textTheme
                  .headline6!
                  .copyWith(fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
      body: IntroductionScreen(
        key: introKey,
        globalBackgroundColor: Colors.white,
        scrollPhysics: const BouncingScrollPhysics(),
        pages: [
          PageViewModel(
            title: "Track",
            body:
                "Automatically measure carbon emissions from everyday mobility choices through our simple tracker",
            image: Image.asset(
              'lib/common/assets/nature.png',
              height: 250,
            ),
            decoration: pageDecoration,
          ),
          PageViewModel(
            title: "Reduce",
            body:
                "Personalized tips & practical ideas on how you can reduce your emissions",
            image: Image.asset(
              'lib/common/assets/nature_walk.png',
              height: 250,
            ),
            decoration: pageDecoration,
          ),
          PageViewModel(
            title: "Remove",
            body:
                "Select projects to remove the equivalent amount of carbon emissions that you've produced",
            image: Image.asset(
              'lib/common/assets/night_chill.png',
              height: 250,
            ),
            decoration: pageDecoration,
          ),
        ],
        skipOrBackFlex: 0,
        nextFlex: 0,
        back: const Icon(Icons.arrow_back),
        onDone: () => _onIntroEnd(context),
        next: nextOrDoneButton(title: 'Next'),
        done: nextOrDoneButton(title: 'Get Started'),
        curve: Curves.fastLinearToSlowEaseIn,
        controlsMargin: const EdgeInsets.all(16),
        controlsPadding: const EdgeInsets.fromLTRB(8.0, 4.0, 8.0, 4.0),
        dotsDecorator: DotsDecorator(
          size: const Size(15.0, 10.0),
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),

          // lighter version of the primary color for non active dots
          color: const Color(0xFFc2efd8),
          activeColor: Theme.of(context).primaryColor,
          activeSize: const Size(30.0, 10.0),
          activeShape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(25.0)),
          ),
        ),
      ),
    );
  }
}
