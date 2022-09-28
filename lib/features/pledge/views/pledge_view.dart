import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class PledgeView extends StatelessWidget {
  const PledgeView({super.key});

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
                        text: 'You\'ve commited to a pledge',
                        style: Theme.of(context).textTheme.headline2,
                      ),
                      WidgetSpan(
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
                          child: Image.asset(
                            "lib/common/assets/raise-hand.png",
                            width: 40,
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
                      'See progress',
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
                const SizedBox(height: 50),
                Container(
                  width: 230.0,
                  height: 230.0,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    border: Border.all(
                        color: Theme.of(context).highlightColor, width: 3),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.grey,
                        blurRadius: 10.0,
                        spreadRadius: 2.0,
                        offset:
                            Offset(0, 5.0), // shadow direction: bottom right
                      )
                    ],
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Recycling goal',
                          style: Theme.of(context).textTheme.bodyText1!,
                        ),
                        Text(
                          '50 kg per week',
                          style: Theme.of(context).textTheme.headline3!,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 30),
                Text('That\'s a total of',
                    style: Theme.of(context).textTheme.bodyText2),
                Text('400 kg in 8 weeks',
                    style: Theme.of(context).textTheme.bodyText2),
                const SizedBox(height: 50),
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text('Worth considering',
                      style: Theme.of(context).textTheme.headline3),
                ),
                const SizedBox(height: 20),
                ListView(
                  shrinkWrap: true,
                  children: [
                    const Divider(),
                    ListTile(
                      leading:
                          Image.asset('lib/common/assets/recycle-symbol.png'),
                      title: Text.rich(
                        TextSpan(
                          children: [
                            TextSpan(
                              text: 'A lot of companies are using',
                              style: Theme.of(context).textTheme.bodyText1,
                            ),
                            TextSpan(
                              text:
                                  ' plastic to create fabric and pieces of clothing',
                              style: Theme.of(context).textTheme.bodyText2,
                            ),
                            TextSpan(
                              text:
                                  ' - look for a local recycler to contribute.',
                              style: Theme.of(context).textTheme.bodyText1,
                            ),
                          ],
                        ),
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
