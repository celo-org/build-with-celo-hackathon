import 'package:flutter/material.dart';

class MarketPlaceView extends StatelessWidget {
  const MarketPlaceView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Sustain Market',
                      style: Theme.of(context).textTheme.headline2,
                    ),
                    Text(
                      'Buy Carbon Negative products and offset your footprint.',
                      style: Theme.of(context).textTheme.bodyText1,
                    ),
                  ],
                ),
              ),
            ),

            
          ],
        ),
      ),
    );
  }
}
