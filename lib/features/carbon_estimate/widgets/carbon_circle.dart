import 'package:flutter/material.dart';

class CarbonCircle extends StatelessWidget {
  const CarbonCircle({
    super.key,
    required this.caption,
    required this.carbonFootprint,
    required this.containerSize,
    required this.color,
  });

  final String carbonFootprint;
  final double containerSize;
  final String caption;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Container(
          // width: SizeData.screenWidth * 0.3,
          // height: SizeData.screenWidth * 0.3,
          width: containerSize,
          height: containerSize,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            boxShadow: const [
              BoxShadow(
                color: Colors.grey,
                blurRadius: 10.0,
                // spreadRadius: 5.0,
                offset: Offset(0, 5.0), // shadow direction: bottom right
              )
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                carbonFootprint,
                style: Theme.of(context)
                    .textTheme
                    .headline6!
                    .copyWith(color: Colors.white),
              ),
              const SizedBox(height: 3),
              Text(
                'kgs of',
                style: Theme.of(context)
                    .textTheme
                    .bodyText1!
                    .copyWith(color: Colors.white),
              ),
              RichText(
                text: TextSpan(
                  style: Theme.of(context)
                      .textTheme
                      .bodyText1!
                      .copyWith(color: Colors.white),
                  children: [
                    const TextSpan(
                      text: 'CO',
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
        const SizedBox(height: 10),
        Text(
          caption,
          style: Theme.of(context).textTheme.bodyText1,
        ),
      ],
    );
  }
}
