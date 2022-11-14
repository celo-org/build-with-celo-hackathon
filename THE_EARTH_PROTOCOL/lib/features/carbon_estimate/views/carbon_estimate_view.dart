import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:sustain/common/app/providers/user_provider.dart';
import 'package:sustain/common/app/providers/wrapper_provider.dart';
import 'package:sustain/common/app/views/bottom_navigation_bar.dart';
import 'package:sustain/common/utils/media_query.dart';
import 'package:sustain/features/carbon_estimate/widgets/carbon_circle.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class CarbonEstimateView extends ConsumerWidget {
  const CarbonEstimateView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    CollectionReference users = FirebaseFirestore.instance.collection('users');

    // global carbon footprint -> change to whatever number you like
    const int globalAverageCarbonFootprint = 530;

    // your carbon footprint
    final int estimatedCarbonFootprint =
        ref.watch(userProvider.notifier).calculateCarbonFootprint();

    List<double> sizeOfContainers = ref
        .watch(userProvider.notifier)
        .calculateSizeOfContainers(
            estimatedCarbonFootprint, globalAverageCarbonFootprint);
    double sizeOfYours = sizeOfContainers[0];
    double sizeOfGlobal = sizeOfContainers[1];

    // need to removve this
    Future<void> addUser() {
      // Call the user's CollectionReference to add a new user
      return users
          .add({
            'full_name': 'charith', // John Doe
            'company': 'none', // Stokes and Sons
            'age': 23 // 42
          })
          .then((value) => log('user added'))
          .catchError((error) => log("Failed to add user: $error"));
    }

    return Scaffold(
      // backgroundColor: Theme.of(context).primaryColor,
      backgroundColor: Colors.grey[900],
      // backgroundColor: Colors.deepPurple[500],
      body: Column(
        children: [
          SizedBox(
            height: SizeData.screenHeight * 0.38,
            width: 200,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Your average monthly carbon footprint is',
                  style: Theme.of(context)
                      .textTheme
                      .headline6!
                      .copyWith(color: Colors.white),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                RichText(
                  text: TextSpan(
                    style: Theme.of(context)
                        .textTheme
                        .headline2!
                        .copyWith(color: Colors.white),
                    children: [
                      TextSpan(
                        text: '$estimatedCarbonFootprint kg CO',
                      ),
                      WidgetSpan(
                        child: Transform.translate(
                          offset: const Offset(0.0, 0.0),
                          child: Text(
                            '2',
                            style: Theme.of(context)
                                .textTheme
                                .subtitle1!
                                .copyWith(color: Colors.white),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.white),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(40),
                  topRight: Radius.circular(40),
                ),
              ),
              // color: Colors.white,
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(
                      textAlign: TextAlign.center,
                      'Here is how your emissions compare with the global average',
                      style: Theme.of(context).textTheme.bodyText1,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.end,
                      // textBaseline: TextBaseline.alphabetic,
                      children: [
                        const SizedBox(width: 10),
                        CarbonCircle(
                          caption: 'YOU',
                          carbonFootprint: estimatedCarbonFootprint.toString(),
                          // containerSize: SizeData.screenWidth * 0.3,
                          containerSize: sizeOfYours,
                          color: Theme.of(context).primaryColor,
                        ),
                        const SizedBox(width: 30),
                        CarbonCircle(
                          caption: 'GLOBAL AVERAGE',
                          carbonFootprint:
                              globalAverageCarbonFootprint.toString(),
                          // containerSize: SizeData.screenWidth * 0.45,
                          containerSize: sizeOfGlobal,
                          // color: Theme.of(context).highlightColor,
                          color: Colors.deepPurple[500]!,
                        ),
                        const SizedBox(width: 10),
                      ],
                    ),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Colors.white,
                        backgroundColor: Theme.of(context).primaryColor,
                        minimumSize: const Size.fromHeight(60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10), // <-- Radius
                        ),
                      ),
                      onPressed: () async {
                        ref.read(wrapperProvider.notifier).updateOnboarding();
                        Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                                builder: (BuildContext context) =>
                                    const BottomNav()));

                        // Need to send this to firestore here
                        await addUser();
                        // remove the above line later.

                        // change the wrapper to direct us to home always
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            'Start Reducing',
                            style: Theme.of(context)
                                .textTheme
                                .headline6!
                                .copyWith(color: Colors.white, fontSize: 21),
                          ),
                          const SizedBox(width: 15),
                          const FaIcon(
                            FontAwesomeIcons.arrowRight,
                            size: 20,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
