import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:sustain/common/utils/media_query.dart';

class ChartView extends StatelessWidget {
  const ChartView({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 50),
                Text.rich(
                  TextSpan(
                    children: <InlineSpan>[
                      TextSpan(
                        text: 'Your footprint is decreasing',
                        style: Theme.of(context).textTheme.headline2,
                      ),
                      WidgetSpan(
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                          child: Image.asset(
                            "lib/common/assets/ok.png",
                            width: 30,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 5),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'See details',
                      style: Theme.of(context)
                          .textTheme
                          .bodyText2!
                          .copyWith(color: Theme.of(context).highlightColor),
                    ),
                    const SizedBox(width: 10),
                    FaIcon(
                      FontAwesomeIcons.solidCircleRight,
                      color: Theme.of(context).highlightColor,
                      size: 15,
                    ),
                  ],
                ),
                const SizedBox(height: 70),
                Padding(
                  padding: EdgeInsets.only(left: SizeData.screenWidth * 0.08),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Stack(
                      alignment: Alignment.centerLeft,
                      clipBehavior: Clip.none,
                      children: [
                        Container(
                          // width: 250,
                          // height: 250,
                          width: SizeData.screenWidth * 0.6,
                          height: SizeData.screenWidth * 0.6,
                          // height: SizeData.screenHeight * 0.4,
                          decoration: const BoxDecoration(
                            color: Colors.black,
                            shape: BoxShape.circle,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey,
                                blurRadius: 10.0,
                                spreadRadius: 5.0,
                                offset: Offset(
                                    0, 5.0), // shadow direction: bottom right
                              )
                            ],
                          ),
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  'Expenses',
                                  style: Theme.of(context)
                                      .textTheme
                                      .bodyText1!
                                      .copyWith(color: Colors.white),
                                ),
                                RichText(
                                  text: TextSpan(
                                    style: Theme.of(context)
                                        .textTheme
                                        .headline3!
                                        .copyWith(color: Colors.white),
                                    children: [
                                      const TextSpan(
                                        text: '1,844 kg of CO',
                                      ),
                                      WidgetSpan(
                                        child: Transform.translate(
                                          offset: const Offset(0.0, 0.0),
                                          child: Text(
                                            '2',
                                            style: Theme.of(context)
                                                .textTheme
                                                .bodyText2!
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
                        ),
                        Positioned(
                          right: -50,
                          top: -30,
                          child: Container(
                            width: SizeData.screenWidth * 0.3,
                            height: SizeData.screenWidth * 0.3,
                            decoration: BoxDecoration(
                              color: Theme.of(context).primaryColor,
                              shape: BoxShape.circle,
                              boxShadow: const [
                                BoxShadow(
                                  // lighter version of primary color
                                  color: Color.fromARGB(255, 122, 221, 147),
                                  blurRadius: 15.0,
                                  spreadRadius: 2.0,
                                  offset: Offset(0.0,
                                      5.0), // shadow direction: bottom right
                                )
                              ],
                            ),
                            child: Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    'Savings',
                                    style: Theme.of(context)
                                        .textTheme
                                        .caption!
                                        .copyWith(color: Colors.white),
                                  ),
                                  RichText(
                                    text: TextSpan(
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyText2!
                                          .copyWith(color: Colors.white),
                                      children: [
                                        const TextSpan(
                                          text: '372 kg CO',
                                        ),
                                        WidgetSpan(
                                          child: Transform.translate(
                                            offset: const Offset(0.0, 0.0),
                                            child: Text(
                                              '2',
                                              style: Theme.of(context)
                                                  .textTheme
                                                  .caption!
                                                  .copyWith(
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.bold),
                                            ),
                                          ),
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
                  ),
                ),
                const SizedBox(height: 50),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Categories',
                      style: Theme.of(context).textTheme.headline3),
                ),
                const SizedBox(height: 20),
                ListView(
                  shrinkWrap: true,
                  children: [
                    const Divider(),
                    ListTile(
                      leading: Image.asset('lib/common/assets/airplane.png'),
                      title: Text('Travel',
                          style: Theme.of(context).textTheme.bodyText1),
                      trailing: const FaIcon(
                        FontAwesomeIcons.solidCircleUp,
                        color: Color(0xFFff3b30),
                        size: 20,
                      ),
                    ),
                    const Divider(),
                    ListTile(
                      leading:
                          Image.asset('lib/common/assets/shopping-cart.png'),
                      title: Text('Groceries',
                          style: Theme.of(context).textTheme.bodyText1),
                      trailing: FaIcon(
                        FontAwesomeIcons.solidCircleDown,
                        color: Theme.of(context).primaryColor,
                        size: 20,
                      ),
                    ),
                    const Divider(),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
